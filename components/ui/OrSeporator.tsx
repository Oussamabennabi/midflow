import React from "react";
import { View } from "react-native";
import Typography from "./Typography";
import { useTheme } from "@/providers/theme-color-provider";

const OrSeporator = () => {
  const {colors} = useTheme()
  return (
    <View style={{ flexDirection: "row" ,alignItems:"center", justifyContent:"space-between"}}>
      <View style={{ width: "45%", height: 2,backgroundColor:colors.secondary_bg }} />
      <Typography text="Or" variant="secondary" font="Bold"/>
      <View style={{ width: "45%", height: 2,backgroundColor:colors.secondary_bg }} />
    </View>
  );
};

export default OrSeporator;
