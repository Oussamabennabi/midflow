import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";

const EmailInput = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
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
            color={COLOR_SHADES.gray.primary}
          />
        }
      />
    </>
  );
};

export default EmailInput;
