import { SPACING } from "@/constants/Spacing";
import React from "react";
import { View } from "react-native";
const Space = ({ space = "md" }: { space?: keyof typeof SPACING }) => {
  return <View style={{ height: SPACING[space] }} />;
};

export default Space;
