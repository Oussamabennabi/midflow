import { useSignUp } from "@clerk/clerk-expo";
import { Formik } from "formik";
import React from "react";
import { View } from "../Themed";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";
import Toast from "react-native-toast-message";
import { getToastOptions } from "@/utils/getToastOptions";
import { getErrorMessageFromClerkCode } from "@/utils/getErrorMessageFromClerkCode";

import { ActivityIndicator } from "react-native";
import { EmailInput, FirstName, LastName, LocationInput } from "../form-inputs";

const ProfileForm = () => {
  const { signUp, setActive } = useSignUp();

  const handleSubmit = async (values: {
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    if (!signUp) return;
    try {
      //   await signUp.create({
      //     firstName: values.firstName,
      //     lastName: values.lastName,
      //   });
      //   // send the email.
      //   await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      //   // verify email to get code
      //   router.push("/verify-email");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Toast.show(
        getToastOptions({
          message1: getErrorMessageFromClerkCode(err.errors[0].code),
          type: "error",
        })
      );
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
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
          if (!values.location) {
            errors.location = "required";
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
