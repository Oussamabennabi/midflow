import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Formik } from "formik";

import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import Input from "@/components/ui/Input";
import Space from "@/components/ui/Space";
import Typography from "@/components/ui/Typography";
import { SPACING } from "@/constants/Spacing";
import ErrorChip from "@/components/ui/ErrorChip";
import Button from "@/components/ui/Button";
import OrSeporator from "@/components/ui/OrSeporator";
import SocialButtons from "@/components/(auth)/social-buttons";
import AuthHeader from "@/components/(auth)/auth-header";

const SignUpScreen = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <ScrollView
      style={{ backgroundColor: COLOR_SHADES.gray.shade1, height: "100%" }}
    >
      {/* Card */}
      <AuthHeader
        subTitle="Sign up and get your health personalized with our AI Technology."
        title="Sign Up For Free!"
      />

      {/* end of Card */}

      {/* Form */}
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
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

          if (values.password && !values.confirmPassword) {
            errors.confirmPassword = "Confirm Password";
          }
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password Must Match";
          }
          return errors;
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={{ padding: SPACING.lg }}>
            <Typography
              text="Email"
              size="md"
              style={{ paddingVertical: SPACING.md }}
            />
            <Input
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email"
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

            <Space />
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

            <Space />
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
            <Space space="lg" />
            <Button onPress={handleSubmit} label="Submit" />
          </View>
        )}
      </Formik>
      {/* End of form */}

      <OrSeporator />
      <Space space="xl" />
      <SocialButtons />
      <Space space="lg" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          text="Already have an account?"
          variant="secondary"
          font="SemiBold"
        />
        <Button
          label="Sign In"
          variant="inline"
          size="sm"
          color={COLOR_SHADES.blue.primary}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
