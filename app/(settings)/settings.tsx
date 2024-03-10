import React, { useCallback } from "react";
import { Alert,  View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Space from "@/components/ui/Space";
import Typography from "@/components/ui/Typography";
import ListItem from "@/components/settings/ListItem";
import { CustomSwitch } from "@/components/ui/CustomSwitch";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useTheme } from "@/providers/theme-color-provider";
import { ScrollView } from "@/components/Themed";

const Settings = () => {
  const { isLoaded, signOut } = useAuth();

  const { toggleTheme, colors, dark } = useTheme();

  const toggleDarkMode = () => {
    toggleTheme();
  };
  const onSignOut = useCallback(
    () =>
      Alert.alert(
        "Sign Out",
        "Are you sure you want to sign out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Signout",
            onPress: async () => {
              if (!isLoaded) return;
              await signOut();
            },
          },
        ],
        {
          cancelable: true,
          userInterfaceStyle: dark ? "dark" : "light",
        }
      ),
    [dark]
  );

  return (
      <ScrollView
      >
        <View style={{ marginVertical: 16, paddingHorizontal: 10 }}>
          {/*  */}
          <View>
            <Typography text={"General Settings"} size="xl" />
            <Space />

            <ListItem
              onPress={() => router.push("/profile-setup")}
              item={{
                label: "Personal Info",
                icon: (
                  <Ionicons
                    name="person"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
            <ListItem
              item={{
                label: "Security",
                icon: (
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
          </View>
          {/*  */}
          <View>
            <Typography text={"Accessibility"} size="xl" />
            <Space />

            <ListItem
              item={{
                label: "Language",
                icon: (
                  <Ionicons
                    name="language"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
            <ListItem
              item={{
                label: "Preferences",
                icon: (
                  <Ionicons
                    name="settings"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
            <ListItem
              onPress={toggleDarkMode}
              item={{
                label: "Dark Mode",
                icon: (
                  <Ionicons
                    name="moon"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
                rightIcon: (
                  <CustomSwitch isSelected={dark} onPress={toggleDarkMode} />
                ),
              }}
            />
          </View>
          {/*  */}
          <View>
            <Typography text={"Help & Support"} size="xl" />
            <Space />

            <ListItem
              item={{
                label: "About",
                icon: (
                  <Ionicons
                    name="information-circle"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
            <ListItem
              item={{
                label: "Help Center",
                icon: (
                  <Ionicons
                    name="help-circle"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
            <ListItem
              item={{
                label: "Contact Us",
                icon: (
                  <Ionicons
                    name="mail"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
          </View>
          {/*  */}
          <View>
            <Typography text={"Sign Out"} size="xl" />
            <Space />

            <ListItem
              onPress={onSignOut}
              item={{
                label: "Sign Out",
                icon: (
                  <Ionicons
                    name="log-out"
                    size={20}
                    color={colors.icon_color_pr}
                  />
                ),
              }}
            />
          </View>
          {/*  */}
          <View>
            <Typography text={"Danger Zone"} size="xl" />
            <Space />

            <ListItem
              dangerItem
              item={{
                label: "Delete Account",
                icon: (
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={COLOR_SHADES.red.shade5}
                  />
                ),
              }}
            />
          </View>
          {/*  */}
        </View>
      </ScrollView>
  );
};

export default Settings;
