import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-color-provider";

const EmailInput = ({
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
        text="Email"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />
      <Input
        onChangeText={handleChange("email")}
        value={value}
        placeholder="Email"
        autoComplete="email"
        keyboardType="email-address"
        iconLeft={
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color={colors.icon_color_pr}
          />
        }
      />
    </>
  );
};

export default EmailInput;
