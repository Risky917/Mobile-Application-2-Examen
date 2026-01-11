import React, { createContext, useState, useContext, ReactNode } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  shadow: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
};

const lightTheme: ThemeColors = {
  background: '#ffffff',
  surface: '#f5f5f5',
  primary: '#007AFF',
  secondary: '#5856D6',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E5E5E7',
  card: '#ffffff',
  shadow: '#000000',
  accent: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};

const darkTheme: ThemeColors = {
  background: '#000000',
  surface: '#1C1C1E',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  border: '#38383A',
  card: '#1C1C1E',
  shadow: '#000000',
  accent: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
};

type ThemeContextType = {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme === "dark" ? "dark" : "light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const colors = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
