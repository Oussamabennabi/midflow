import { View } from "@/components/Themed";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const VerifyEmail = () => {
  return (
    <View>
      <OTPInputView
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
        pinCount={4}
        autoFocusOnLoad
      />
    </View>
  );
};

export default VerifyEmail;
