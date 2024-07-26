import Layout from './../../components/Layout'
import ChatInput from './../../components/chat/ChatInput'
import ChatPage from './../../components/chat/ChatPage'

import ChatView from './../../components/ChatView'
export default async function Chat() {
  return (
    <Layout>
      <div className=''>
        <ChatPage chatId={'5'} />
        <ChatInput chatId={'5'} />
      </div>
    </Layout>
  )
}
