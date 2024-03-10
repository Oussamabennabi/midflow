import { ChatMessagesList } from "@/components/(chat)/ChatMessagesList";
import ChatHeader from "@/components/(chat)/chat-header";
import { ScrollView, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";

const Chat = () => {
  const { id }: { id: Id<"chats"> } = useLocalSearchParams();
  const chat = useQuery(api.chats.get_chat_by_id, {
    id,
  });

  if (!chat) {
    return <ScrollView />;
  }
  return (
    <View style={{flex:1}}>
      <ChatHeader chat={chat as any} />
      <ChatMessagesList chat_id={chat._id} />
    </View>
  );
};

export default Chat;
