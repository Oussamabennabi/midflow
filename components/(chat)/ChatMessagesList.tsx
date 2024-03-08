import { COLOR_SHADES } from "@/constants/Colors";
import { FONT } from "@/constants/Fonts";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  Bubble,
  Day,
  GiftedChat,
  IMessage,
  InputToolbar,
  Message,
  MessageText,
  Send,
} from "react-native-gifted-chat";

type ChatMessagesListProps = {
  chat_id: Id<"chats">;
};
export const ChatMessagesList = ({ chat_id }: ChatMessagesListProps) => {
  const apiMessages = useQuery(api.messages.get_by_chat, {
    chat_id,
  });
  const mutate = useMutation(api.messages.send);
//   const { currentUser, isSignedIn } = useCurrentUser();
const convexUser = useQuery(api.users.currentUser)

  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    if (!apiMessages) return;
    setMessages(
      apiMessages.map((m) => ({
        _id: m._id,
        createdAt: m._creationTime,
        text: m.body,
        user: {
          _id: m.sender_id,
        },
      }))
    );
  }, [apiMessages?.length]);
  const onSend = useCallback(async (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

if(!convexUser)return 

    try {
      await mutate({
        body: newMessages[0].text,
        sender_id: convexUser._id,
        chat_id,
      });
      setMessages((previousMessages) =>
        previousMessages.map((message) =>
          message._id === newMessages[0]._id
            ? {
                ...message,
                sent: true,
              }
            : message
        )
      );
    } catch (error) {
      console.log("error sending message: ", error);
      setMessages((prev) => prev?.filter((p) => p._id !== newMessages[0]._id));
    }
  }, [convexUser]);
  return (
    convexUser&&
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      renderMessageText={(m) => (
        <MessageText {...m} customTextStyle={{ fontFamily: FONT.Regular }} />
      )}
      renderDay={(m) => <Day {...m} textStyle={{ fontFamily: FONT.Bold }} />}
      messagesContainerStyle={{
        paddingBottom: 10,
      }}
      renderBubble={(m) => (
        <Bubble
          {...m}
          wrapperStyle={{
            left: { backgroundColor: "white" },
            right: { backgroundColor: COLOR_SHADES.blue.primary },
          }}
        />
      )}
      renderInputToolbar={(p) => (
        <InputToolbar
          containerStyle={{
            marginBottom: 10,
            borderRadius: 10,
            marginHorizontal: 10,
          }}
          renderSend={(s) => (
            <Send
              {...s}
              textStyle={{
                fontFamily: FONT.Medium,
                marginBottom: 0,
                color: "white",
                backgroundColor: COLOR_SHADES.blue.primary,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            />
          )}
          {...p}
        />
      )}
      user={{
        _id: convexUser._id,
      }}
    />
  );
};
