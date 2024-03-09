import React from "react";
import { View } from "react-native";
import Typography from "./Typography";

import { FontAwesome5 } from '@expo/vector-icons';
import { COLOR_SHADES } from "@/constants/Colors";
import { SPACING } from "@/constants/Spacing";
const ErrorChip = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        
        borderWidth: 2,
        borderColor: COLOR_SHADES.red.shade5,
        padding: SPACING.sm,
        borderRadius:8,
        width:"100%",
        alignItems:"center",
        gap:10,
        flexDirection:"row"
      }}
    >
        <FontAwesome5 name="exclamation-triangle" size={18} color={COLOR_SHADES.red.shade5} />
              <Typography variant="error" text={text} />

    </View>
  );
};

export default ErrorChip;
