import { Formik } from "formik";
import React from "react";
import { View } from "../Themed";
import { SPACING } from "@/constants/Spacing";

import { AntDesign, Feather } from "@expo/vector-icons";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";
import Toast from "react-native-toast-message";

import { ActivityIndicator, Image, useWindowDimensions } from "react-native";
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

const ProfileForm = () => {
  const { user, isLoaded } = useUser();
  const d = useWindowDimensions();

  if (!user) {
    router.replace("/settings1");

    return;
  }
  const handleSubmit = async (values: {
    email: string;
    firstName: string;
    lastName: string;
    location: string;
  }) => {};
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
        <IconButton
          style={{
            position:"absolute",borderWidth:2,
            bottom:-20,
            left:30
          }}
          small
          bgColor={COLOR_SHADES.gray.primary}
          icon={<Feather name="edit" size={24} color="white" />}
        />
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
            <>
              <LocationInput
                handleChange={handleChange}
                value={values.location}
              />
              {touched.location && errors.location && (
                <>
                  <Space />
                  <ErrorChip text={errors.location} />
                </>
              )}
            </>

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
      <Toast position="bottom" />
    </>
  );
};

export default ProfileForm;
