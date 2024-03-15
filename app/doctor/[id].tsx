import DoctorHeader from "@/components/doctor/doctor-header";
import ReviewsList from "@/components/reviews/ReviewsList";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef } from "react";
import { View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import AppointmentBottomSheet from "@/components/bottom-sheets/AppointmentBottomSheet";
import { ScrollView } from "@/components/Themed";
import { useTheme } from "@/providers/theme-color-provider";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Space from "@/components/ui/Space";
const DoctorDetails = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();

  const doctor = useQuery(api.doctor.get_by_id, { id });
  const { colors } = useTheme();
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

        <View style={{ padding: 12 }}>
          {/*  */}
          <View
            style={{
              marginBottom: 100,
            }}
          >
            <Typography
              text="About Doctor"
              size="lg"
              style={{
                borderBottomWidth: 3,
                paddingBottom: 3,
                marginBottom: 10,
                borderColor: colors.border_color,
              }}
            />

            <Typography text={doctor?.bio ?? ""} />
          </View>

          {/*  */}
          <View
            style={{
              marginBottom: 100,
            }}
          >
            <Typography
              text="Doctor Location"
              size="lg"
              style={{
                borderBottomWidth: 3,
                paddingBottom: 3,
                marginBottom: 10,
                borderColor: colors.border_color,
              }}
            />
            {doctor?.location && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 6,
                    padding: 2,
                    gap: 3,
                  }}
                >
                  <Feather
                    name="map-pin"
                    size={18}
                    style={{
                      marginBottom: -4,
                    }}
                    color={COLOR_SHADES.gray.secondary}
                  />
                  <Typography  text={doctor.location?.name || "N/A"} />
                </View>

                <Typography
                  text={doctor?.location?.description ?? "N/A"}
                  variant="secondary"
                />
                <Space />
                <View>
                  <MapView
                    mapType="hybrid"
                    initialRegion={{
                      latitude: doctor.location.latitude,
                      longitude: doctor.location.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                    style={{
                      width: "auto",
                      height: 250,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: doctor.location.latitude,
                        longitude: doctor.location.longitude,
                      }}
                      image={require("@/assets/map/doctor-marker.png")}
                    />
                  </MapView>
                </View>
              </>
            )}
          </View>

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
          backgroundColor: colors.secondary_bg,
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
