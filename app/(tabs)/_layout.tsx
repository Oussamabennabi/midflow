import React from "react";

import { Tabs, router } from "expo-router";

import { COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { FONT } from "@/constants/Fonts";
import CustomeTabBar from "@/components/(tabs)/CustomTabBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    tabBar={props => <CustomeTabBar {...props} />} 
      screenOptions={{
        tabBarActiveTintColor: COLORS[colorScheme ?? "light"].tintBg,
        headerShown: useClientOnlyValue(false, true),
        // headerTransparent: true,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: FONT.Bold,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: "Doctors",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-doctor" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        }}
      />
    
    </Tabs>
  );
}
