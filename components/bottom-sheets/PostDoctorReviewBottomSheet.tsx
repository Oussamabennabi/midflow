import { View } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { COLOR_SHADES } from "@/constants/Colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DoctorHeader from "../doctor/doctor-header";
import { DoctorWithUserType } from "@/types";
type PostDoctorReviewBottomSheetProps = {
  doctor?:DoctorWithUserType | null;
};
export type RefType = any;

const PostDoctorReviewBottomSheet = forwardRef<RefType, PostDoctorReviewBottomSheetProps>(
  ({ doctor }, ref) => {
    const snapPoints = useMemo(() => ["16%", "90%"], []);

    return (
      <BottomSheet
        handleIndicatorStyle={{
          backgroundColor: COLOR_SHADES.blue.primary,
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
            <DoctorHeader doctor={doctor}/>
           
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default PostDoctorReviewBottomSheet;
