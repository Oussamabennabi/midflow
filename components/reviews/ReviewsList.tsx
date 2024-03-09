import { Id } from "@/convex/_generated/dataModel";
import { ScrollView, View } from "@/components/Themed";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReviewCard from "./ReviewCard";
import { Facebook } from "react-content-loader/native";
import { FlatList } from "react-native";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { router } from "expo-router";
import { useTheme } from "@/providers/theme-color-provider";

type ReviewsListProps = {
  doctor_id: Id<"doctors">;
};
const ReviewsList = ({ doctor_id }: ReviewsListProps) => {
  const reviews = useQuery(api.doctor_reviews.get_by_doctor_id, {
    id: doctor_id,
  });
  const { colors } = useTheme();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <Typography
          text="Reviews (400)"
          size="lg"
          style={{ borderBottomWidth: 3, paddingBottom: 3,borderColor:colors.border_color }}
        />

        <Button
          onPress={() => router.push(`/review/${doctor_id}`)}
          label="See all"
          variant="secondary"
          size="sm"
        />
      </View>
      {reviews ? (
        <FlatList
          data={reviews.slice(0, 3)}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item: review }) => <ReviewCard review={review} />}
          horizontal
        />
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{
            gap: 10,
          }}
        >
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                borderRadius: 10,
                backgroundColor: colors.secondary_bg,
                padding: 10,
                width: 300,
                overflow: "hidden",
              }}
            >
              <Facebook
                backgroundColor={colors.secondary_text}
                foregroundColor={colors.secondary_bg}
                viewBox="0 0 420 100"
              />
            </View>
          ))}
        </ScrollView>
      )}
      {reviews&&reviews?.length<=0&&<View>
          <Typography variant="secondary" text="There is no reviews for this doctor."/>
        </View>}
    </>
  );
};

export default ReviewsList;
