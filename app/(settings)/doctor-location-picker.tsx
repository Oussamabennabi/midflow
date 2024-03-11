import React, { useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import SelectAddressOnMapBottomSheet from "@/components/bottom-sheets/SelectAddressOnMapBottomSheet";
import MapView, { Marker, Region } from "react-native-maps";
import { ActivityIndicator, StyleSheet } from "react-native";

import * as Location from "expo-location";
import { View } from "@/components/Themed";
import { COLOR_SHADES } from "@/constants/Colors";
import { useTheme } from "@/providers/theme-color-provider";

const DoctorLocationPicker = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { dark } = useTheme();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setCurrentLocation(location);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <MapView
        userInterfaceStyle={dark ? "dark" : "light"}
        showsMyLocationButton
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={initialRegion}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="Your Location"
          />
        )}
      </MapView>

      {/* <SelectAddressOnMapBottomSheet ref={bottomSheetRef} /> */}
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
    </>
  );
};

export default DoctorLocationPicker;
