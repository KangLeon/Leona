'use client'

import type { Attachment, Message } from 'ai'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { ChatHeader } from '@/components/SummaryHead'

import { MultimodalInput } from '@/components/MultimodalInput'
import { Messages } from '@/components/SummaryMessages'
import { useChat } from '@ai-sdk/react'
import { generateUUID } from '@/lib/utils'

export const ChatBot = function ChatBot({
    id,
    initialMessages,
    selectedModelId,
}: {
    id: string
    initialMessages: Array<Message>
    selectedModelId: string
}) {
    const { mutate } = useSWRConfig()

    const {
        messages,
        setMessages,
        handleSubmit,
        input,
        setInput,
        append,
        status,
        stop,
        reload,
    } = useChat({
        id,
        body: { id, selectedChatModel: selectedModelId },
        initialMessages,
        experimental_throttle: 100,
        generateId: generateUUID,
        sendExtraMessageFields: false,
        onFinish: () => {
            mutate('/api/chat/history')
        },
        onError: (error) => {
            console.error('Failed to process request4', error)
        },
    })

    const isLoading = status === 'streaming' || status === 'submitted'

    const [attachments, setAttachments] = useState<Array<Attachment>>([])

    console.log('messages:', messages)

    return (
        <>
            <div className='flex flex-col min-w-0 pb-5 h-dvh bg-background'>
                <ChatHeader selectedModelId={selectedModelId} />

                {/* 消息 */}
                <Messages
                    chatId={id}
                    messages={messages}
                    setMessages={setMessages}
                    reload={reload}
                    status={status}
                    isReadonly={false}
                    isArtifactVisible={false} />

                {/* 输入框 */}
                <form className='flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl'>
                    <MultimodalInput
                        chatId={id}
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        stop={stop}
                        attachments={attachments}
                        setAttachments={setAttachments}
                        messages={messages}
                        setMessages={setMessages}
                        append={append}
                    />
                </form>
            </div>
        </>
    )
}
