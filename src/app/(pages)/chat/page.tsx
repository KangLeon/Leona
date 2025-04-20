import { ChatBot } from '@/components/ChatBot'
import { generateUUID } from '@/lib/utils'
import { cookies } from 'next/headers'

const Page = async () => {
  const cookieStore = await cookies()
  const modelId = cookieStore.get('modelId')?.value || ''

  console.log('modelId1:', modelId)

  const id = generateUUID()

  console.log('id1:', id)

  return (
    <div className='w-full max-w-full pt-4 px-4'>
      <ChatBot
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={modelId}
      />
    </div>
  )
}

export default Page
