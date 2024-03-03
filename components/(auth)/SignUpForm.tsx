import { useSignUp } from "@clerk/clerk-expo";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "../Themed";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import RNPickerSelect from "react-native-picker-select";

import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";
import Toast from "react-native-toast-message";
import { getToastOptions } from "@/utils/getToastOptions";
import { getErrorMessageFromClerkCode } from "@/utils/getErrorMessageFromClerkCode";
import { router } from "expo-router";

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
      router.push("/verify-email")
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
              <Typography
                text="First Name"
                size="md"
                style={{ paddingVertical: SPACING.md }}
              />
              <Input
                onChangeText={handleChange("firstName")}
                value={values.firstName}
                placeholder="First name"
                autoComplete="name"
                keyboardType="name-phone-pad"
                iconLeft={
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
              />
              {touched.firstName && errors.firstName && (
                <>
                  <Space />
                  <ErrorChip text={errors.firstName} />
                </>
              )}
            </>

            {/* last name */}
            <>
              <Typography
                text="Last Name"
                size="md"
                style={{ paddingVertical: SPACING.md }}
              />
              <Input
                onChangeText={handleChange("lastName")}
                value={values.lastName}
                placeholder="Last Name"
                autoComplete="family-name"
                keyboardType="name-phone-pad"
                iconLeft={
                  <MaterialCommunityIcons
                    name="face-man-profile"
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
              />
              {touched.lastName && errors.lastName && (
                <>
                  <Space />
                  <ErrorChip text={errors.lastName} />
                </>
              )}
            </>

            {/* gender */}
            <>
              <Typography
                text="Gender"
                size="md"
                style={{ paddingVertical: SPACING.md }}
              />

              <RNPickerSelect
                onValueChange={handleChange("gender")}
                style={{
                  viewContainer: {
                    backgroundColor: "white",
                    borderRadius: 10,
                  },
                }}
                value={values.gender}
                items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "femal" },
                ]}
              />

              {touched.gender && errors.gender && (
                <>
                  <Space />
                  <ErrorChip text={errors.gender} />
                </>
              )}
            </>

            {/* email */}
            <>
              <Typography
                text="Email"
                size="md"
                style={{ paddingVertical: SPACING.md }}
              />
              <Input
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Email"
                autoComplete="email"
                keyboardType="email-address"
                iconLeft={
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
              />
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
              <Typography
                text="Password"
                style={{ paddingVertical: SPACING.md }}
              />

              <Input
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry={isPasswordHidden}
                iconLeft={
                  <Feather
                    name="lock"
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
                onIconPress={() => setIsPasswordHidden((prev) => !prev)}
                iconRight={
                  <FontAwesome
                    name={isPasswordHidden ? "eye" : "eye-slash"}
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
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
              <Typography
                text="Confirm Password"
                style={{ paddingVertical: SPACING.md }}
              />

              <Input
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={isPasswordHidden}
                iconLeft={
                  <Feather
                    name="lock"
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
                onIconPress={() => setIsPasswordHidden((prev) => !prev)}
                iconRight={
                  <FontAwesome
                    name={isPasswordHidden ? "eye" : "eye-slash"}
                    size={22}
                    color={COLOR_SHADES.gray.primary}
                  />
                }
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
                isSubmitting && <MaterialCommunityIcons name="loading" />
              }
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
