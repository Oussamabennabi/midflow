import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-color-provider";
import Ripple from "react-native-material-ripple";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataModel } from "@/convex/_generated/dataModel";

const LocationInput = ({ onPress }: { onPress: any }) => {
  const { colors, dark } = useTheme();
  const currentUser = useQuery(api.users.currentUser);
  const doctor = currentUser as DataModel["doctors"]["document"];

  return (
    <>
      <Typography
        text="Location"
        size="md"
        style={{ paddingVertical: SPACING.md }}
      />

      <Ripple
        onPress={onPress}
        rippleContainerBorderRadius={10}
        style={{
          gap: 8,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 14,
          borderRadius: 10,
          backgroundColor: colors.secondary_bg,
          flexDirection: "row",
        }}
      >
        <MaterialIcons
          name="share-location"
          size={24}
          color={colors.icon_color_pr}
        />
        <Typography
          variant="secondary"
          text={doctor.location?.name ?? "Select a Location"}
        />
      </Ripple>
    </>
  );
};

export default LocationInput;
