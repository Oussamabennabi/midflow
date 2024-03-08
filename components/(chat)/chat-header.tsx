import React from "react";
import { Image,  TouchableOpacity, View } from "react-native";

import { SPACING } from "@/constants/Spacing";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "@/components/ui/Typography";
import { AntDesign, Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { DoctorWithUserType } from "@/types";
import { DataModel } from "@/convex/_generated/dataModel";

type ChatHeaderType = {
  chat?:DataModel["chats"]["document"]| null;
};
const ChatHeader: React.FC<ChatHeaderType> = ({
  chat,
}) => {


  return (
    <View
      style={{
        backgroundColor: COLOR_SHADES.gray.primary,
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.mxl,
        paddingBottom:SPACING.md

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
          <Image
              source={{
                width: 32,
                height: 32,

                uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1709565806~exp=1709566406~hmac=1a654b84bdd1ce535b475a5590da7fbfe24e04c66014d93ced2bbe2bf88ee089",
              }}
              style={{
                borderRadius: 8,
              }}
            />
          <Typography
            text={"Doctor Details"}
            style={{ color: "white" }}
            font="ExtraBold"
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          
        </View>
      </View>
      {/* end of header */}

    </View>
  );
};

export default ChatHeader;
