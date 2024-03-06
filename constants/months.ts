import { Month } from "@/types";



const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDaysInFebruary = (year: number): number => {
  return isLeapYear(year) ? 29 : 28;
};
const currentYear = new Date().getFullYear();
export const MONTHS: Month[] = [
  { name: 'January', days: 31 },
  { name: 'February', days: getDaysInFebruary(currentYear) },
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 }
];
