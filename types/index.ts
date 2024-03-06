
export type Month = {
  name: "January" |
  "February" |
  "March" |
  "April" |
  "May" |
  "June" |
  "July" |
  "August" |
  "September" |
  "October" |
  "November" |
  "December";
  days: number;
}
export type MonthType = {
    disabled?: boolean;
  } & Month;
  
  export type DayType = {
    day: number;
    disabled?: boolean;
  };
  