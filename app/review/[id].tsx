import { ScrollView, View } from "@/components/Themed";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewsHeader from "@/components/reviews/reviews-hearder";
import Typography from "@/components/ui/Typography";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";

import { FlatList } from "react-native-gesture-handler";
const DoctorReviews = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();
  const reviews = useQuery(api.doctor_reviews.get_by_doctor_id, {
    id,
  });
  if (!reviews || reviews.length <= 0) return <ScrollView></ScrollView>;
  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        paddingBottom: 60,
      }}
    >
      <ReviewsHeader />

      <View>
        <Typography size="md" text="Filter by:" />
      </View>

      <FlatList
        data={reviews}
        contentContainerStyle={{
          padding: 10,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item: review }) => <ReviewCard expand review={review} />}
      />
    </View>
  );
};

export default DoctorReviews;
