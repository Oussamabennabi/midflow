import React from "react";
import { DataModel } from "@/convex/_generated/dataModel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@/providers/theme-color-provider";
import Typography from "../ui/Typography";
import { router } from "expo-router";
type ChatListItemProps = {
  chat: DataModel["chats"]["document"];
};
const ChatListItem = ({ chat }: ChatListItemProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/doctor-chat/${chat._id}`)}
      activeOpacity={0.8}
      style={{
        borderRadius: 10,
        padding: 5,
        backgroundColor: colors.secondary_bg,
      }}
    >
      <Typography text={chat._id} />
    </TouchableOpacity>
  );
};

export default ChatListItem;
