import AuthHeader from "@/components/(auth)/auth-header";
import { ScrollView, View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import i18n from "@/config/i18n";
import { getErrorMessageFromClerkCode } from "@/utils/getErrorMessageFromClerkCode";
import { getToastOptions } from "@/utils/getToastOptions";
import { useSignUp } from "@clerk/clerk-expo";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Stack from "expo-router/stack";
import { useState } from "react";
import Toast from "react-native-toast-message";

const VerifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [value, setValue] = useState("");
  const onVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: value,
      });
      await setActive({ session: completeSignUp.createdSessionId });
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
      <ScrollView>
        <Stack.Screen options={{ presentation: "modal" }} />

        <AuthHeader subTitle={i18n.t("otp_header")} title={i18n.t("otp")} />

        <View style={{ paddingHorizontal: 5, flex: 1, marginTop: 100 }}>
          <Input
            onChangeText={(t) => setValue(t)}
            value={value}
            placeholder="Password"
          />
          <Button label="Send" onPress={onVerify} />
          {/* <OTPInputView
          // onCodeFilled={onVerify}
          // autoFocusOnLoad
          onCodeFilled={(code) => onVerify(code)}
          pinCount={6}
          codeInputFieldStyle={{
            borderColor: COLOR_SHADES.blue.primary,
            borderRadius: 10,
            width: 60,
            height: 60,
          }}
          selectionColor={COLOR_SHADES.blue.shade6}
        /> */}
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default VerifyEmail;
