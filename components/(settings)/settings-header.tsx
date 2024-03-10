import React from "react";
import { TouchableOpacity, View } from "react-native";

import { SPACING } from "@/constants/Spacing";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import BackArrow from "../ui/BackArrow";

type SettingsHeaderType = {
  title: string;
  paddingBottom?:boolean
};
const SettingsHeader: React.FC<SettingsHeaderType> = ({ title,paddingBottom }) => {
  return (
    <View
      style={{
        backgroundColor: COLOR_SHADES.gray.primary,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,

        padding: SPACING.xl,
        paddingBottom:paddingBottom?SPACING.xxxl:SPACING.xl,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: SPACING.xl,
        
      }}
    >
      <StatusBar
          style="inverted"
          backgroundColor={COLOR_SHADES.gray.primary}
        />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
         <BackArrow
          style={{
            marginTop:7
          }}
          white
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/settings")
          }
          />
       
        <Typography
          text={title}
          style={{ color: "white" }}
          font="ExtraBold"
          size="lg"
        />
      </View>
    </View>
  );
};

export default SettingsHeader;
