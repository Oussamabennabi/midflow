import { useSignUp } from "@clerk/clerk-expo";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "../Themed";
import { SPACING } from "@/constants/Spacing";

import {
  AntDesign,
} from "@expo/vector-icons";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";
import Toast from "react-native-toast-message";
import { getToastOptions } from "@/utils/getToastOptions";
import { getErrorMessageFromClerkCode } from "@/utils/getErrorMessageFromClerkCode";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import {
  ConfirmPasswordInput,
  EmailInput,
  FirstName,
  GenderInput,
  LastName,
  PasswordInput,
} from "../form-inputs";

const SignUpForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { signUp, setActive } = useSignUp();

  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    gender: string;
  }) => {
    if (!signUp) return;
    try {
      await signUp.create({
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        emailAddress: values.email,
        password: values.password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // verify email to get code
      router.push("/verify-email");
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
          password: "",
          confirmPassword: "",
          gender: "",
        }}
        validate={(values) => {
          const errors = {} as any;

          if (!values.email) {
            errors.email = "required";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Invalid email format";
          }

          if (!values.password) {
            errors.password = "required";
          }

          if (!values.firstName) {
            errors.firstName = "required";
          }
          if (!values.lastName) {
            errors.lastName = "required";
          }
          if (!values.gender) {
            errors.gender = "required";
          }

          if (values.password && !values.confirmPassword) {
            errors.confirmPassword = "Confirm Password";
          }
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password Must Match";
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

            {/* gender */}
            <>
              <GenderInput handleChange={handleChange} value={values.gender} />
              {touched.gender && errors.gender && (
                <>
                  <Space />
                  <ErrorChip text={errors.gender} />
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

            <Space />

            {/* password */}
            <>
              <PasswordInput
                handleChange={handleChange}
                hidden={isPasswordHidden}
                setHidden={setIsPasswordHidden}
                value={values.password}
              />
              {touched.password && errors.password && (
                <>
                  <Space />
                  <ErrorChip text={errors.password} />
                </>
              )}
            </>

            <Space />
            {/* confirm password */}
            <>
              <ConfirmPasswordInput
                handleChange={handleChange}
                hidden={isPasswordHidden}
                setHidden={setIsPasswordHidden}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <>
                  <Space />
                  <ErrorChip text={errors.confirmPassword} />
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

export default SignUpForm;
