import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import {  MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-color-provider";

const DoctorPlaceDescription = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
  const { colors } = useTheme();

  return (
    <>
      <Typography
        text="Place Description"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />
      <Input
      multiline
      isMultiline
        onChangeText={handleChange("description")}
        value={value}
        placeholder="Place Description..."
        autoComplete="off"
        iconLeft={<MaterialIcons name="description" size={24} color={colors.icon_color_pr} />}
      />
    </>
  );
};

export default DoctorPlaceDescription;
