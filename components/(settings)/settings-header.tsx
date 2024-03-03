import React from "react";
import { TouchableOpacity, View } from "react-native";

import { SPACING } from "@/constants/Spacing";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

type SettingsHeaderType = {
  title: string;
};
const SettingsHeader: React.FC<SettingsHeaderType> = ({ title }) => {
  return (
    <View
      style={{
        backgroundColor: COLOR_SHADES.gray.primary,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,

        padding: SPACING.xl,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: SPACING.xl,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ marginTop: 7 }}
          onPress={() => router.canGoBack() ? router.back():router.replace("/settings1")}
        >
          <Entypo name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <Typography
          text={title}
          style={{ color: "white" }}
          font="ExtraBold"
          size="lg"
        />
      </View>
    </View>
  );
};

export default SettingsHeader;
