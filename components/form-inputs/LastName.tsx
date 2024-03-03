import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";

const LastName = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
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
            color={COLOR_SHADES.gray.primary}
          />
        }
      />
    </>
  );
};

export default LastName;
