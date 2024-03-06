import DoctorHeader from "@/components/doctor/doctor-header";
import ReviewsList from "@/components/reviews/ReviewsList";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import AppointmentBottomSheet from "@/components/bottom-sheets/AppointmentBottomSheet";
const DoctorDetails = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();

  const doctor = useQuery(api.doctor.get_by_id, { id });
  const bottomSheetRef = useRef<BottomSheet>(null);
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

      <AppointmentBottomSheet doctor={doctor} ref={bottomSheetRef} />

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
