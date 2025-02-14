import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../constants/theme";
import type { Country } from "../types/country";
import { FilterLanguageModal, FilterModal } from "../components/FilterModal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterLanguageModalVisible, setFilterLanguageModalVisible] =
    useState(false);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  const {
    data: countries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      return data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
    },
  });

  const availableTimezones = useMemo(() => {
    const timezones = new Set<string>();
    countries.forEach((country) => {
      country.timezones.forEach((timezone) => {
        timezones.add(timezone);
      });
    });
    return Array.from(timezones).sort();
  }, [countries]);

  const filteredAndGroupedCountries = useMemo(() => {
    let filtered = countries;

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedContinents.length > 0) {
      filtered = filtered.filter((country) =>
        country.continents.some((continent) =>
          selectedContinents.includes(continent)
        )
      );
    }

    if (selectedTimezones.length > 0) {
      filtered = filtered.filter((country) =>
        country.timezones.some((timezone) =>
          selectedTimezones.includes(timezone)
        )
      );
    }

    const grouped = filtered.reduce(
      (acc: { title: string; data: Country[] }[], country) => {
        const firstLetter = country.name.common[0].toUpperCase();
        const section = acc.find((section) => section.title === firstLetter);

        if (section) {
          section.data.push(country);
        } else {
          acc.push({ title: firstLetter, data: [country] });
        }

        return acc;
      },
      []
    );

    return grouped.sort((a, b) => a.title.localeCompare(b.title));
  }, [countries, searchQuery, selectedContinents, selectedTimezones]);

  const handleContinentChange = (continent: string) => {
    setSelectedContinents((prev) =>
      prev.includes(continent)
        ? prev.filter((c) => c !== continent)
        : [...prev, continent]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezones((prev) =>
      prev.includes(timezone)
        ? prev.filter((t) => t !== timezone)
        : [...prev, timezone]
    );
  };

  const resetFilters = () => {
    setSelectedContinents([]);
    setSelectedTimezones([]);
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[
        styles.countryItem,
        { backgroundColor: currentTheme.cardBackground },
      ]}
      onPress={() =>
        router.push(`/country/${encodeURIComponent(item.name.common)}`)
      }
    >
      <Image source={{ uri: item.flags.png }} style={styles.flag} />
      <View style={styles.countryInfo}>
        <Text style={[styles.countryName, { color: currentTheme.text }]}>
          {item.name.common}
        </Text>
        <Text style={[styles.capital, { color: currentTheme.text }]}>
          {item.capital?.[0] || "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <Text style={[styles.sectionHeader, { color: currentTheme.text }]}>
      {title}
    </Text>
  );

  if (isError) {
    return (
      <View
        style={[styles.center, { backgroundColor: currentTheme.background }]}
      >
        <Text style={[styles.errorText, { color: currentTheme.text }]}>
          {error?.message}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <View style={styles.header}>
        <Image
          style={[styles.image, { tintColor: currentTheme.text }]}
          source={require("../assets/images/logo1.png")}
        />

        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={theme === "light" ? "moon" : "sunny"}
            size={24}
            color={currentTheme.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: currentTheme.searchBackground },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={currentTheme.text}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: currentTheme.text }]}
            placeholder="Search Country"
            placeholderTextColor={currentTheme.text}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <View style={styles.filter}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: currentTheme.searchBackground },
          ]}
          onPress={() => setFilterLanguageModalVisible(true)}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <MaterialIcons
              name="language"
              size={20}
              color={currentTheme.text}
            />
            <Text style={{ color: currentTheme.text }}>EN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: currentTheme.searchBackground },
          ]}
          onPress={() => setFilterModalVisible(true)}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Feather name="filter" size={20} color={currentTheme.text} />
            <Text style={{ color: currentTheme.text }}>Filter</Text>
          </View>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <SectionList
          sections={[
            { title: "A", data: [1, 2, 3] },
            { title: "B", data: [1, 2] },
            { title: "C", data: [1, 2, 3] },
          ]}
          renderItem={() => (
            <View
              style={[
                styles.countryItem,
                { backgroundColor: currentTheme.cardBackground },
              ]}
            >
              <View
                style={[
                  styles.flag,
                  { backgroundColor: currentTheme.skeletonBackground },
                ]}
              />
              <View style={styles.countryInfo}>
                <View
                  style={[
                    styles.skeletonText,
                    { backgroundColor: currentTheme.skeletonBackground },
                  ]}
                />
                <View
                  style={[
                    styles.skeletonTextShort,
                    { backgroundColor: currentTheme.skeletonBackground },
                  ]}
                />
              </View>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={[styles.sectionHeader, { color: currentTheme.text }]}>
              {section.title}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <SectionList
          sections={filteredAndGroupedCountries}
          renderItem={renderCountryItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.name.common}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
        />
      )}

      <FilterLanguageModal
        onLanguageChange={handleLanguageChange}
        onApply={() => setFilterLanguageModalVisible(false)}
        onReset={resetFilters}
        selectedLanguages={selectedLanguages}
        visible={filterLanguageModalVisible}
        onClose={() => setFilterLanguageModalVisible(false)}
        theme={currentTheme}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        theme={currentTheme}
        selectedContinents={selectedContinents}
        selectedTimezones={selectedTimezones}
        onContinentChange={handleContinentChange}
        onTimezoneChange={handleTimezoneChange}
        onReset={resetFilters}
        onApply={() => setFilterModalVisible(false)}
        availableTimezones={availableTimezones}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    fontFamily: "Axiforma-Bold",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 12,
  },
  filterButton: {
    width: 73,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  searchIcon: {
    paddingLeft: 13,
  },
  skeletonText: {
    height: 16,
    borderRadius: 4,
    marginBottom: 4,
    width: 200,
  },
  skeletonTextShort: {
    height: 14,
    width: 120,
    borderRadius: 4,
  },
  searchInput: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  list: {
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: 4,
  },
  countryInfo: {
    marginLeft: 12,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: 98,
    height: 24,
    color: "white",
  },
  capital: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
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
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
