import React, { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";
import { useTheme } from "@/providers/theme-color-provider";

type InputType = {
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  isMultiline?: boolean;
  onIconPress?: () => void;
} & TextInputProps;
const Input: React.FC<InputType> = ({
  iconLeft: IconLeft,
  iconRight,
  isMultiline,
  onIconPress,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        borderRadius: 8,
        padding: 10,
        paddingVertical: 15,
        backgroundColor: colors.secondary_bg,
        flexDirection: "row",
        alignItems:isMultiline?"flex-start": "center",
        justifyContent:"flex-start"
        
      }}
    >
      {IconLeft && (
        <RNBounceable
          onPress={() => {}}
          bounceEffectIn={1.5}
          bounceEffectOut={1}
          style={{ marginRight: 8 }}
        >
          {IconLeft}
        </RNBounceable>
      )}

      <TextInput
      
        selectionColor={COLOR_SHADES.blue.shade2}
        cursorColor={COLOR_SHADES.blue.primary}
        placeholderTextColor={colors.secondary_text}
        style={{
          fontFamily: FONT.Bold,
          flex: 1,
          color: colors.primary_text,
        }}
        {...props}
      />
      {iconRight && (
        <RNBounceable
          onPress={onIconPress}
          bounceEffectIn={1.5}
          bounceEffectOut={1}
          style={{ marginRight: 8, marginLeft: "auto" }}
        >
          {iconRight}
        </RNBounceable>
      )}
    </View>
  );
};

export default Input;
