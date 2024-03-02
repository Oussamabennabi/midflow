import { View } from "react-native";
import React, { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "../ui/Typography";
type SettingsItem = {
  label: string;
  icon: ReactNode;
  rightIcon?: ReactNode;
};

const ListItem = ({
  item,
  dangerItem,
}: {
  item: SettingsItem;
  dangerItem?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
        backgroundColor: dangerItem ? COLOR_SHADES.red.shade2 : "white",
        borderRadius: 16,
        padding: 12,
      }}
    >
      <View
        style={{
          borderColor:dangerItem?COLOR_SHADES.red.shade5: COLOR_SHADES.gray.shade2,
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
          <MaterialIcons name="arrow-forward-ios" size={24} color={dangerItem?COLOR_SHADES.red.shade5:"black"} />
        )}
      </View>
    </View>
  );
};

export default ListItem;
