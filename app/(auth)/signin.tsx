import React from "react";
import { ScrollView, View } from "react-native";
import { COLOR_SHADES } from "@/constants/Colors";
import AuthHeader from "@/components/(auth)/auth-header";
import Typography from "@/components/ui/Typography";
import Space from "@/components/ui/Space";
import Button from "@/components/ui/Button";
import OrSeporator from "@/components/ui/OrSeporator";
import SocialButtons from "@/components/(auth)/social-buttons";
import i18n from "@/config/i18n";

import { router } from "expo-router";
import Toast from "react-native-toast-message";
import SignInForm from "@/components/(auth)/SignInForm";

const SignIn = () => {
 
  return (
    <>
      <ScrollView
        style={{ backgroundColor: COLOR_SHADES.gray.shade1, height: "100%" }}
      >
        

        {/* Card */}
        <AuthHeader
          subTitle={i18n.t("signin_header")}
          title={i18n.t("signin")}
        />

        {/* end of Card */}

        {/* Form */}
        <SignInForm />
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
