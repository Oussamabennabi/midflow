import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";

const LocationInput = ({
  handleChange,
  value,
}: {
  handleChange: any;
  value: any;
}) => {
  return (
    <>
      <Typography
        text="Location"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />

      <RNPickerSelect
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
            color={COLOR_SHADES.gray.primary}
          />
        )}
        style={{
          viewContainer: {
            backgroundColor: "white",
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
          },
          inputAndroid: {
            marginLeft: 24,
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
