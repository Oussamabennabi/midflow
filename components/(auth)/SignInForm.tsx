import { SPACING } from "@/constants/Spacing";
import { Formik } from "formik";
import { View } from "../Themed";
import {
  AntDesign,
} from "@expo/vector-icons";
import Space from "../ui/Space";
import ErrorChip from "../ui/ErrorChip";
import Button from "../ui/Button";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { getToastOptions } from "@/utils/getToastOptions";
import { getErrorMessageFromClerkCode } from "@/utils/getErrorMessageFromClerkCode";
import { ActivityIndicator } from "react-native";
import { EmailInput, PasswordInput } from "../form-inputs";

const SignInForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { signIn, setActive, isLoaded } = useSignIn();
  const handleSubmit = async (values: { email: string; password: string }) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      Toast.show(
        getToastOptions({
          message1: getErrorMessageFromClerkCode(err.errors[0].code),
          type: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <>
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
            <EmailInput handleChange={handleChange} value={values.email} />
            {touched.email && errors.email && (
              <>
                <Space />
                <ErrorChip text={errors.email} />
              </>
            )}

            <Space />

            <PasswordInput
              handleChange={handleChange}
              value={values.password}
              hidden={isPasswordHidden}
              setHidden={setIsPasswordHidden}
            />
            {touched.password && errors.password && (
              <>
                <Space />
                <ErrorChip text={errors.password} />
              </>
            )}

            <Space space="lg" />
            <Button
              iconLeft={
                isSubmitting && <ActivityIndicator size="small" color="white" />
              }
              variant={isSubmitting ? "disabled" : ""}
              iconRight={<AntDesign name="swapright" size={24} color="white" />}
              disabled={isSubmitting}
              onPress={handleSubmit}
              label="Submit"
            />
          </View>
        )}
      </Formik>
      <Toast />
    </>
  );
};

export default SignInForm;
