import React from "react";
import ColoredButton, { IconType } from "./ColoredButton";
import { useTheme } from "@/providers/theme-color-provider";
import { ViewStyle } from "react-native";

const BackArrow = ({
  onPress,
  style,
  white,
}: {
  onPress: () => void;
  style?: ViewStyle;
  white?: boolean;
}) => {
  const { colors } = useTheme();
  return (
    <ColoredButton
      style={style}
      p_color={white ? "white" : colors.icon_color_pr}
      s_color={"#FFFFFF13"}
      onPress={onPress}
      icon={{
        value: { name: "chevron-left", type: IconType.Entypo },
        size: "xxl",
      }}
    />
  );
};

export default BackArrow;
