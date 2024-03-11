import { COLOR_SHADES } from "@/constants/Colors";
import { DayType } from "@/types";
import { View } from "react-native";
import { FlatList, TouchableOpacity,  } from "react-native-gesture-handler";
import Typography from "../ui/Typography";

type DaySliderProps = {
    days: DayType[];
    setSelectedDay: React.Dispatch<React.SetStateAction<DayType | null>>;
    selectedDay: DayType | null;
  };
  export const DaySlider = ({ days, selectedDay, setSelectedDay }: DaySliderProps) => {
    return (
      <FlatList
        data={days}
        horizontal
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={(i) => (
          <TouchableOpacity
            disabled={i.item.disabled}
            onPress={() => setSelectedDay(i.item)}
            style={{
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              paddingHorizontal:20,
              backgroundColor:
                selectedDay?.day === i.item.day
                  ? COLOR_SHADES.blue.primary
                  : COLOR_SHADES.gray.shade1,
            }}
          >
            <Typography
              text={i.item.day.toString()}
              style={{
                color:
                  selectedDay?.day === i.item.day
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
  