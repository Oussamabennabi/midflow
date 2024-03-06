import Typography from "../ui/Typography";
import { DataModel } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { MONTHS } from "@/constants/months";
import { DayType, Month, MonthType } from "@/types";
import { DaySlider } from "./DaysSlider";
import { MonthSlider } from "./MonthsSlider";

type AskForAppointmentCalendarProps = {
  doctor?: DataModel["doctors"]["document"] | null;
};

const AskForAppointmentCalendar = ({
  doctor,
}: AskForAppointmentCalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState<Month>(MONTHS[0]);
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);

  // temp
  const [months, setMonths] = useState<MonthType[]>(
    MONTHS.map<MonthType>((m) => {
      return {
        days: m.days,
        name: m.name,
        disabled: m.name === "January",
      };
    })
  );
  const [days, setDays] = useState<DayType[]>([]);

  useEffect(() => {
    setDays(
      Array.from({ length: selectedMonth.days }, (_, n) => ({
        day: n + 1,
        disabled: false,
      }))
    );
  }, [selectedMonth.days]);

  if (!doctor) return <Typography text="Loading" />;
  return (
    <>
      {/* month slider */}
      <Typography text="Select a Month" size="lg" />
      <MonthSlider
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        months={months}
      />
      {/* days slides */}
      <Typography text="Select a Day" size="lg" />
      <DaySlider
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        days={days}
      />
    </>
  );
};

export default AskForAppointmentCalendar;
