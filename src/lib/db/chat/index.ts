import 'server-only'

import { Chat, Message, message } from '../schema'
import { db } from '..'
import { chat } from '../schema'
import { eq, desc, asc, gte, and, SQL, gt, lt } from 'drizzle-orm'

export async function saveChat({
    id,
    userId,
    title,
    modelId,
}: {
    id: string
    userId: string
    title: string
    modelId: string
}) {
    try {
        const result = await db
            .insert(chat)
            .values({ id, userId, title, modelId, createdAt: new Date() })
            .returning()
        return result[0]
    } catch (error) {
        console.error('Failed to save chat in database', error)
        throw error
    }
}

export async function updateChatTitle({
    id,
    title,
}: {
    id: string
    title: string
}) {
    try {
        const result = await db
            .update(chat)
            .set({ title })
            .where(eq(chat.id, id))
            .returning()
        return result[0]
    } catch (error) {
        console.error('Failed to update chat title in database', error)
        throw error
    }
}

export async function deleteChatById({ id }: { id: string }) {
    try {
        const result = await db.delete(chat).where(eq(chat.id, id)).returning()
        console.log('delete chat result', result)
        return true
    } catch (error) {
        console.error('Failed to delete chat by id from database')
        throw error
    }
}

export async function getChatsByUserId({
    id,
    limit,
    startingAfter,
    endingBefore,
}: {
    id: string
    limit: number
    startingAfter: string | null
    endingBefore: string | null
}) {
    try {
        const extendedLimit = limit + 1

        const query = (whereCondition?: SQL<unknown>) =>
            db
                .select()
                .from(chat)
                .where(
                    whereCondition
                        ? and(whereCondition, eq(chat.userId, id))
                        : eq(chat.userId, id)
                )
                .orderBy(desc(chat.createdAt))
                .limit(extendedLimit)

        let filteredChats: Array<Chat> = []

        if (startingAfter) {
            const [selectedChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, startingAfter))
                .limit(1)

            if (!selectedChat) {
                throw new Error(`Chat with id ${startingAfter} not found`)
            }

            filteredChats = await query(
                gt(chat.createdAt, selectedChat.createdAt)
            )
        } else if (endingBefore) {
            const [selectedChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, endingBefore))
                .limit(1)

            if (!selectedChat) {
                throw new Error(`Chat with id ${endingBefore} not found`)
            }

            filteredChats = await query(
                lt(chat.createdAt, selectedChat.createdAt)
            )
        } else {
            filteredChats = await query()
        }

        const hasMore = filteredChats.length > limit

        return {
            chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
            hasMore,
        }
    } catch (error) {
        console.error('Failed to get chats by user from database')
        throw error
    }
}

export async function getChatById({ id }: { id: string }) {
    try {
        const [selectedChat] = await db
            .select()
            .from(chat)
            .where(eq(chat.id, id))
        return selectedChat
    } catch (error) {
        console.error('Failed to get chat by id from database', error)
        return null
    }
}

export async function saveMessages({ messages }: { messages: Array<Message> }) {
    try {
        return await db.insert(message).values(messages)
    } catch (error) {
        console.error('Failed to save messages in database', error)
        throw error
    }
}

export async function saveNewMessage({
    message: newMessage,
}: {
    message: Message
}) {
    const result = await db.insert(message).values(newMessage).returning()
    return result[0]
}

export async function deleteMessagesForChat({ chatId }: { chatId: string }) {
    try {
        return await db.delete(message).where(eq(message.chatId, chatId))
    } catch (error) {
        console.error('Failed to delete messages for chat from database', error)
        throw error
    }
}

export async function getMessagesByChatId({ id }: { id: string }) {
    try {
        return await db
            .select()
            .from(message)
            .where(eq(message.chatId, id))
            .orderBy(asc(message.createdAt))
    } catch (error) {
        console.error('Failed to get messages by chat id from database', error)
        throw error
    }
}

export async function getMessageById({ id }: { id: string }) {
    try {
        return await db.select().from(message).where(eq(message.id, id))
    } catch (error) {
        console.error('Failed to get message by id from database')
        throw error
    }
}

export async function deleteMessagesByChatIdAfterTimestamp({
    chatId,
    timestamp,
}: {
    chatId: string
    timestamp: Date
}) {
    try {
        return await db
            .delete(message)
            .where(
                and(
                    eq(message.chatId, chatId),
                    gte(message.createdAt, timestamp)
                )
            )
    } catch (error) {
        console.error(
            'Failed to delete messages by id after timestamp from database'
        )
        throw error
    }
}

export async function deleteChatsByUserId({ userId }: { userId: string }) {
    return await db.delete(chat).where(eq(chat.userId, userId))
}
