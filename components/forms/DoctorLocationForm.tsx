import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { FieldArray, Formik } from "formik";
import { SPACING } from "@/constants/Spacing";
import Space from "../ui/Space";
import Button from "../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { DoctorPlaceDescription, DoctorPlaceName } from "../form-inputs";
import ErrorChip from "../ui/ErrorChip";
import LatLong from "../form-inputs/LatLong";
import Toast from "react-native-toast-message";
import { getToastOptions } from "@/utils/getToastOptions";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import * as ImagePicker from "expo-image-picker";
import ColoredButton, { IconType } from "../ui/ColoredButton";
import { COLOR_SHADES } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
type DoctorLocationFormProps = {
  location: { latitude: number; longitude: number } | null;
};
const DoctorLocationForm = ({ location }: DoctorLocationFormProps) => {
  const currentUser = useQuery(api.users.currentUser);
  const mutate = useMutation(api.doctor.update_location);
  const handleSubmit = async (values: {
    name: string;
    description: string;
    images: string[];
  }) => {
    if (!currentUser || currentUser.role !== "Doctor") return;
    if (!location || !location.latitude || !location.longitude) {
      Toast.show(
        getToastOptions({
          message1: "Please select a place in the map",
          type: "error",
          message2: "Tap on map and drag the blue icon",
        })
      );
      return;
    }
    console.log(values.images);
    // TODo assuming we only ever pass doctors id
    await mutate({
      doctor_id: currentUser._id as Id<"doctors">,
      location: {
        description: values.description,
        name: values.name,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  };

  async function onImageSelect(handleChange?: any) {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });
    // uri:
    // Platform.OS === 'android'
    // ? response.uri
    // : response.uri.replace('file://', ''),

    if (res.assets && res.assets.length > 0) {
      res.assets.map((asset) => handleChange(asset.uri));
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          images: [],
        }}
        validate={(values) => {
          const errors = {} as any;

          if (!values.name) {
            errors.name = "required";
          }

          if (!values.description) {
            errors.description = "required";
          }
          return errors;
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={{ padding: SPACING.lg }}>
            {/* LanLat */}
            <>
              <LatLong location={location} />
            </>
            {/* name */}
            <>
              <DoctorPlaceName
                handleChange={handleChange}
                value={values.name}
              />
              {touched.name && errors.name && (
                <>
                  <Space />
                  <ErrorChip text={errors.name} />
                </>
              )}
            </>
            {/* description */}
            <>
              <DoctorPlaceDescription
                handleChange={handleChange}
                value={values.description}
              />
              {touched.description && errors.description && (
                <>
                  <Space />
                  <ErrorChip text={errors.description} />
                </>
              )}
            </>
            <Space space="lg" />

            <FieldArray
              name="images"
              render={(helpers) =>
                values.images && values.images.length > 0 ? (
                  <ScrollView
                    contentContainerStyle={{
                      gap: 10,
                    }}
                    horizontal
                  >
                    {values.images.map((img, i) => {
                      return (
                        <View style={{ position: "relative" }}>
                          <Image
                            source={{ uri: img, width: 120, height: 120 }}
                            style={{ borderRadius: 10 }}
                          />
                          <ColoredButton
                            onPress={() => helpers.remove(i)}
                            style={{ position: "absolute", top: 5, right: 5 }}
                            p_color={COLOR_SHADES.red.shade5}
                            s_color={COLOR_SHADES.red.opacity}
                            icon={{
                              value: {
                                name: "minus-circle",
                                type: IconType.FontAweomseIcon,
                              },
                              size: "lg",
                            }}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <Button
                    label="Select Images"
                    onPress={() => onImageSelect(helpers.push)}
                  />
                )
              }
            />

            <Space space="lg" />
            <Button
              iconLeft={
                isSubmitting && <ActivityIndicator size="small" color="white" />
              }
              variant={isSubmitting ? "disabled" : ""}
              iconRight={<AntDesign name="swapright" size={24} color="white" />}
              disabled={isSubmitting}
              onPress={handleSubmit}
              label="Update"
            />
          </View>
        )}
      </Formik>
      <Toast />
    </>
  );
};

export default DoctorLocationForm;
