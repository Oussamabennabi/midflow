import { DataModel } from "@/convex/_generated/dataModel";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import Typography from "../ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useTheme } from "@/providers/theme-color-provider";
type ReviewCardProps = {
  review: DataModel["doctor_reviews"]["document"];
  expand?:boolean
};
const {width} = Dimensions.get("screen")

const ReviewCard = ({ review,expand }: ReviewCardProps) => {
  const {colors} = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        borderRadius: 10,
        backgroundColor: colors.secondary_bg,
        padding: 10,
        width: expand?width-18:300,
        minHeight:220
      }}
    >
      <View
        style={{flexDirection:"row", alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <View
          style={{
            gap: 10,
            flexDirection: "row",
          }}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1709565806~exp=1709566406~hmac=1a654b84bdd1ce535b475a5590da7fbfe24e04c66014d93ced2bbe2bf88ee089",
              width: 40,
              height: 40,
            }}
            resizeMode="cover"
            borderRadius={100}
          />
          <View style={{ gap: 1 }}>
            <Typography text={review.patient.full_name} />
            <Typography variant="secondary" size="sm" text={moment(review._creationTime).fromNow()} />
          </View>
        </View>

        <View style={{}}>
          <View
            style={{
              backgroundColor: COLOR_SHADES.blue.lowOpacity,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 6,
              padding: 2,
              gap: 5,
            }}
          >
            <AntDesign
              name="star"
              size={20}
              color={COLOR_SHADES.blue.primary}
            />
            <Typography
              variant="secondary"
              size="md"
              text={review.stars.toString()}
            />
          </View>
        </View>
      </View>
      <Typography font="Medium" text={review.content} />
    </TouchableOpacity>
  );
};

export default ReviewCard;
