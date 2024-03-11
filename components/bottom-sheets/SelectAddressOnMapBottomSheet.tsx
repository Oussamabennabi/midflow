import { StyleSheet } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { COLOR_SHADES } from "@/constants/Colors";
import BottomSheet, { BottomSheetDraggableView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@/providers/theme-color-provider";
import MapView from "react-native-maps";
import Typography from "../ui/Typography";
type SelectAddressOnMapBottomSheetProps = {};
export type RefType = any;

const SelectAddressOnMapBottomSheet = forwardRef<
  RefType,
  SelectAddressOnMapBottomSheetProps
>(({}, ref) => {
  const { colors } = useTheme();

  const snapPoints = useMemo(() => ["25%","90%"], []);

  return (
    <BottomSheet
      handleIndicatorStyle={{
        backgroundColor: COLOR_SHADES.blue.primary,
      }}
      backgroundStyle={{
        backgroundColor: colors.secondary_bg,
      }}
      snapPoints={snapPoints}
      ref={ref}
      enableOverDrag
    >
      <BottomSheetView
        style={{
          flex: 1,
        }}

      >
       <Typography text="fgfg"/>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default SelectAddressOnMapBottomSheet;
