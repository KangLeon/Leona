import 'server-only'

import { Message, message } from '../schema'
import { db } from '..'
import { eq, asc, and, gte } from 'drizzle-orm'

// 批量保存消息
export async function saveMessages({ messages }: { messages: Array<Message> }) {
    try {
        return await db.insert(message).values(messages)
    } catch (error) {
        console.error('批量保存消息失败', error)
        throw error
    }
}

// 根据ID获取消息
export async function getMessageById({ id }: { id: string }) {
    try {
        const [result] = await db
            .select()
            .from(message)
            .where(eq(message.id, id))
        return result
    } catch (error) {
        console.error('根据ID获取消息失败', error)
        throw error
    }
}

// 根据聊天ID获取消息列表
export async function getMessagesByChatId({ chatId }: { chatId: string }) {
    try {
        return await db
            .select()
            .from(message)
            .where(eq(message.chatId, chatId))
            .orderBy(asc(message.createdAt))
    } catch (error) {
        console.error('根据聊天ID获取消息列表失败', error)
        throw error
    }
}

// 删除消息
export async function deleteMessageById({ id }: { id: string }) {
    try {
        await db.delete(message).where(eq(message.id, id))
        return true
    } catch (error) {
        console.error('删除消息失败', error)
        throw error
    }
}

// 删除指定时间戳后的消息
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
        console.error('删除指定时间戳后的消息失败', error)
        throw error
    }
}

export async function deleteMessagesByChatId({ chatId }: { chatId: string }) {
    return await db.delete(message).where(eq(message.chatId, chatId))
}
