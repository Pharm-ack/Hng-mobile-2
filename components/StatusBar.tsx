import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext'; // Your theme context
import React from 'react';

export default function ThemeAwareStatusBar() {
  const { theme } = useTheme();

  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
}
