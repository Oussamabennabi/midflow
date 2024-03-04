import Typography from "@/components/ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { DataModel } from "@/convex/_generated/dataModel";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

type DoctorSmallCardProps = {
  doctor: DataModel["doctors"]["document"];
};
const DoctorSmallCard = ({ doctor }: DoctorSmallCardProps) => {
  return (
    <Link
      asChild
      href={{
        pathname: "/doctor/[id]",
        params: { id: doctor._id },
      }}
    >
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
          <Typography
            font="Bold"
            text={doctor.full_name || "Oussama Bennabi"}
          />
          <Typography variant="secondary" text={doctor.specialty} />
          <View
            style={{
              backgroundColor: COLOR_SHADES.blue.lowOpacity,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 6,
              padding: 2,
              gap: 1,
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
              text={doctor.rating?.toString() || 4.5}
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
