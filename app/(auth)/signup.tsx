import React from "react";
import { ScrollView, View } from "react-native";

import { COLOR_SHADES } from "@/constants/Colors";

import Space from "@/components/ui/Space";
import Typography from "@/components/ui/Typography";

import Button from "@/components/ui/Button";
import OrSeporator from "@/components/ui/OrSeporator";
import SocialButtons from "@/components/(auth)/social-buttons";
import AuthHeader from "@/components/(auth)/auth-header";

import { router } from "expo-router";
import SignUpForm from "@/components/(auth)/SignUpForm";

const SignUp = () => {

  return (
    <>
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
        <SignUpForm />
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
