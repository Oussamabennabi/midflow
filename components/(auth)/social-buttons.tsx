import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../ui/IconButton";
import { COLOR_SHADES } from "@/constants/Colors";
const SocialButtons = () => {
  return (
    <View style={{ flexDirection: "row", gap: 10,justifyContent:"center" }}>
      <IconButton
      
        icon={<FontAwesome name="facebook-f" size={28} color={COLOR_SHADES.gray.primary} />}
      />
      <IconButton
        icon={<FontAwesome name="google" size={28} color={COLOR_SHADES.gray.primary} />}
      />
      <IconButton
        icon={<FontAwesome name="instagram" size={28} color={COLOR_SHADES.gray.primary} />}
      />
    </View>
  );
};

export default SocialButtons;
