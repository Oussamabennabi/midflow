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

type ReviewsListProps = {
  doctor_id: Id<"doctors">;
};
const ReviewsList = ({ doctor_id }: ReviewsListProps) => {
  const reviews = useQuery(api.doctor_reviews.get_by_doctor_id, {
    id: doctor_id,
  });

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center",marginBottom:18 }}>
        <Typography
          text="Reviews (400)"
          size="lg"
          style={{ borderBottomWidth: 3, paddingBottom: 3 }}
        />
  
        <Button 
        onPress={()=>router.push(`/review/${doctor_id}`)}
        label="See all" variant="secondary" size="sm"/>
      </View>
      {reviews && reviews.length > 0 ? (
        <FlatList
          data={reviews.slice(0, 3)}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item: review }) => <ReviewCard review={review} />}
          horizontal
        />
      ) : (
        <ScrollView
          horizontal
          style={{backgroundColor:"transparent"}}
          contentContainerStyle={{
            gap: 10,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              padding: 10,
              width: 300,
              overflow: "hidden",
            }}
          >
            <Facebook viewBox="0 0 420 100" />
          </View>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              padding: 10,
              width: 300,
              overflow: "hidden",
            }}
          >
            <Facebook viewBox="0 0 420 100" />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ReviewsList;
