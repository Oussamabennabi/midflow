import React from "react";
import { View } from "react-native";

import { COLOR_SHADES } from "@/constants/Colors";

import Space from "@/components/ui/Space";
import Typography from "@/components/ui/Typography";

import Button from "@/components/ui/Button";
import OrSeporator from "@/components/ui/OrSeporator";
import SocialButtons from "@/components/(auth)/social-buttons";
import AuthHeader from "@/components/(auth)/auth-header";

import { router } from "expo-router";
import SignUpForm from "@/components/forms/SignUpForm";
import { ScrollView } from "@/components/Themed";

const SignUp = () => {
  return (
    <>
      <ScrollView>
        <AuthHeader
          subTitle="Sign up and get your health personalized with our AI Technology."
          title="Sign Up For Free!"
        />
        <SignUpForm />
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
            size="md"
            onPress={() => router.push("/signin")}
            color={COLOR_SHADES.blue.primary}
          />

          <Space space="xxl" />
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
