'use server'

import { v2 as cloudinary } from 'cloudinary'
import { Message } from '@/lib/db/schema'
import { deleteMessagesForChat, saveNewMessage } from '@/lib/db/chat'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function saveMessage(message: Message): Promise<Message> {
    return await saveNewMessage({
        message,
    })
}

export async function deleteMessages(chatId: string): Promise<void> {
    await deleteMessagesForChat({ chatId })
}
