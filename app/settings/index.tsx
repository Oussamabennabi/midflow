import React, { ReactNode, useMemo, useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Space from "@/components/ui/Space";
import Typography from "@/components/ui/Typography";
import ListItem from "@/components/settings/ListItem";
import { CustomSwitch } from "@/components/ui/CustomSwitch";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Implement logic to toggle dark mode
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{ backgroundColor: COLOR_SHADES.gray.shade1, height: "100%" }}
      >
        <View style={{ marginVertical: 16, paddingHorizontal: 10 }}>
          {/*  */}
          <View>
            <Typography text={"General Settings"} size="xl" />
            <Space />

            <ListItem
              item={{
                label: "Personal Info",
                icon: <Ionicons name="person" size={20} color="black" />,
              }}
            />
            <ListItem
              item={{
                label: "Preferences",
                icon: <Ionicons name="settings" size={20} color="black" />,
              }}
            />
            <ListItem
              item={{
                label: "Security",
                icon: <Ionicons name="lock-closed" size={20} color="black" />,
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
                icon: <Ionicons name="language" size={20} color="black" />,
              }}
            />
            <ListItem
              item={{
                label: "Preferences",
                icon: <Ionicons name="settings" size={20} color="black" />,
              }}
            />
            <ListItem
              item={{
                label: "Dark Mode",
                icon: <Ionicons name="moon" size={20} color="black" />,
                rightIcon: (
                  <CustomSwitch
                    isSelected={isDarkMode}
                    onPress={toggleDarkMode}
                  />
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
                  <Ionicons name="information-circle" size={20} color="black" />
                ),
              }}
            />
            <ListItem
              item={{
                label: "Help Center",
                icon: <Ionicons name="help-circle" size={20} color="black" />,
              }}
            />
            <ListItem
              item={{
                label: "Contact Us",
                icon: <Ionicons name="mail" size={20} color="black" />,
              }}
            />
          </View>
          {/*  */}
          <View>
            <Typography text={"Sign Out"} size="xl" />
            <Space />

            <ListItem
              item={{
                label: "Sign Out",
                icon: <Ionicons name="log-out" size={20} color="black" />,
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
    </SafeAreaView>
  );
};

export default Settings;
