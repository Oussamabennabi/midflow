import WelcomeSvg1 from "@/assets/welcom/Blue";
import WelcomeSvg2 from "@/assets/welcom/Gray";
import WelcomeSvg3 from "@/assets/welcom/Purple";
import { OnboardingData } from "@/types";

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    image: <WelcomeSvg1 />,
    text: "Personalize Your Health with Smart AI.",
    subTitle:
      "Achieve your wellness goals with our AI-powered platform tailored to your unique needs.",
    textColor: "#242E49",
    backgroundColor: "#0F67FE00",
  },
  {
    id: 2,
    image: <WelcomeSvg2 />,
    text: "Intelligent Fitness Tracker At Your Fingertips.",
    subTitle:
      "Track your calorie & fitness nutrition with AI and get special recommendations.",
    textColor: "#1e2169",
    backgroundColor: "#BEC5D228",
  },
  {
    id: 3,
    image: <WelcomeSvg3 />,
    text: "Empathic Wellness Chatbot For All.",
    subTitle:
      "Experience compassionate and personalized care with our AI chatbot.",
    textColor: "#8A3FFC",
    backgroundColor: "#8B3FFC1A",
  },
];

export const onboardingColors = ["#242E49", "#1e2169", "#8A3FFC"];

export default onboardingData;
