import React from "react";
import { View } from "react-native";
import Typography from "./Typography";
import { COLOR_SHADES } from "@/constants/Colors";

const OrSeporator = () => {
  return (
    <View style={{ flexDirection: "row" ,alignItems:"center", justifyContent:"space-between"}}>
      <View style={{ width: "45%", height: 2,backgroundColor:COLOR_SHADES.gray.shade1 }} />
      <Typography text="Or" variant="secondary" font="Bold"/>
      <View style={{ width: "45%", height: 2,backgroundColor:COLOR_SHADES.gray.shade1 }} />
    </View>
  );
};

export default OrSeporator;
