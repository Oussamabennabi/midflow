import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

import { Size } from "@/constants/Sizes";

import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export enum IconType {
  MatetrialIcon,
  FontAweomseIcon,
  Ionicon,
  Entypo,
}
type ColoredButtonProps = {
  size?: Size;
  style?: ViewStyle; // Allow custom styling
  onPress?: () => void;
  icon: {
    value:
      | {
          type?: IconType.MatetrialIcon;
          name: keyof typeof MaterialIcons.glyphMap;
        }
      | {
          type?: IconType.FontAweomseIcon;
          name: keyof typeof FontAwesome.glyphMap;
        }
      | { type?: IconType.Ionicon; name: keyof typeof Ionicons.glyphMap }
      | { type?: IconType.Entypo; name: keyof typeof Entypo.glyphMap };
    size?: Size;
  };

  ref?: any;
  disabled?: boolean;
  p_color: string;
  s_color: string;
};

const ColoredButton: React.FC<ColoredButtonProps> = ({
  style,
  onPress,
  ref,
  disabled,
  icon,
  p_color,
  s_color,
}) => {
  const getSizeStyle = (_size?: Size): number => {
    switch (_size) {
      case "xs":
        return 14;
      case "sm":
        return 16;
      case "md":
        return 18;
      case "lg":
        return 20;

      case "xl":
        return 24;

      case "xxl":
        return 30;

      default:
        return 32;
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
          borderRadius: 999,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: s_color,

          padding: 4,
          minHeight: 30,
          minWidth: 30,
        },

        style,
      ]}
    >
      {/* <View style={{ marginRight: 8 }}> */}
      {icon.value.type === IconType.FontAweomseIcon && (
        <FontAwesome
          name={icon.value.name}
          color={p_color}
          size={getSizeStyle(icon.size)}
        />
      )}
      {icon.value.type === IconType.MatetrialIcon && (
        <MaterialIcons
          name={icon.value.name}
          color={p_color}
          size={getSizeStyle(icon.size)}
        />
      )}
      {icon.value.type === IconType.Ionicon && (
        <Ionicons
          name={icon.value.name}
          color={p_color}
          size={getSizeStyle(icon.size)}
        />
      )}
      {icon.value.type === IconType.Entypo && (
        <Entypo
          name={icon.value.name}
          color={p_color}
          size={getSizeStyle(icon.size)}
        />
      )}
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default ColoredButton;
