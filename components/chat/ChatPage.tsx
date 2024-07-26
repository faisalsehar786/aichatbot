'use client'

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
// import { orderBy, query } from "firebase/firestore";
// import { useSession } from "next-auth/react";
import { useEffect, useRef } from 'react'
// import { useCollection } from "react-firebase-hooks/firestore";
// import { getMessageRef } from "../../lib/firebase";
import Message from './Message'

type Props = {
  chatId: string
}

const ChatPage = ({ chatId }: Props) => {
  // const { data: session } = useSession();
  // const [messages, loading, error] = useCollection(
  //   // query(
  //   //   getMessageRef(session?.user?.email!, chatId),
  //   //   orderBy("createdAt", "asc")
  //   // )
  // );

  const messages = [{ docs: [], empty: null }]
  const chatPageRef = useRef<null | HTMLDivElement>(null)

  function isMessageNew(time: any) {
    let isNew = true

    if (time === null) {
      return isNew
    }

    const _time = new Date(time.toDate()).getTime()
    const currentTime = new Date().getTime()
    const remainingTime = currentTime - _time

    isNew = remainingTime < 10_000 ? true : false

    return isNew
  }

  // useEffect(() => {
  //   if (chatPageRef.current) {
  //     chatPageRef.current.scrollTo(0, Number(chatPageRef.current.scrollHeight));
  //   }
  // }, [messages]);

  return (
    <div ref={chatPageRef} className='h-[calc(100vh-210px)] overflow-y-auto hide__scroll__bar px-1'>
      {/* <>
        <p className='mt-10 text-center text-white'>Type a prompt in below to get started</p>
        <ArrowDownCircleIcon className='h-10 w-10 mt-5 mx-auto text-white animate-bounce' />
      </> */}

      {[
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 3,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first sencond message',
          ai: false,
          selected: false,
        },
        {
          id: 4,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 5,
          createdAt: '17-07-2024 19:22',
          text: JSON.stringify({ name: 'John', age: 30, city: 'New York' }),
          ai: true,
          selected: false,
        },
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
        {
          id: 1,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: false,
          selected: false,
        },
        {
          id: 2,
          createdAt: '17-07-2024 19:22',
          text: 'hell my first message',
          ai: true,
          selected: false,
        },
      ].map((message: any, index: any) => {
        return (
          <Message
            key={message.id}
            message={message}
            chatRef={chatPageRef}
            // last={
            //   index + 1 === 3 &&
            //   message.data().user.avatar === 'ChatGptIcon' &&
            //   isMessageNew(message.data().createdAt)
            // }
          />
        )
      })}
    </div>
  )
}

export default ChatPage
