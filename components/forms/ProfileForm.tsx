import { Formik } from "formik";
import React from "react";
import { View } from "../Themed";
import { SPACING } from "@/constants/Spacing";

import { AntDesign, Feather } from "@expo/vector-icons";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";

import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  AccoutTypeInput,
  EmailInput,
  FirstName,
  LastName,
  LocationInput,
} from "../form-inputs";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import IconButton from "../ui/IconButton";
import { COLOR_SHADES } from "@/constants/Colors";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as ImagePicker from "expo-image-picker";
import { uploadImageAsync } from "./uploadImageAsync";
import { Id } from "@/convex/_generated/dataModel";
const ProfileForm = () => {
  const { user } = useUser();
  const currentUser = useQuery(api.users.currentUser);

  const generateUploadUrl = useMutation(api.doctor.generateUploadUrl);
  const updatePhoto = useMutation(api.users.update_photo);

  const d = useWindowDimensions();

  const handleOpenMapSelector = () => {
    router.push("/doctor-location-picker");
  };

  const handleSubmit = async (values: {
    email: string;
    firstName: string;
    lastName: string;
    location: string;
  }) => {};

  const handleProfileEdit = async () => {
    const res = await ImagePicker.launchCameraAsync();
    if (!res.canceled) {
      const postUrl = await generateUploadUrl();
      const result = await uploadImageAsync(res.assets[0].uri, postUrl);
      const { storageId }: { storageId: Id<"_storage"> } = await result?.json();
      updatePhoto({
        storage_id: storageId,
        doctor_id: currentUser?._id as any,
      });
    }
  };

  if (!user) return <View></View>;
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 120,
          left: d.width / 2 - 50,
          backgroundColor: "transparent",
        }}
      >
        <Image
          source={{ uri: user.imageUrl, height: 100, width: 100 }}
          style={{
            borderRadius: 14,
          }}
        />
        {currentUser?.role !== "Patient" && (
          <IconButton
            onPress={handleProfileEdit}
            style={{
              position: "absolute",
              borderWidth: 2,
              bottom: -20,
              left: 30,
            }}
            small
            bgColor={COLOR_SHADES.gray.primary}
            icon={<Feather name="edit" size={24} color="white" />}
          />
        )}
      </View>
      <Space space="xxl" />
      <Formik
        initialValues={{
          firstName: user.firstName!,
          lastName: user.lastName!,
          email: user.emailAddresses[0].emailAddress,
          location: "",
        }}
        validate={(values) => {
          const errors = {} as any;

          if (!values.email) {
            errors.email = "required";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Invalid email format";
          }

          if (!values.firstName) {
            errors.firstName = "required";
          }
          if (!values.lastName) {
            errors.lastName = "required";
          }

          // ! if doctor make the location manditory
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
            {/* first name */}
            <>
              <FirstName handleChange={handleChange} value={values.firstName} />
              {touched.firstName && errors.firstName && (
                <>
                  <Space />
                  <ErrorChip text={errors.firstName} />
                </>
              )}
            </>

            {/* last name */}
            <>
              <LastName handleChange={handleChange} value={values.lastName} />

              {touched.lastName && errors.lastName && (
                <>
                  <Space />
                  <ErrorChip text={errors.lastName} />
                </>
              )}
            </>

            {/* location */}
            {currentUser?.role === "Doctor" && (
              <>
                <LocationInput onPress={handleOpenMapSelector} />
              </>
            )}

            {/* email */}
            <>
              <EmailInput handleChange={handleChange} value={values.email} />
              {touched.email && errors.email && (
                <>
                  <Space />
                  <ErrorChip text={errors.email} />
                </>
              )}
            </>

            <AccoutTypeInput />

            <Space space="lg" />
            <Button
              iconLeft={
                isSubmitting && <ActivityIndicator size="small" color="white" />
              }
              variant={isSubmitting ? "disabled" : ""}
              iconRight={<AntDesign name="swapright" size={24} color="white" />}
              disabled={isSubmitting}
              onPress={handleSubmit}
              label="Submit"
            />
          </View>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
