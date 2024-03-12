import React, { forwardRef, useMemo } from "react";
import { COLOR_SHADES } from "@/constants/Colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTheme } from "@/providers/theme-color-provider";
import DoctorLocationForm from "../forms/DoctorLocationForm";
type DoctorPlaceSelectBottomSheetProps = {
  location: { latitude: number; longitude: number } | null;
};
export type RefType = any;

const DoctorPlaceSelectBottomSheet = forwardRef<
  RefType,
  DoctorPlaceSelectBottomSheetProps
>(({ location }, ref) => {
  const { colors } = useTheme();

  const snapPoints = useMemo(() => ["25%", "90%"], []);

  return (
    <BottomSheet
      handleIndicatorStyle={{
        backgroundColor: COLOR_SHADES.blue.primary,
      }}
      backgroundStyle={{
        backgroundColor: colors.primary_bg,
      }}
      snapPoints={snapPoints}
      ref={ref}
      enableOverDrag
    >
      <BottomSheetScrollView
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        <DoctorLocationForm location={location} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default DoctorPlaceSelectBottomSheet;
