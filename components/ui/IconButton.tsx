
import { useTheme } from "@/providers/theme-color-provider";
import React, { ReactNode } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
type IconButtonType = {
  icon: ReactNode;
  style?: ViewStyle;
  bgColor?: string;
  onPress?: () => void;
  small?:boolean
};
const IconButton: React.FC<IconButtonType> = ({
  icon,
  onPress,
  style,
  bgColor,
  small
}) => {
  const {colors} = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: colors.border_color,
        borderWidth: 1,
        borderRadius: 8,
        width:small?40: 56,
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
