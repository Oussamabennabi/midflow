import Typography from "@/components/ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/providers/theme-color-provider";
import { DoctorWithUserType } from "@/types";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Link, router } from "expo-router";
import { useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Ripple from "react-native-material-ripple";

type DoctorSmallCardProps = {
  doctor: DoctorWithUserType;
};
const DoctorSmallCard = ({ doctor }: DoctorSmallCardProps) => {
  const { colors } = useTheme();
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
    <Ripple
      onPress={(e) => {
        e.persist();
        router.push(`/doctor/${doctor._id}`);
      }}
      style={{
        borderRadius: 10,
        backgroundColor: colors.secondary_bg,
        padding: 10,
        flexDirection: "row",
        position: "relative",
        gap: 10,
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
        <AntDesign name="hearto" size={24} color={colors.icon_color_pr} />
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
        <Typography
          font="Bold"
          text={doctor.first_name + " " + doctor.last_name}
        />
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
          <AntDesign name="star" size={18} color={COLOR_SHADES.blue.primary} />
          <Typography variant="secondary" size="sm" text={rating.toString()} />
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
          <Typography
            variant="secondary"
            text={doctor.location?.name || "N/A"}
          />
        </View>
      </View>
    </Ripple>
  );
};

export default DoctorSmallCard;
