import { ChatMessagesList } from "@/components/(chat)/ChatMessagesList";
import ChatHeader from "@/components/(chat)/chat-header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {  useQuery } from "convex/react";
import {  useLocalSearchParams } from "expo-router";

const Chat = () => {
  const { id }: { id: Id<"chats"> } = useLocalSearchParams();

  const chat = useQuery(api.chats.get_chat_by_patient_doctor, {
    doctor: "j57f0t8vetjwwycbmcs06dcdq16mwb87" as any,
    patient: "js77s5wrd6eyd38kf7850h9f316mxpr0" as any,
  });
  
  if(!chat) {
    return <></>
  }
  return <>
  <ChatHeader chat={chat} />
  <ChatMessagesList chat_id={chat._id} />
  </>;
};

export default Chat;
