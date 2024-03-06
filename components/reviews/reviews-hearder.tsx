import React from "react";
import { TouchableOpacity, View } from "react-native";

import { SPACING } from "@/constants/Spacing";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DataModel } from "@/convex/_generated/dataModel";

type ReviewsHeaderType = {
};
const ReviewsHeader: React.FC<ReviewsHeaderType> = ({
}) => {
  return (
    <View
      style={{
        backgroundColor: COLOR_SHADES.gray.primary,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        padding: SPACING.xl,
        paddingBottom:  SPACING.xl,
        paddingTop: SPACING.mxl,
      }}
    >
      <StatusBar style="inverted" backgroundColor={COLOR_SHADES.gray.primary} />
      {/* header */}
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ marginTop: 7 }}
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/doctors")
            }
          >
            <Entypo name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          <Typography
            text={"Doctor Reviews"}
            style={{ color: "white" }}
            font="ExtraBold"
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewsHeader;
