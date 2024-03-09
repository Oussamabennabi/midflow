import { View } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { COLOR_SHADES } from "@/constants/Colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DoctorHeader from "../doctor/doctor-header";
import { DoctorWithUserType } from "@/types";
import { useTheme } from "@/providers/theme-color-provider";
type PostDoctorReviewBottomSheetProps = {
  doctor?:DoctorWithUserType | null;
};
export type RefType = any;

const PostDoctorReviewBottomSheet = forwardRef<RefType, PostDoctorReviewBottomSheetProps>(
  ({ doctor }, ref) => {
    const { colors } = useTheme();

    const snapPoints = useMemo(() => ["16%", "90%"], []);

    return (
      <BottomSheet
        handleIndicatorStyle={{
          backgroundColor: COLOR_SHADES.blue.primary,
        }}
           backgroundStyle={{
          backgroundColor: colors.secondary_bg,
        }}
        snapPoints={snapPoints}
        containerStyle={{}}
        ref={ref}
        enableOverDrag
      >
        <BottomSheetView
          style={{
            padding: 10,
          }}
        >
          <View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default PostDoctorReviewBottomSheet;
