import { COLOR_SHADES } from "@/constants/Colors";
import { Month, MonthType } from "@/types";
import { View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Typography from "../ui/Typography";

type MonthSliderProps = {
    months: MonthType[];
    selectedMonth: Month;
    setSelectedMonth: React.Dispatch<React.SetStateAction<Month>>;
  };
 export  const MonthSlider = ({
    months,
    selectedMonth,
    setSelectedMonth,
  }: MonthSliderProps) => {
    return (
      <FlatList
        data={months}
        horizontal
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={(i) => (
          <TouchableOpacity
            disabled={i.item.disabled}
            onPress={() => setSelectedMonth(i.item)}
            style={{
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor:
                selectedMonth.name === i.item.name
                  ? COLOR_SHADES.blue.primary
                  : COLOR_SHADES.gray.shade1,
            }}
          >
            <Typography
              text={i.item.name}
              style={{
                color:
                  selectedMonth.name === i.item.name
                    ? "white"
                    : i.item.disabled
                    ? COLOR_SHADES.gray.shade4
                    : COLOR_SHADES.gray.primary,
              }}
              variant={i.item.disabled ? "secondary" : "primary"}
            />
          </TouchableOpacity>
        )}
      ></FlatList>
    );
  };