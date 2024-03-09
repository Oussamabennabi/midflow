import React, { createContext, useContext, useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();
type ThemeContextType = {
  dark: boolean;
  colors: typeof COLORS.light | typeof COLORS.dark;
  toggleTheme: () => void;
};

const THEME_KEY = "midflow.theme";

const themeStorage = {
  async getTheme() {
    try {
      return await AsyncStorage.getItem(THEME_KEY);
    } catch (err) {
      return false;
    }
  },
  async saveTheme(value: boolean) {
    try {
      return await AsyncStorage.setItem(THEME_KEY, JSON.stringify(value));
    } catch (err) {
      return;
    }
  },
};

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  colors: COLORS.light,
  toggleTheme: () => {},
});

export const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const fetchTheme = async () => {
    try {
      const v = await themeStorage.getTheme();
      if (v === "false" || v === null) {
        setIsDark(false);
      } else if (v === "true") {
        setIsDark(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const defaultTheme: ThemeContextType = {
    dark: isDark,
    colors: isDark ? COLORS.dark : COLORS.light,
    toggleTheme: async () => {
      try {
        await themeStorage.saveTheme(!isDark);
        setIsDark(!isDark);
      } catch (error) {
        throw new Error("Failed to save theme");
      } finally {
        setTimeout(() => SplashScreen.hideAsync(), 100);
      }
    },
  };

  useEffect(() => {
    fetchTheme();
  }, []);
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <StatusBar backgroundColor="red" style="light" />
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={
          isDark ? COLORS.dark.primary_bg : COLORS.light.primary_bg
        }
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
