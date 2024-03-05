import ReviewsList from "@/components/reviews/ReviewsList";
import { Id } from "@/convex/_generated/dataModel";
import { useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
const DoctorReviews = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();

  return <ReviewsList doctor_id={id} />;
};

export default DoctorReviews;
