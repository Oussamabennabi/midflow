import React, {  useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import DoctorPlaceSelectBottomSheet from "@/components/bottom-sheets/DoctorPlaceSelectBottomSheet"
import MapView, {
  LatLng,
  MapType,
  Marker,
} from "react-native-maps";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { COLOR_SHADES } from "@/constants/Colors";
import { useTheme } from "@/providers/theme-color-provider";
import Toast from "react-native-toast-message";
import IconButton from "@/components/ui/IconButton";
import { Entypo } from "@expo/vector-icons";

const DoctorLocationPicker = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { dark } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [pressedRegion, setPressedRegion] = useState<LatLng | null>(null);

  const [mapType, setMapType] = useState<MapType>("hybrid");
  return (
    <>
      <MapView
        mapType={mapType}
        onPress={(e) => {
          setPressedRegion( e.nativeEvent.coordinate);
        }}
        userInterfaceStyle={dark ? "dark" : "light"}
        showsCompass={false}
        showsUserLocation
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        {pressedRegion && (
          <Marker
            title="Your selected place"
            description="this is what people will see in the map"
            coordinate={pressedRegion}
            onDragEnd={(e) =>
              setPressedRegion(e.nativeEvent.coordinate)
            }
            draggable
            image={require("@/assets/map/doctor-marker.png")}
          />
        )}
      </MapView>

      <DoctorPlaceSelectBottomSheet location={pressedRegion} ref={bottomSheetRef} />
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: "#000000A6",
              justifyContent: "center",
              alignContent: "center",
            },
          ]}
        >
          <ActivityIndicator size={60} color={COLOR_SHADES.blue.primary} />
        </View>
      )}
      <View
        style={[
          {
            justifyContent: "center",
            alignContent: "center",
            position: "absolute",
            top: 11,
            right: 60,
            backgroundColor: "transparent",
          },
        ]}
      >
        <IconButton
          small
          onPress={() =>
            setMapType((p) => (p === "hybrid" ? "standard" : "hybrid"))
          }
          bgColor={COLOR_SHADES.blue.primary}
          icon={<Entypo name="layers" size={24} color="white" />}
        />
      </View>

      <Toast />
    </>
  );
};

export default DoctorLocationPicker;
