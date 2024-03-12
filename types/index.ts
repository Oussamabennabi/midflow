import { DataModel } from "@/convex/_generated/dataModel";

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


export type OnboardingData= {
  id: number;
  image: any;
  text: string;
  subTitle: string;
  textColor: string;
  backgroundColor: string;
}

Location




export type DoctorWithUserType = DataModel["doctors"]["document"] & Partial<DataModel["users"]["document"]["clerk_user"]>
export type ChatUserLastMessageType = DataModel["chats"]["document"] & Partial<DataModel["users"]["document"]>&{lastMessage:DataModel["messages"]["document"]}
export type ChatUserType = DataModel["users"]["document"]&DataModel["chats"]["document"] 