import React from "react";
import WelcomeSvg from "@/assets/WelcomeSvg";
import LogoSvg from "@/assets/LogoSvg";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import { View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR_SHADES.blue.primary,
          }}
        >
          <LogoSvg />
        </View>
        <Typography size="xxl" text="Welcome to " />
        <Typography
          text="Mid Flow"
          size="xxl"
          style={{ color: COLOR_SHADES.blue.primary }}
        />
      </View>

      <WelcomeSvg />
      <View style={{ position: "absolute", bottom: 30, left: 70, right: 70,backgroundColor:"transparent" }}>
        <Button
          iconRight={<AntDesign name="swapright" size={24} color="white" />}
          onPress={() => router.push("/onboarding")}
          label="Continue"
          style={{ width: "100%" }}
        />

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
            label="Sign in"
            variant="inline"
            size="md"
            textColor={COLOR_SHADES.red.shade5}
            onPress={() => router.replace("/signin")}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
