import React from "react";
import { View } from "react-native";

import { SPACING } from "@/constants/Spacing";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import LogoSvg from "@/assets/LogoSvg";
import { StatusBar } from "expo-status-bar";

type AuthHeaderType = {
  title: string;
  subTitle: string;
};
const AuthHeader: React.FC<AuthHeaderType> = ({ title, subTitle }) => {
  return (
    <View
      style={{
        backgroundColor: COLOR_SHADES.gray.primary,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,

        padding: SPACING.xl,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: SPACING.xxl,
      }}
    >
      <StatusBar
          style="inverted"
          backgroundColor={COLOR_SHADES.gray.primary}
        />
      {/* logo */}
      <LogoSvg />
      {/* title */}
      <Typography
        text={title}
        style={{ color: "white" }}
        font="ExtraBold"
        size="xxl"
      />
      <Typography
        text={subTitle}
        variant="secondary"
        style={{ textAlign: "center", color: COLOR_SHADES.gray.shade3 }}
        size="md"
        font="SemiBold"
      />
    </View>
  );
};

export default AuthHeader;
