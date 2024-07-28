'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios'
import { useTheme } from '@/context/ThemeContext'
import toast from 'react-hot-toast'
import { useUser } from '@/lib/store/user'
import Spinner from 'react-bootstrap/Spinner'
import { davinci } from '@/ai_actions/davinci'
import { dalle } from '@/ai_actions/dalle'

type Props = {
  chatId: string
}

const ChatInput = ({ chatId }: Props) => {
  const { ai_model, selectedProfileImage } = useTheme()
  const [prompt, setPrompt] = useState('')
  const [thinking, setThinking] = useState(false)
  const user = useUser((state) => state.user)

  const formInputRef = useRef<null | HTMLDivElement>(null)

  async function sendMessage(e: FormEvent) {
    e.preventDefault()
    setThinking(true)
    const input = prompt.trim()
    if (!input) return

    const userMessage: any = {
      text: input,
      createdAt: new Date(),
      user: {
        _id: user?.email!,
        name: user?.name!,
        avatar: user?.image! || `https://ui-avatars.com/api/?name=${user?.full_name}`,
      },
    }

    let notification: string

    try {
      notification = toast.loading('Clone is asking ChatGPT')

      // await addMessage(user?.email!, chatId, userMessage); send to server
      setPrompt('')
      const apiKey = user?.ai_key ? user?.ai_key : process.env.NEXT_PUBLIC_OPENAI_API_KEY

      const { data } = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          messages: [{ role: 'user', content: prompt }],
          model: ai_model,
          temperature: 0.9,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 2048,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      console.log(data)
      data.choices[0].text

      setThinking(false)

      toast.success('ChatGPT just replied clone', {
        id: notification!,
      })

      // await addMessage(user?.email!, chatId, gptMessage); send to server
    } catch (error: any) {
      console.error('Error interacting with OpenAI:', error)
      console.log(error?.message)
      setThinking(false)
      toast.error(error?.message, {
        id: notification!,
      })
    }
  }

  useEffect(() => {
    if (formInputRef.current) {
      formInputRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'end',
      })
    }
  }, [formInputRef.current])

  return (
    <div>
      {thinking && (
        <div className='text-gray-700'>
          <Spinner animation='grow' variant='primary' size='sm' />
          Thinking...
        </div>
      )}
      <div ref={formInputRef} className='sticky'>
        <form onSubmit={(e: any) => sendMessage(e)}>
          <div className='d-flex align-items-center bg-light border p-3 rounded'>
            <div className='position-relative w-100'>
              <textarea
                className='form-control form-control-solid border ps-5'
                rows={1}
                onChange={(e: any) => setPrompt(e.target.value)}
                data-kt-autosize='true'
                placeholder='Write here..'
                data-kt-initialized={1}
                style={{
                  overflow: 'hidden',
                  overflowWrap: 'break-word',
                  resize: 'none',
                  textAlign: 'start',
                  height: '60.2222px',
                }}
              />
              <div className='position-absolute top-3 end-3 translate-middle-x mt-1 me-n14'>
                <button className='btn btn-icon btn-sm btn-color-gray-500 btn-active-color-primary w-25px p-0'>
                  <i className='ki-duotone ki-paper-clip fs-2 text-primary' />
                </button>

                <button className='btn btn-icon btn-sm btn-color-gray-500 btn-active-color-primary w-25px p-0'>
                  <i className='fa-solid fa-microphone fs-2 text-primary'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </button>
                <button
                  type='submit'
                  className='btn btn-sm btn-light '
                  disabled={!prompt || !user}
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                >
                  <i className='bi bi-send text-primary fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatInput
