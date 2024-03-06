import DoctorHeader from "@/components/doctor/doctor-header";
import ReviewsList from "@/components/reviews/ReviewsList";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Space from "@/components/ui/Space";
import { Calendar } from "react-native-calendars";
import AskForAppointmentCalendar from "@/components/calendar/AskForAppointmentCalendar";
const DoctorDetails = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();

  const doctor = useQuery(api.doctor.get_by_id, { id });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["16%", "90%"], []);
  // callbacks
  const handleExpandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <DoctorHeader doctor={doctor} />

        <View style={{ padding: 24 }}>
          <Typography
            text="About Doctor"
            size="lg"
            style={{ borderBottomWidth: 3, paddingBottom: 3, marginBottom: 10 }}
          />

          <View>
            <Typography text={doctor?.years_of_experiance.toString() ?? ""} />
          </View>

          <Typography text={doctor?.bio ?? ""} />

          {doctor && <ReviewsList doctor_id={doctor._id} />}
        </View>
      </ScrollView>

      <BottomSheet
        handleIndicatorStyle={{
          backgroundColor: COLOR_SHADES.blue.primary,
        }}
        snapPoints={snapPoints}
        containerStyle={{}}
        ref={bottomSheetRef}
        enableOverDrag
      >
        <BottomSheetView
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
        </BottomSheetView>
      </BottomSheet>
      {/* floating button */}
      <View
        style={{
          position: "absolute",
          left: 10,
          bottom: 0,
          right: 10,
          backgroundColor: "white",
        }}
      >
        <Button
          onPress={handleExpandSheet}
          style={{ borderRadius: 18, marginBottom: 10 }}
          label="Book Appointment"
        />
      </View>
    </>
  );
};

export default DoctorDetails;
