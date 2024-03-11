import "react-native-gesture-handler";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import useCachedResources from "@/hooks/useCachedResourses";

import ConvexClerkProvider from "@/providers/convex-clerk-rovider";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeColorProvider, useTheme } from "@/providers/theme-color-provider";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/welcome",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loaded = useCachedResources();
  if (!loaded) {
    return null;
  }
  return (
    <ThemeColorProvider>
      <ConvexClerkProvider>
        <RootLayoutNav />
      </ConvexClerkProvider>
    </ThemeColorProvider>
  );
}

function RootLayoutNav() {
  // auth
  const { isLoaded, isSignedIn } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    if (!isLoaded) return;
    if (isLoaded && !isSignedIn) router.replace("/welcome");
    if (isLoaded && isSignedIn) router.replace("/home");
  }, [isLoaded, isSignedIn]);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.primary_bg }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />
        <Stack.Screen name="map" options={{ headerShown: false }} />
        <Stack.Screen
          name="doctor-chat/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="doctor/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="review/[id]" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
