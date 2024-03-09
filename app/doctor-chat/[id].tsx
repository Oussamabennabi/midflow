import { ChatMessagesList } from "@/components/(chat)/ChatMessagesList";
import ChatHeader from "@/components/(chat)/chat-header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";

const Chat = () => {
  const { id }: { id: Id<"doctors"> } = useLocalSearchParams();
  const currentUser = useQuery(api.users.currentUser);


  const chat = useQuery(api.chats.get_chat_by_patient_doctor, {
    doctor: id,
    patient: currentUser?._id!,
  });

  if (!chat) {
    return <></>;
  }

  console.log(chat)
  return (
    <>
      <ChatHeader chat={chat} />
      <ChatMessagesList chat_id={chat._id} />
    </>
  );
};

export default Chat;
