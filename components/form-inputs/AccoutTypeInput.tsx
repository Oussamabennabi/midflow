import { SPACING } from "@/constants/Spacing";
import Typography from "../ui/Typography";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../Themed";
import { COLOR_SHADES } from "@/constants/Colors";
type RadioProps = {
  label: string;
  value: string;
  isSelected: boolean;
  setIsSelected: any;
};
const Radio = ({ isSelected, label, setIsSelected, value }: RadioProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setIsSelected(true)}
      style={{
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        gap: 10,
        backgroundColor: isSelected ? COLOR_SHADES.blue.primary : "white",
      }}
    >
      <Typography
        style={{
          marginBottom: 2,
          color: isSelected ? "white" : COLOR_SHADES.gray.primary,
        }}
        text={label}
      />
      <View
        style={{
          borderRadius: 6,
          width: 20,
          height: 20,
          position: "relative",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: isSelected ? "white" : COLOR_SHADES.gray.primary,
        }}
      >
        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 1.5,
              right: 1.5,
              borderRadius: 4,
              width: 13,
              height: 13,
              backgroundColor: "white",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const AccoutTypeInput = () => {
  return (
    <>
      <Typography text="Who are you?" style={{ paddingVertical: SPACING.md }} />
      <ScrollView
        horizontal
        contentContainerStyle={{
          padding: 5,
          gap: 10,
        }}
      >
        <Radio
          isSelected
          label="Regular"
          value="regular"
          setIsSelected={() => {}}
        />
        <Radio
          isSelected
          label="Regular"
          value="regular"
          setIsSelected={() => {}}
        />
        <Radio
          isSelected
          label="Regular"
          value="regular"
          setIsSelected={() => {}}
        />
        <Radio
          isSelected
          label="Regular"
          value="regular"
          setIsSelected={() => {}}
        />
        <Radio
          isSelected
          label="Regular"
          value="regular"
          setIsSelected={() => {}}
        />
      </ScrollView>
    </>
  );
};

export default AccoutTypeInput;
