import { View, Text } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";
import { useTheme } from "@/providers/theme-color-provider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../ui/Typography";
type LatLongProps = {
  location: { latitude?: number; longitude?: number } | null;
};
const LatLong = ({ location }: LatLongProps) => {
  const { colors } = useTheme();
  
  
  return (
    <View>
      <Ripple
        rippleContainerBorderRadius={10}
        style={{
          paddingHorizontal: 8,
          paddingVertical: 14,
          borderRadius: 10,
          backgroundColor: colors.secondary_bg,
          gap: 20,
        }}
      >
        <View
          style={{
            gap: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="longitude"
            size={24}
            color={colors.icon_color_pr}
          />
          <Typography variant="secondary" text={location?.longitude as any} />
        </View>
        <View
          style={{
            gap: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="latitude"
            size={24}
            color={colors.icon_color_pr}
          />

          <Typography variant="secondary" text={location?.latitude as any} />
        </View>
      </Ripple>
    </View>
  );
};

export default LatLong;
