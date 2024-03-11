import { View } from "react-native";
import React, { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "../ui/Typography";
import { useTheme } from "@/providers/theme-color-provider";
import Ropple from "react-native-material-ripple";
type SettingsItem = {
  label: string;
  icon: ReactNode;
  rightIcon?: ReactNode;
};

const ListItem = ({
  item,
  dangerItem,
  onPress,
}: {
  item: SettingsItem;
  dangerItem?: boolean;
  onPress?: () => void;
}) => {
  const { colors } = useTheme();

  return (
    <Ropple
      rippleContainerBorderRadius={16}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
        backgroundColor: dangerItem ? "transparent" : colors.secondary_bg,
        borderRadius: 16,
        padding: 12,
        borderColor: dangerItem ? COLOR_SHADES.red.shade5 : "transparent",
        borderWidth: 2,
      }}
    >
      <View
        style={{
          borderColor: dangerItem
            ? COLOR_SHADES.red.shade5
            : colors.border_color,
          borderWidth: 1,
          borderRadius: 8,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: 1 / 1,
          marginRight: 8,
        }}
      >
        {item.icon}
      </View>

      <Typography
        variant={dangerItem ? "error" : "primary"}
        text={item.label}
      />
      <View style={{ marginLeft: "auto" }}>
        {item.rightIcon ? (
          item.rightIcon
        ) : (
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={dangerItem ? COLOR_SHADES.red.shade5 : colors.icon_color_pr}
          />
        )}
      </View>
    </Ropple>
  );
};

export default ListItem;
