import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import RNPickerSelect from "react-native-picker-select";

const GenderInput = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
  return (
    <>
      <Typography
        text="Gender"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />

      <RNPickerSelect
        placeholder={{
          label: "Select your gender",
          value: "",
        }}
        onValueChange={handleChange("gender")}
        style={{
          viewContainer: {
            backgroundColor: "white",
            borderRadius: 10,
          },
        }}
        value={value}
        items={[
          { label: "Male", value: "male" },
          { label: "Female", value: "femal" },
        ]}
      />
    </>
  );
};

export default GenderInput;
