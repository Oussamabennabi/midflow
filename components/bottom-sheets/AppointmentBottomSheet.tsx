import { View } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { COLOR_SHADES } from "@/constants/Colors";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AskForAppointmentCalendar from "../calendar/AskForAppointmentCalendar";
import Space from "../ui/Space";
import Typography from "../ui/Typography";
import { DataModel } from "@/convex/_generated/dataModel";
import { useTheme } from "@/providers/theme-color-provider";
type AppointmentBottomSheetProps = {
  doctor?: DataModel["doctors"]["document"] | null;
};
export type RefType = any;

const AppointmentBottomSheet = forwardRef<RefType, AppointmentBottomSheetProps>(
  ({ doctor }, ref) => {
    const snapPoints = useMemo(() => ["16%", "90%"], []);
    const { colors } = useTheme();
    return (
      <BottomSheet
        backgroundStyle={{
          backgroundColor: colors.secondary_bg,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLOR_SHADES.blue.primary,
        }}
        snapPoints={snapPoints}
        containerStyle={{}}
        ref={ref}
        enableOverDrag
      >
        <BottomSheetScrollView
          style={{
            padding: 10,
          }}
        >
          <View>
            {/*  */}
            <View style={{ gap: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography text="Consultation price:" variant="secondary" />
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <MaterialCommunityIcons
                    style={{
                      backgroundColor: COLOR_SHADES.purply.opacity,
                      borderRadius: 200,
                      height: 20,
                    }}
                    name="currency-usd"
                    size={20}
                    color={COLOR_SHADES.purply.shade5}
                  />

                  <Typography
                    style={{ marginTop: -4 }}
                    text={
                      doctor?.starting_consultaion_price.toString() ?? "N/A"
                    }
                  />
                </View>
              </View>
            </View>

            {/*  */}
            <Space space="xl" />
            <Typography text="New Appointment" size="lg" />

            <View style={{ flexDirection: "row", gap: 5 }}>
              <FontAwesome
                style={{
                  backgroundColor: COLOR_SHADES.blue.lowOpacity,
                  borderRadius: 100,
                  height: 20,
                  width: 18,
                }}
                name="question"
                size={22}
                color={COLOR_SHADES.blue.primary}
              />
              <Typography
                text="Please select an available date or schedual to conduct a consultaion"
                variant="secondary"
              />
            </View>
            <Space space="xl" />

            <AskForAppointmentCalendar doctor={doctor} />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

export default AppointmentBottomSheet;
