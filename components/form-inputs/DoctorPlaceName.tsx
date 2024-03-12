import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-color-provider";

const DoctorPlaceName = ({
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
        text="Place Name"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />
      <Input
        onChangeText={handleChange("name")}
        value={value}
        placeholder="Place Name..."
        autoComplete="off"
        iconLeft={
          <MaterialCommunityIcons name="map-marker-circle" size={24} color={colors.icon_color_pr} />
        }
      />
    </>
  );
};

export default DoctorPlaceName;
