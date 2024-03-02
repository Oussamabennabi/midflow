import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Formik } from "formik";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import AuthHeader from "@/components/(auth)/auth-header";
import { SPACING } from "@/constants/Spacing";
import Typography from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import Space from "@/components/ui/Space";
import ErrorChip from "@/components/ui/ErrorChip";
import Button from "@/components/ui/Button";
import OrSeporator from "@/components/ui/OrSeporator";
import SocialButtons from "@/components/(auth)/social-buttons";
import i18n from "@/config/i18n";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "@/services/auth";
import { getToastOptions } from "@/utils/getToastOptions";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { data, error } = await signInWithEmailAndPassword(
      values.email,
      values.password
    );
    console.log(data);
    if (error) {
      Toast.show(getToastOptions({ message1: error.message, type: "error" }));
    }
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: COLOR_SHADES.gray.shade1, height: "100%" }}
      >
        <StatusBar style="inverted" />

        {/* Card */}
        <AuthHeader
          subTitle={i18n.t("signin_header")}
          title={i18n.t("signin")}
        />

        {/* end of Card */}

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
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

            return errors;
          }}
          onSubmit={handleSubmit}
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

              <Space space="lg" />
              <Button
                disabled={isSubmitting}
                onPress={handleSubmit}
                label="Submit"
              />
            </View>
          )}
        </Formik>
        {/* End of form */}

        <OrSeporator />
        <Space space="xl" />
        <SocialButtons />
        <Space space="xl" />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            text="Don't have an account?"
            variant="secondary"
            font="SemiBold"
          />

          <Button
            label="Sign Up"
            variant="inline"
            size="md"
            onPress={() => router.replace("/signup")}
            color={COLOR_SHADES.blue.primary}
          />
          <Space space="xl" />
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default SignIn;
