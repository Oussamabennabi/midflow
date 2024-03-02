import { useSignUp } from "@clerk/clerk-expo";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "../Themed";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";

const SignUpForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { isLoaded, signUp, setActive } = useSignUp();

  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }) => {
    if (!signUp) return;
    try {
      const r = await signUp.create({
        firstName: values.firstName,
        lastName: values.lastName,
// gender:"",
        emailAddress: values.email,
        password: values.password + "kldjfmgnvverivn,nlj1",
      });

      console.log(r);
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      // if (error) {
      //   Toast.show(getToastOptions({ message1: error.message, type: "error" }));
      // }
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender:""
      }}
      validate={(values) => {
        const errors = {} as any;

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = "Invalid email format";
        }

        if (!values.password) {
          errors.password = "Password is required";
        }

        if (!values.firstName) {
          errors.firstName = "First name is required";
        }
        if (!values.lastName) {
          errors.lastName = "Last name is required";
        }
        if (!values.gender) {
          errors.lastName = "Last name is required";
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
              value={values.email}
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
            <Input
              onChangeText={handleChange("gender")}
              value={values.email}
              placeholder="Gender"
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
            disabled={isSubmitting}
            onPress={handleSubmit}
            label="Submit"
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
