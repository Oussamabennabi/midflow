// import Typography from "../ui/Typography";
import { DataModel } from "@/convex/_generated/dataModel";
import Typography from "../ui/Typography";
import { Calendar } from "react-native-calendars";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";
import moment from "moment";
import { useTheme } from "@/providers/theme-color-provider";
// import { useEffect, useState } from "react";
// import { MONTHS } from "@/constants/months";
// import { DayType, Month, MonthType } from "@/types";
// import { DaySlider } from "./DaysSlider";
// import { MonthSlider } from "./MonthsSlider";
// import { Gesture, TouchableOpacity } from "react-native-gesture-handler";
type AskForAppointmentCalendarProps = {
  doctor?: DataModel["doctors"]["document"] | null;
};

const AskForAppointmentCalendar = ({
  doctor,
}: AskForAppointmentCalendarProps) => {
  const { colors } = useTheme();
  // const [selectedMonth, setSelectedMonth] = useState<Month>(MONTHS[0]);
  // const [selectedDay, setSelectedDay] = useState<DayType | null>(null);

  // // temp
  // const [months, setMonths] = useState<MonthType[]>(
  //   MONTHS.map<MonthType>((m) => {
  //     return {
  //       days: m.days,
  //       name: m.name,
  //       disabled: m.name === "January",
  //     };
  //   })
  // );
  // const [days, setDays] = useState<DayType[]>([]);

  // useEffect(() => {
  //   setDays(
  //     Array.from({ length: selectedMonth.days }, (_, n) => ({
  //       day: n + 1,
  //       disabled: false,
  //     }))
  //   );
  // }, [selectedMonth.days]);

  if (!doctor) return <Typography text="Loading" />;
  return (
    <>
      {/* month slider */}
      {/* <Typography text="Select a Month" size="lg" />
      <MonthSlider
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        months={months}
      /> */}
      {/* days slides */}
      {/* <Typography text="Select a Day" size="lg" />
      <DaySlider
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        days={days}
      /> */}
      <Calendar
        minDate={moment().format("YYYY-MM-DD")}
        maxDate={moment().add(1, "years").format("YYYY-MM-DD")}
        hideExtraDays

        markedDates={{
          "2024-06-03": {
            selected: true,
            selectedColor: "yellow",

          },
        }}
        theme={{
          textDayFontFamily: FONT.SemiBold,
          textMonthFontFamily: FONT.Bold,
          textDayHeaderFontFamily: FONT.Regular,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
          calendarBackground: colors.secondary_bg,
          textDisabledColor:colors.secondary_text,
          textInactiveColor:"red",
          todayTextColor:COLOR_SHADES.purply.shade5,
          todayBackgroundColor:COLOR_SHADES.purply.opacity,
          dayTextColor:colors.primary_text,

        }}
        enableSwipeMonths
        renderArrow={(d) =>
          d === "left" ? (
            <FontAwesome
              name="chevron-left"
              size={24}
              color={COLOR_SHADES.blue.primary}
            />
          ) : (
            <FontAwesome
              name="chevron-right"
              size={24}
              color={COLOR_SHADES.blue.primary}
            />
          )
        }
      />
    </>
  );
};

export default AskForAppointmentCalendar;
