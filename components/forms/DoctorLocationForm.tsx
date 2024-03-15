import { View, ActivityIndicator, Image, Alert } from "react-native";
import React from "react";
import { FieldArray, Formik } from "formik";
import { SPACING } from "@/constants/Spacing";
import Space from "../ui/Space";
import Button from "../ui/Button";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { DoctorPlaceDescription, DoctorPlaceName } from "../form-inputs";
import ErrorChip from "../ui/ErrorChip";
import LatLong from "../form-inputs/LatLong";
import Toast from "react-native-toast-message";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataModel, Id } from "@/convex/_generated/dataModel";
import * as ImagePicker from "expo-image-picker";
import ColoredButton, { IconType } from "../ui/ColoredButton";
import { COLOR_SHADES } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Typography from "../ui/Typography";
import IconButton from "../ui/IconButton";
import { uploadImageAsync } from "./uploadImageAsync";
type DoctorLocationFormProps = {
  location: { latitude: number; longitude: number } | null;
};
const DoctorLocationForm = ({ location }: DoctorLocationFormProps) => {
  const currentUser = useQuery(api.users.currentUser);

  const doctor = currentUser as DataModel["doctors"]["document"];
  const mutate = useMutation(api.doctor.update_location);
  const generateUploadUrl = useMutation(api.doctor.generateUploadUrl);

  

  const handleSubmit = async (values: {
    name: string;
    description: string;
    images: string[];
  }) => {
    if (!currentUser || currentUser.role !== "Doctor") return;
    // if (
    //   !location ||
    //   !location.latitude ||
    //   !location.longitude ||
    //   !doctor.location?.latitude ||
    //   !doctor.location?.longitude
    // ) {
    //   Toast.show(
    //     getToastOptions({
    //       message1: "Please select a place in the map",
    //       type: "error",
    //       message2: "Tap on map and drag the blue icon",
    //     })
    //   );
    //   return;
    // }
    // upload image to convex storage

    try {
      const imagesPromise = values.images
        .filter((img) => !img.includes("https://"))
        .map(async (img) => {
          const postUrl = await generateUploadUrl();
          const result = await uploadImageAsync(img, postUrl);
          const { storageId } = await result?.json();
          return storageId as Id<"_storage">;
        });

      const images = await Promise.all(imagesPromise);

      // TODo assuming we only ever pass doctors id
      await mutate({
        doctor_id: currentUser._id as Id<"doctors">,
        // imagestodelete???
        location: {
          description: values.description,
          name: values.name,
          latitude: doctor.location?.latitude || location?.latitude,
          longitude: doctor.location?.longitude || location?.longitude,
          images,
        },
      });
    } catch (error) {
      Alert.alert(
        "There has been an error uploading the images (imagesPromis)"
      );
      console.log(error);
    }
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

  if (currentUser?.role !== "Doctor")
    return (
      <View>
        <Typography text="you are not a doctor" />
      </View>
    );
  return (
    <>
      <Formik
        initialValues={{
          name: doctor.location?.name || "",
          description: doctor.location?.description || "",
          images: doctor.location?.images || [],
        }}
        validate={(values) => {
          const errors = {} as any;

          if (!values.name) {
            errors.name = "required";
          }

          if (!values.description) {
            errors.description = "required";
          }
          if (values.images && values.images.length <= 0) {
            errors.images = "at least one is required";
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
              <LatLong
                location={{
                  latitude: doctor.location?.latitude || location?.latitude,
                  longitude: doctor.location?.longitude || location?.longitude,
                }}
              />
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

            <Typography
              size="md"
              text="Images"
              style={{ paddingVertical: SPACING.md }}
            />
            <FieldArray
              name="images"
              render={(helpers) => (
                <ScrollView
                  contentContainerStyle={{
                    gap: 10,
                  }}
                  horizontal
                >
                  {values.images &&
                    values.images.length > 0 &&
                    values.images.map((img, i) => {
                      return (
                        <View key={img} style={{ position: "relative" }}>
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

                  <IconButton
                    style={{ width: 120, height: 120 }}
                    icon={<Entypo name="plus" size={24} color="white" />}
                    bgColor={COLOR_SHADES.blue.primary}
                    onPress={() => onImageSelect(helpers.push)}
                  />
                </ScrollView>
              )}
            />
            {touched.images && errors.images && (
              <>
                <Space />
                <ErrorChip text={errors.images as string} />
              </>
            )}

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
