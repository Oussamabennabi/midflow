import { Text } from "@/components/Themed";
import Typography from "@/components/ui/Typography";
import { COLOR_SHADES } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Stack from "expo-router/stack";
import { useLayoutEffect } from "react";
import { Facebook } from "react-content-loader/native";
import {
  Dimensions,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const DoctorDetails = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const doctor = useQuery(api.doctor.get_by_id, { id });

  const shareListing = async () => {
    try {
      await Share.share({
        title: "Doctor",
        url: "https://oussama.ben",
      });
    } catch (err) {
      console.log(err);
    }
  };
  useLayoutEffect(() => {
    if (!doctor) return;
    navigation.setOptions({
      headerTitle: doctor.full_name,
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle]}></Animated.View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={shareListing}>
            <Ionicons name="share-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="hearto"
              size={24}
              color={COLOR_SHADES.gray.primary}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, [doctor]);

  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  // if(!doctor) return <Facebook/>
  return (
    <View style={styles.container}>
      <Stack.Screen />
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{
            uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1709565806~exp=1709566406~hmac=1a654b84bdd1ce535b475a5590da7fbfe24e04c66014d93ced2bbe2bf88ee089",
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Typography text={doctor?.full_name ?? ""} font="Bold" />

          <Typography text={doctor?.bio ?? ""} />
          <Typography
            text={doctor?.starting_consultaion_price.toString() ?? ""}
          />
          <Typography text={doctor?.years_of_experiance.toString() ?? ""} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
});
export default DoctorDetails;
