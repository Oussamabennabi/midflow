import React from "react";
import { Image, Share, TouchableOpacity, View } from "react-native";

import { SPACING } from "@/constants/Spacing";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import { AntDesign, Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DataModel } from "@/convex/_generated/dataModel";
import { Facebook } from "react-content-loader/native";
import DoctorHeaderSkeleton from "./doctor-header.skeleton";

type DoctorHeaderType = {
  doctor?: DataModel["doctors"]["document"] | null;
  paddingBottom?: boolean;
};
const DoctorHeader: React.FC<DoctorHeaderType> = ({
  doctor,
  paddingBottom,
}) => {
  
  const shareListing = async () => {
    if (!doctor) return;
    try {
      // await Share.share({
      //   title: doctor.full_name,
      //   url: "https://oussama.ben",
      //   message: "Go checkout this doctor please",
      // });
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <View
      style={{
        backgroundColor: COLOR_SHADES.gray.primary,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        padding: SPACING.xl,
        paddingBottom: paddingBottom ? SPACING.xxxl : SPACING.xl,
        paddingTop: SPACING.mxl,
      }}
    >
      <StatusBar style="inverted" backgroundColor={COLOR_SHADES.gray.primary} />
      {/* header */}
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ marginTop: 7 }}
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/doctors")
            }
          >
            <Entypo name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          <Typography
            text={"Doctor Details"}
            style={{ color: "white" }}
            font="ExtraBold"
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity disabled={!doctor} onPress={shareListing}>
            <Ionicons
              name="share-outline"
              size={24}
              color={COLOR_SHADES.blue.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity disabled={!doctor}>
            <AntDesign
              name="hearto"
              size={24}
              color={COLOR_SHADES.gray.shade1}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* end of header */}
     
        <View
          style={{ alignSelf: "center", marginTop: 40, alignItems: "center" }}
        >
          {!doctor?
          
        <DoctorHeaderSkeleton animate  />
        :
          <>
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
          <Typography
            text={"Dcr. " + doctor.full_name}
            size="xl"
            style={{ color: "white" }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Ionicons
              name="medical-outline"
              size={18}
              color={COLOR_SHADES.gray.secondary}
            />
            <Typography
              style={{ color: "white", marginTop: -3 }}
              text={doctor.specialty}
            />
          </View>
          {doctor.phone_numbers.map((num) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={num}
            >
              <View style={{ marginBottom: -7 }}>
                <FontAwesome6 name="square-phone" size={18} color="white" />
              </View>
              <Typography
                style={{
                  borderBottomWidth: 2,
                  borderColor: COLOR_SHADES.gray.secondary,
                }}
                text={num}
                variant="secondary"
              />
            </TouchableOpacity>
          ))}
          </>
        }
         
        </View>
      
    </View>
  );
};

export default DoctorHeader;
