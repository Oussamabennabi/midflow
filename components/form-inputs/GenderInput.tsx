import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "@/providers/theme-color-provider";
import { MaterialIcons } from "@expo/vector-icons";

const GenderInput = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
  const {dark,colors} = useTheme()
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
        fixAndroidTouchableBug

        darkTheme={dark}
        onValueChange={handleChange("gender")}
        Icon={() => (
          <MaterialIcons
            name="person"
            size={24}
            color={colors.icon_color_pr}
          />
        )}

        style={{
          chevronContainer:{
          },
          viewContainer: {
            backgroundColor: colors.secondary_bg,
            borderRadius: 10,
          },
          
          iconContainer: {
            position: "absolute",
            left: 8,
            top: 14,
            width: 24,
          },
          placeholder: {
            marginLeft: 24,
            color:colors.secondary_text
          },
          inputAndroid: {
            marginLeft: 24,
            color:colors.primary_text

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
