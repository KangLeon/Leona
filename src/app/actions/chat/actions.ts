'use server'

import { deleteChatById, updateChatTitle } from '@/lib/db/chat'
import { Chat } from '@/lib/db/schema'

export async function editChatTitle(id: string, title: string): Promise<Chat> {
    const result = await updateChatTitle({
        id,
        title,
    })
    return result
}

export async function deleteChat(id: string): Promise<boolean> {
    const result = await deleteChatById({
        id,
    })
    return result
}
