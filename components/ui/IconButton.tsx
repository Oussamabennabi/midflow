import { COLOR_SHADES } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
type IconButtonType = {
  icon: ReactNode;
  style?: ViewStyle;
  bgColor?: string;
  onPress?: () => void;
};
const IconButton: React.FC<IconButtonType> = ({
  icon,
  onPress,
  style,
  bgColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: COLOR_SHADES.gray.shade2,
        borderWidth: 1,
        borderRadius: 8,
        width: 56,
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: 1 / 1,
        backgroundColor: bgColor,
        ...style,
      }}
      activeOpacity={0.5}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;
