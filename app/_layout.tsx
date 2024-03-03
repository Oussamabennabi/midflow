import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useColorScheme } from "@/components/useColorScheme";
import useCachedResources from "@/hooks/useCachedResourses";

import ConvexClerkProvider from "@/providers/convex-clerk-rovider";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/signin",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loaded = useCachedResources();

  if (!loaded) {
    return null;
  }

  return (
    <ConvexClerkProvider>
      <RootLayoutNav />
    </ConvexClerkProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // auth
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (isLoaded && !isSignedIn) router.replace("/signin");
    if (isLoaded && isSignedIn) router.replace("/settings1");
  }, [isLoaded, isSignedIn]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
