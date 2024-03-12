import BackArrow from "@/components/ui/BackArrow";
import Typography from "@/components/ui/Typography";
import { FONT } from "@/constants/Fonts";
import { useTheme } from "@/providers/theme-color-provider";
import { router } from "expo-router";
import Stack from "expo-router/stack";
import { View } from "react-native";

const Layout = () => {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        // header(props) {
        //   return <NativeSt {...props}></NativeSt>
        // },
        headerStyle: {
          backgroundColor: colors.secondary_bg,
        },

        headerLeft(props) {
          return (
            <View style={{ flexDirection: "row" }}>
              <BackArrow
                onPress={() => {
                  props.canGoBack && router.back();
                }}
              />
            </View>
          );
        },

        headerTitleStyle: {
          color: colors.primary_text,
          fontFamily: FONT.SemiBold,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="settings" />
      <Stack.Screen options={{ headerShown: false }} name="profile-setup" />
      <Stack.Screen
        options={{ title: "Select a place" }}
        name="doctor-location-picker"
      />
    </Stack>
  );
};

export default Layout;
