import { ChatBot } from "@/components/ChatBot"
import { getMessagesByChatId } from "@/lib/db/message"
import { Message } from "@/lib/db/schema"
import { Attachment, UIMessage } from "ai"
import { cookies } from 'next/headers'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  const cookieStore = await cookies()
  const modelId = cookieStore.get('modelId')?.value || ''

  console.log('id2:', id)

  const messagesFromDb = await getMessagesByChatId({
    chatId: id,
  });

  function convertToUIMessages(messages: Array<Message>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: '',
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }


  return <>
    <ChatBot
      key={id}
      id={id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId={modelId}
    />
  </>
}
