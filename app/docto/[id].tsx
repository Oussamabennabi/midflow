import DoctorHeader from "@/components/doctor/doctor-header";
import ReviewsList from "@/components/reviews/ReviewsList";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
const DoctorDetails = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();

  const doctor = useQuery(api.doctor.get_by_id, { id });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["16%", "90%"], []);

  // callbacks
  const handleExpandSheet = useCallback(() => {
    bottomSheetRef.current?.expand()
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
        backgroundColor:COLOR_SHADES.blue.primary
      }}
        snapPoints={snapPoints}
        containerStyle={{}}
        ref={bottomSheetRef}
        
      >
        <BottomSheetView
        style={{
          padding:10
        }}
        >
          <View style={{gap:10}}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography text="Consultation price:" variant="secondary" />
              <View style={{ flexDirection: "row",gap:4 }}>
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
                style={{marginTop:-4}}
                  text={
                    doctor?.starting_consultaion_price.toString() ?? "N/A"
                  }
                />
              </View>
            </View>
            <Button
            onPress={handleExpandSheet}
             style={{borderRadius:18}} label="Book Appointment" />

          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default DoctorDetails;
