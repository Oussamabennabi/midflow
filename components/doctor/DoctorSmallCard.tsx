import Typography from "@/components/ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { DoctorWithUserType } from "@/types";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";

type DoctorSmallCardProps = {
  doctor: DoctorWithUserType;
};
const DoctorSmallCard = ({ doctor }: DoctorSmallCardProps) => {
  const docRating = useQuery(api.doctor_reviews.get_by_doctor_id, {
    id: doctor._id,
  });

  const rating = useMemo(
    () =>
      docRating && docRating.length > 0
        ? docRating.reduce((f, s) => (s.stars += f), 0) / docRating.length
        : 0,
    [docRating]
  );
  return (
    <Link asChild href={`/docto/${doctor._id}`}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          padding: 10,
          flexDirection: "row",
          position: "relative",
        }}
      >
        {/*  */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <AntDesign
            name="hearto"
            size={24}
            color={COLOR_SHADES.gray.primary}
          />
        </TouchableOpacity>
        {/*  */}
        <Image
          source={{
            width: 100,
            height: 100,

            uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1709565806~exp=1709566406~hmac=1a654b84bdd1ce535b475a5590da7fbfe24e04c66014d93ced2bbe2bf88ee089",
          }}
          style={{
            borderRadius: 8,
          }}
        />
        <View style={{ alignItems: "flex-start" }}>
          <Typography font="Bold" text={doctor.first_name+" "+doctor.last_name} />
          <Typography variant="secondary" text={doctor.specialty} />
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
              size={18}
              color={COLOR_SHADES.blue.primary}
            />
            <Typography
              variant="secondary"
              size="sm"
              text={rating.toString()}
            />
          </View>

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
              borderRadius: 6,
              padding: 2,
              gap: 3,
            }}
          >
            <Feather
              name="map-pin"
              size={14}
              color={COLOR_SHADES.gray.secondary}
            />
            <Typography variant="secondary" text={doctor.location} />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default DoctorSmallCard;
