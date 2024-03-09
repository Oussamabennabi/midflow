import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-color-provider";

const LastName = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
  const {colors}= useTheme()
  return (
    <>
      <Typography
        text="Last Name"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />
      <Input
        onChangeText={handleChange("lastName")}
        value={value}
        placeholder="Last name"
        keyboardType="name-phone-pad"
        autoComplete="family-name"
        iconLeft={
          <MaterialCommunityIcons
            name="face-man-profile"
            size={22}
            color={colors.icon_color_pr}
          />
        }
      />
    </>
  );
};

export default LastName;
