import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useTheme } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../constants/theme";
import type { Country } from "../../types/country";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function CountryDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const carouselRef = useRef<ICarouselInstance>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  const {
    data: country,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Country>({
    queryKey: ["country", id],
    queryFn: async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${id}?fullText=true`
      );
      if (!response.ok) throw new Error("Failed to fetch country details");
      const data = await response.json();
      return data[0];
    },
  });

  if (isError) {
    return (
      <View
        style={[styles.center, { backgroundColor: currentTheme.background }]}
      >
        <Text style={[styles.errorText, { color: currentTheme.text }]}>
          {error.message}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const carouselData = [
    { type: "flag", uri: country?.flags?.png },
    {
      type: "coatOfArms",
      uri: country?.coatOfArms?.png,
    },
  ];

  const handlePrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    carouselRef.current?.prev();
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(activeIndex + 1, carouselData.length - 1);
    carouselRef.current?.next();
    setActiveIndex(newIndex);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: currentTheme.text }]}>
          {country?.name.common || "Loading..."}
        </Text>
      </View>

      {isLoading ? (
        <View style={[styles.carouselSkeleton, { height: 200 }]}>
          <View
            style={[
              styles.skeleton,
              { backgroundColor: currentTheme.skeletonBackground },
            ]}
          />
        </View>
      ) : (
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            width={width}
            height={200}
            data={carouselData}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.carouselImage}
                  resizeMode="contain"
                />
              </View>
            )}
            loop={false}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />

          <TouchableOpacity
            style={[styles.arrowButton, styles.leftArrow]}
            onPress={handlePrev}
            disabled={activeIndex === 0}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={currentTheme.text}
              style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.arrowButton, styles.rightArrow]}
            onPress={handleNext}
            disabled={activeIndex === carouselData.length - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentTheme.text}
              style={{
                opacity: activeIndex === carouselData.length - 1 ? 0.3 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <View key={index} style={styles.detailRow}>
                  <View
                    style={[
                      styles.skeleton,
                      {
                        width: 100,
                        backgroundColor: currentTheme.skeletonBackground,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.skeleton,
                      {
                        flex: 1,
                        backgroundColor: currentTheme.skeletonBackground,
                      },
                    ]}
                  />
                </View>
              ))}
            </>
          ) : (
            <>
              <DetailRow
                label="Population"
                value={country?.population.toLocaleString() || "N/A"}
                theme={currentTheme}
              />
              <DetailRow
                label="Region"
                value={country?.region || "N/A"}
                theme={currentTheme}
              />
              <DetailRow
                label="Capital"
                value={country?.capital?.[0] || "N/A"}
                theme={currentTheme}
              />
              <DetailRow
                label="Official language"
                value={
                  Object.values(country?.languages || {}).join(", ") || "N/A"
                }
                theme={currentTheme}
              />
              <DetailRow
                label="Area"
                value={`${country?.area.toLocaleString()} km²` || "N/A"}
                theme={currentTheme}
              />
              <DetailRow
                label="Currency"
                value={
                  Object.values(country?.currencies || {})[0]?.name || "N/A"
                }
                theme={currentTheme}
              />
              <DetailRow
                label="Time zone"
                value={country?.timezones[0] || "N/A"}
                theme={currentTheme}
              />
              <DetailRow
                label="Driving side"
                value={country?.car.side || "N/A"}
                theme={currentTheme}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: any;
}) => (
  <View style={styles.detailRow}>
    <Text style={[styles.label, { color: theme.text }]}>{label}:</Text>
    <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  carouselItem: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "90%",
    height: "100%",
    borderRadius: 10,
  },
  carouselSkeleton: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily: "Axiforma-Bold",
  },
  value: {
    fontSize: 16,
    fontWeight: "300",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    padding: 8,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.2)",
    transform: [{ translateY: -20 }],
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#FF6B00",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  skeleton: {
    height: 16,
    borderRadius: 4,
  },
});
