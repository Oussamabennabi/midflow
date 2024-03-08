import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { FONT} from '@/constants/Fonts';
import i18n from '@/config/i18n';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function TabOneScreen() {
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = [] as any) => {
    setMessages((previousMessages:any) =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])
    return <GiftedChat
    messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        
      }}
    />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily:FONT.ExtraBoldItalic
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
