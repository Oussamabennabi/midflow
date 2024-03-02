import React, { ReactNode, Ref } from "react";
import { TouchableOpacity, View, TextStyle, ViewStyle } from "react-native";

import Typography from "./Typography";
import { Size } from "@/constants/Sizes";
import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "inline"; // Add your desired variants
  size?: Size;
  color?: string;
  style?: ViewStyle; // Allow custom styling
  onPress?: () => void;
  iconLeft?: ReactNode; // Icon component for the left side
  iconRight?: ReactNode; // Icon component for the right side
  ref?:any
  disabled?:boolean
} 

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  style,
  onPress,
  iconLeft,
  color,
  iconRight,
  ref,
   disabled
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "primary":
        return { backgroundColor: COLOR_SHADES.blue.primary, color: "white" };
      case "secondary":
        return {
          backgroundColor: COLOR_SHADES.blue.secondary,
          color: COLOR_SHADES.blue.primary,
        };
      case "inline":
        return {
          backgroundColor: "transparent",
          color: COLOR_SHADES.gray.secondary,
        };

      default:
        return {};
    }
  };
  const getSizeStyle = (): TextStyle => {
    if (variant === "inline") {
      switch (size) {
        case "sm":
          return { paddingVertical: 4, paddingHorizontal: 6 };
        case "md":
          return { paddingVertical: 6, paddingHorizontal: 10 };
        case "lg":
          return { paddingVertical: 9, paddingHorizontal: 15 };

        case "xl":
          return { paddingVertical: 18, paddingHorizontal: 20 };

        case "xxl":
          return { paddingVertical: 27, paddingHorizontal: 25 };

        default:
          return {};
      }
    }
    switch (size) {
      case "sm":
        return { paddingVertical: 11 - 4, paddingHorizontal: 17 - 8 };
      case "md":
        return { paddingVertical: 20 - 4, paddingHorizontal: 33 - 8 };
      case "lg":
        return { paddingVertical: 23 - 4, paddingHorizontal: 59 - 8 };

      case "xl":
        return { paddingVertical: 26 - 4, paddingHorizontal: 80 - 8 };

      case "xxl":
        return { paddingVertical: 33 - 4, paddingHorizontal: 111 - 8 };

      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      ref={ref}
      activeOpacity={0.86}
      style={[
        {
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        getVariantStyle(),
        getSizeStyle(),
        style,
      ]}
    >
      {iconLeft && <View style={{ marginRight: 8 }}>{iconLeft}</View>}
      <Typography
        style={{
          textAlign: "center",
          color: color || getVariantStyle()?.color,
          fontFamily: FONT.Bold,
        }}
        text={label}
        size={"md"}
      />
      {iconRight && <View style={{ marginLeft: 8 }}>{iconRight}</View>}
    </TouchableOpacity>
  );
};

export default Button;
