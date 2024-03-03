import React from "react";
import Typography from "../ui/Typography";
import { SPACING } from "@/constants/Spacing";
import Input from "../ui/Input";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";

const PasswordInput = ({
  handleChange,
  value,
  hidden,
  setHidden,
}: {
  handleChange: any;
  value: any;
  hidden: boolean;
  setHidden: any;
}) => {
  return (
    <>
      <Typography text="Password" style={{ paddingVertical: SPACING.md }} />
      <Input
        onChangeText={handleChange("password")}
        value={value}
        placeholder="Password"
        secureTextEntry={hidden}
        iconLeft={
          <Feather name="lock" size={22} color={COLOR_SHADES.gray.primary} />
        }
        onIconPress={() => setHidden((prev: boolean) => !prev)}
        iconRight={
          <FontAwesome
            name={hidden ? "eye" : "eye-slash"}
            size={22}
            color={COLOR_SHADES.gray.primary}
          />
        }
      />
    </>
  );
};

export default PasswordInput;
