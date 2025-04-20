'use client'

import { notFound } from 'next/navigation'
import { ChatBot as PreviewChat } from '@/components/ChatBot'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'
import { getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'

const ChatClient = ({ id }: { id: string }) => {
    const modelId = (getCookie('modelId') as string) || ''

    const { data: chat, error } = useSWR(`/api/chat?id=${id}`, fetcher)

    if (!chat && !error) {
        return (
            <div className='flex justify-center items-center w-dvw h-dvh'>
                <Loader2 className='animate-spin' />
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex justify-center items-center w-dvw h-dvh'>
                Error Loading Chat
            </div>
        )
    }

    if (!chat) {
        notFound()
    }

    return (
        <PreviewChat
            id={chat.id}
            initialMessages={chat.messages}
            selectedModelId={modelId}
        />
    )
}

export default ChatClient
