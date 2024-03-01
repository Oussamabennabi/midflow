import React, { ReactNode, } from "react";
import {  TextInput, TextInputProps, View } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";
type InputType = {
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  onIconPress?:()=>void
}&TextInputProps;
const Input: React.FC<InputType> = ({ iconLeft, iconRight,onIconPress,...props  }) => {

  return (
    <View
      style={{
        borderRadius: 8,
        padding: 10,
        paddingVertical:15,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {iconLeft && (
        <RNBounceable
          onPress={()=>{}}
          bounceEffectIn={1.5}
          bounceEffectOut={1}
          style={{ marginRight: 8,  }}
        >
          {iconLeft}
        </RNBounceable>
      )}

      <TextInput
      selectionColor={COLOR_SHADES.blue.shade2}
      cursorColor={COLOR_SHADES.blue.primary}
        style={{
          fontFamily: FONT.Bold,
          flex:1,
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
