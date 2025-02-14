import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  theme: any;
  selectedContinents: string[];
  selectedTimezones: string[];
  onContinentChange: (continent: string) => void;
  onTimezoneChange: (timezone: string) => void;
  onReset: () => void;
  onApply: () => void;
  availableTimezones: string[];
}

const continents = [
  'Africa',
  'Antarctica',
  'Asia',
  'Australia',
  'Europe',
  'North America',
  'South America',
];

function FilterModal({
  visible,
  onClose,
  theme,
  selectedContinents,
  selectedTimezones,
  onContinentChange,
  onTimezoneChange,
  onReset,
  onApply,
  availableTimezones,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: theme.background,
            marginTop: 130,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Filter</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ backgroundColor: '#98A2B3', borderRadius: 10 }}
          >
            <Ionicons name="close" size={24} color={theme.border} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Continent
            </Text>
            {continents.map((continent) => (
              <TouchableOpacity
                key={continent}
                style={styles.option}
                onPress={() => onContinentChange(continent)}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {continent}
                </Text>
                <View
                  style={[
                    styles.checkbox,
                    selectedContinents.includes(continent) && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.text },
                  ]}
                >
                  {selectedContinents.includes(continent) && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Time Zone
            </Text>
            {availableTimezones.map((timezone) => (
              <TouchableOpacity
                key={timezone}
                style={styles.option}
                onPress={() => onTimezoneChange(timezone)}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {timezone}
                </Text>
                <View
                  style={[
                    styles.checkbox,
                    selectedTimezones.includes(timezone) && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.text },
                  ]}
                >
                  {selectedTimezones.includes(timezone) && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.resetButton,
              { borderColor: theme.text },
              { flex: 0, width: 120 },
            ]}
            onPress={onReset}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.applyButton,
              { backgroundColor: '#FF6C00CC' },
            ]}
            onPress={onApply}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              Show results
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function FilterLanguageModal({
  visible,
  onClose,
  theme,
  selectedLanguages = [],
  onLanguageChange,
  onReset,
  onApply,
}: {
  visible: boolean;
  onClose: () => void;
  theme: any;
  selectedLanguages: string[];
  onLanguageChange: (language: string) => void;
  onReset: () => void;
  onApply: () => void;
}) {
  const languages = [
    'English',
    'Spanish',
    'French',
    'Italian',
    'German',
    'Dutch',
    'Norwegian',
    'Danish',
    'Korean',
    'Croatian',
    'Bulgarian',
    'Aramaic',
    'Ukrainian',
    'Chinese',
    'Japanese',
    'Arabic',
    'Portuguese',
    'Russian',
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: theme.background,
            marginTop: 130,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Language</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ backgroundColor: '#98A2B3', borderRadius: 10 }}
          >
            <Ionicons name="close" size={24} color={theme.border} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Select Languages
            </Text>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={styles.option}
                onPress={() => onLanguageChange(language)}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {language}
                </Text>
                <View
                  style={[
                    styles.checkbox,
                    selectedLanguages.includes(language) && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.text },
                    { borderRadius: 100 },
                  ]}
                >
                  {selectedLanguages.includes(language) && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.resetButton,
              { borderColor: theme.text },
              { flex: 0, width: 120 },
            ]}
            onPress={onReset}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.applyButton,
              { backgroundColor: '#FF6C00CC' },
            ]}
            onPress={onApply}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              Show results
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export { FilterModal, FilterLanguageModal };
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A2A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    borderWidth: 1,
  },
  applyButton: {
    backgroundColor: '#FF6B00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
