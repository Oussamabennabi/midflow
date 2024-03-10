import { View } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FlatList } from "react-native-gesture-handler";
import ChatListItem from "./ChatListItem";
type ChatListProps = {
  uid: Id<"users"> | Id<"doctors">;
  isDoctor: boolean;
};
const ChatList = ({ uid, isDoctor }: ChatListProps) => {
  const chats = useQuery(api.chats.get_chats, { id: uid, isDoctor });
  return (
    <View>
      <FlatList
        data={chats}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        renderItem={({ item: chat }) => <ChatListItem chat={chat as any} />}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    </View>
  );
};

export default ChatList;
