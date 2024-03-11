import React, { ReactNode } from "react";
import { TouchableOpacity, View, TextStyle, ViewStyle } from "react-native";

import Typography from "./Typography";
import { Size } from "@/constants/Sizes";
import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";
import { useTheme } from "@/providers/theme-color-provider";

import Ripple from "react-native-material-ripple";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "inline" | "disabled" | ""; // Add your desired variants
  size?: Size;
  color?: string;
  style?: ViewStyle; // Allow custom styling
  onPress?: () => void;
  iconLeft?: ReactNode; // Icon component for the left side
  iconRight?: ReactNode; // Icon component for the right side
  ref?: any;
  disabled?: boolean;
  textColor?:string
};

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
  disabled,
  textColor
}) => {
  const { colors } = useTheme();
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "primary":
      case "":
        return { backgroundColor: COLOR_SHADES.blue.primary, color: "white" };
      case "secondary":
        return {
          backgroundColor: colors.secondary_bg,
          color: COLOR_SHADES.blue.primary,
        };
      case "inline":
        return {
          backgroundColor: "transparent",
          color: COLOR_SHADES.gray.secondary,
        };
      case "disabled":
        return {
          backgroundColor: COLOR_SHADES.blue.shade4,
          color: COLOR_SHADES.gray.shade2,
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
   
    <Ripple
      onPress={(e)=>{
        e.persist()
        onPress&&onPress()
      }}
      disabled={disabled}
      
    >
      <View
      style={[
        {
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
        getVariantStyle(),
        getSizeStyle(),
        style,
      ]}>

      <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {iconLeft && <View style={{ marginRight: 8 }}>{iconLeft}</View>}
        <Typography
          style={{
            textAlign: "center",
            color: textColor||color || getVariantStyle()?.color,
            fontFamily: FONT.Bold,
          }}
          text={label}
          size={"md"}
        />
      </View>
      {iconRight && (
        <View
          style={{
            position: "absolute",
            top: "auto",
            bottom: "auto",
            right: 40,
          }}
        >
          {iconRight}
        </View>
      )}
      </View>
    </Ripple>
  );
};

export default Button;
