import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "@/providers/theme-color-provider";

const LocationInput = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
  const {colors,dark} = useTheme()
  return (
    <>
      <Typography
        text="Location"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />

      <RNPickerSelect
      darkTheme={dark}
        placeholder={{
          label: "Select a Location",
          value: "",
        }}
        onValueChange={handleChange("location")}
        fixAndroidTouchableBug
        Icon={() => (
          <MaterialIcons
            name="share-location"
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

export default LocationInput;
