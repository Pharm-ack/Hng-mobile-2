# Country Explorer App

## Overview

Country Explorer is a mobile application built with React Native and Expo that allows users to explore detailed information about countries around the world. The app features a clean, themeable interface with support for light and dark modes, dynamic splash screens, and a responsive design. Users can search for countries, filter by continent or timezone, and view detailed information about each country, including flags, population, capital, languages, and more.

---

## Features

- **Country Search**: Search for countries by name.
- **Filters**: Filter countries by continent, timezone, and language.
- **Detailed Country Information**: View comprehensive details about each country, including:
  - Flag and coat of arms
  - Population
  - Capital city
  - Official languages
  - Currency
  - Timezone
  - Area
  - And more!
- **Theme Support**: Switch between light and dark themes for a personalized experience.
- **Dynamic Splash Screen**: Splash screen adapts to the user's theme preference.
- **Responsive Design**: Optimized for both iOS and Android devices.
- **Offline Support**: Cached data for offline access (future implementation).

---

## Technologies Used

- **Frontend**:
  - React Native
  - Expo
  - TypeScript
- **State Management**:
  - React Context API (for theme management)
- **Navigation**:
  - Expo Router
- **Data Fetching**:
  - React Query (for efficient data fetching and caching)
- **Styling**:
  - React Native StyleSheet
  - Custom theme system (light and dark themes)
- **Icons**:
  - Expo Vector Icons (Ionicons, MaterialIcons, Feather)
- **Fonts**:
  - Custom font integration (Axiforma)
- **Splash Screen**:
  - Expo Splash Screen

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/country-explorer.git
   cd country-explorer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app**:

   ```bash
   npx expo start
   ```

4. **Scan the QR code** with the Expo Go app (available on iOS and Android) or run on an emulator.

---

## Folder Structure

```
country-explorer/
├── app/                     # Expo Router app entry point
│   └── _layout.tsx          # Root layout with theme provider
├── assets/                  # Static assets (images, fonts, etc.)
│   ├── fonts/               # Custom fonts (Axiforma)
│   └── images/              # App images (logo, splash screen, etc.)
│   ├── components/          # Reusable components (CustomText, CountryItem, etc.)
│   ├── constants/           # Constants (themes, fonts, etc.)
│   ├── context/             # Context providers (ThemeContext)
│   ├── types/               # TypeScript types (Country, etc.)
│   └── utils/               # Utility functions
├── app.json                 # Expo configuration
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

---

## Theming

The app supports light and dark themes, which can be toggled by the user. The theme system is implemented using React Context and includes:

- **Light Theme**: Bright background with dark text.
- **Dark Theme**: Dark background with light text.

### Theme Colors

```ts
export const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  cardBackground: "#F5F5F5",
  skeletonBackground: "#E1E1E1",
  primary: "#FF6B00",
};

export const darkTheme = {
  background: "#121212",
  text: "#FFFFFF",
  cardBackground: "#1E1E1E",
  skeletonBackground: "#2A2A2A",
  primary: "#FF6B00",
};
```

---

## Custom Fonts

The app uses the **Axiforma** font family, which is applied globally using a custom `CustomText` component. The font weights supported are:

- **Axiforma-Regular**
- **Axiforma-Bold**
- **Axiforma-Black**

---

## Dynamic Splash Screen

The splash screen dynamically adapts to the user's theme preference:

- **Light Theme**: White background.
- **Dark Theme**: Black background.

This is achieved using the `expo-splash-screen` library and runtime theme detection.

---

## API Integration

The app fetches country data from the [REST Countries API](https://restcountries.com/). Key endpoints used:

- **All Countries**: `https://restcountries.com/v3.1/all`
- **Country Details**: `https://restcountries.com/v3.1/name/{name}?fullText=true`

---

## Future Improvements

- **Offline Support**: Cache API responses for offline access.
- **Favorites**: Allow users to save favorite countries.
- **Animations**: Add smooth transitions and animations.
- **Localization**: Support multiple languages.
- **Advanced Filters**: Add more filter options (population range, currency, etc.).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing country data.
- [Expo](https://expo.dev/) for the amazing development tools.
- [React Native](https://reactnative.dev/) for the framework.

---

## Contact

For questions or feedback, please reach out:

- **Email**: olumofe6@gmail.com
- **GitHub**: [Pharm-ack](https://github.com/pharm-ack)

---

Enjoy exploring the world with **Country Explorer**! 🌍
