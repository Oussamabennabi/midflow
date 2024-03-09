import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";
import { Size } from "@/constants/Sizes";
import { useTheme } from "@/providers/theme-color-provider";
import React from "react";
import { Text, TextStyle } from "react-native";

type TypographyProps = {
  text: string;
  size?: Size;
  variant?: "primary" | "secondary" | "error";
  font?: keyof typeof FONT;
  style?: TextStyle; // Allow custom styling
};

const Typography: React.FC<TypographyProps> = ({
  text,
  variant = "primary",
  style,
  size,
  font = "Bold",
  ...restProps

}) => {

  const {colors} = useTheme()


  const getSizeStyle = (): TextStyle => {
    switch (size) {
      case "sm":
        return { fontSize: 12 };
      case "md":
        return { fontSize: 16 };
      case "lg":
        return { fontSize: 24 };
      case "xl":
        return { fontSize: 26 };
      case "xxl":
        return { fontSize: 32 };
      default:
        return {};
    }
  };
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "primary":
        return { fontSize: 16, color: colors.primary_text };
      case "secondary":
        return { fontSize: 14, color: colors.secondary_text };
      case "error":
        return { fontSize: 14, color: COLOR_SHADES.red.shade5 };
      default:
        return {};
    }
  };


  return (
    <Text
      style={{
        ...getVariantStyle(),
        ...getSizeStyle(),
        ...style,
        fontFamily: "Font-" + font,
      }}
      {...restProps}
    >
      {text}
    </Text>
  );
};

export default Typography;
