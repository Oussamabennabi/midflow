import { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export const Chat = ()=> {
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