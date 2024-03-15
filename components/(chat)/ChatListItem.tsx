import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@/providers/theme-color-provider";
import Typography from "../ui/Typography";
import { router } from "expo-router";
import { ChatUserLastMessageType } from "@/types";
import { Image, View } from "react-native";
import moment from "moment";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getDoctorPrefix } from "@/utils/getDoctorPrefix";
type ChatListItemProps = {
  chat: ChatUserLastMessageType;
};
const ChatListItem = ({ chat }: ChatListItemProps) => {
  const { colors } = useTheme();
  const currentUser = useQuery(api.users.currentUser);
  return (
    <TouchableOpacity
      onPress={() => router.push(`/doctor-chat/${chat._id}`)}
      activeOpacity={0.8}
      style={{
        borderRadius: 10,
        padding: 5,
        backgroundColor: colors.secondary_bg,
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{
          width: 43,
          height: 43,

          uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1709565806~exp=1709566406~hmac=1a654b84bdd1ce535b475a5590da7fbfe24e04c66014d93ced2bbe2bf88ee089",
        }}
        style={{
          borderRadius: 8,
        }}
      />
      <View style={{ flex: 1 }}>
        <Typography
          text={
            chat.role === "Doctor"
              ? getDoctorPrefix({
                  clerk_user: chat.clerk_user,
                  gender: "male",
                })
              : getDoctorPrefix({
                  clerk_user: chat.clerk_user,
                })
          }
        />
        {chat.lastMessage && (
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row", gap: 6 }}>
              {chat.lastMessage.sender_id === currentUser?._id && (
                <Typography
                  variant="secondary"
                  style={{
                    textAlign: "justify",
                  }}
                  size="sm"
                  text={"You: "}
                />
              )}
              <Typography
                variant="secondary"
                style={{
                  textAlign: "justify",
                }}
                size="sm"
                text={chat.lastMessage.body}
              />
            </View>
            <Typography
              variant="secondary"
              style={{
                textAlign: "justify",
              }}
              size="sm"
              text={moment(chat.lastMessage._creationTime).fromNow()}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
