import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import confetti from 'canvas-confetti'
import { openai } from '@ai-sdk/openai'

import { format } from 'date-fns'
import {
    CoreAssistantMessage,
    CoreToolMessage,
    generateText,
    Message,
    ToolInvocation,
    UIMessage,
} from 'ai'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// 撒花函数
export function handleCelebrate() {
    confetti({
        angle: 90, // 撒花的角度（从左到右）
        spread: 140, // 撒花的散射范围
        startVelocity: 50, // 粒子的初始速度
        particleCount: 350, // 粒子数量
        origin: { x: 0.5, y: 0.5 }, // 起始位置（0.5 表示屏幕的中心）
        colors: ['#ff0', '#ff6347', '#36c'], // 粒子颜色（支持十六进制、RGB等）
        gravity: 0.8, // 重力（默认值 1，越小粒子下降得越慢）
        ticks: 300, // 动画的持续时间（每个 tick 大约 16ms）
        shapes: ['circle'], // 粒子形状（默认为方形，还可以使用 circle 或 star 等）
        scalar: 1.1, // 粒子大小的缩放系数
    })
}

export function getMostRecentUserMessage(messages: Array<UIMessage>) {
    const userMessages = messages.filter((message) => message.role === 'user')
    return userMessages.at(-1)
}

export async function generateTitleFromUserMessage({
    message,
}: {
    message: UIMessage
}) {
    const { text: title } = await generateText({
        model: openai('gpt-4o'),
        system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
        prompt: JSON.stringify(message),
    })

    return title
}

export const regularPrompt =
    'You are a friendly assistant! Keep your responses concise and helpful.'

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage
type ResponseMessage = ResponseMessageWithoutId & { id: string }

export function getTrailingMessageId({
    messages,
}: {
    messages: Array<ResponseMessage>
}): string | null {
    const trailingMessage = messages.at(-1)

    if (!trailingMessage) return null

    return trailingMessage.id
}

export function sanitizeResponseMessages(
    messages: Array<CoreToolMessage | CoreAssistantMessage>
): Array<CoreToolMessage | CoreAssistantMessage> {
    const toolResultIds: Array<string> = []

    for (const message of messages) {
        if (message.role === 'tool') {
            for (const content of message.content) {
                if (content.type === 'tool-result') {
                    toolResultIds.push(content.toolCallId)
                }
            }
        }
    }

    const messagesBySanitizedContent = messages.map((message) => {
        if (message.role !== 'assistant') return message

        if (typeof message.content === 'string') return message

        const sanitizedContent = message.content.filter((content) =>
            content.type === 'tool-call'
                ? toolResultIds.includes(content.toolCallId)
                : content.type === 'text'
                ? content.text.length > 0
                : true
        )

        return {
            ...message,
            content: sanitizedContent,
        }
    })

    return messagesBySanitizedContent.filter(
        (message) => message.content.length > 0
    )
}

export function sanitizeUIMessages(messages: Array<Message>): Array<Message> {
    const messagesBySanitizedToolInvocations = messages.map((message) => {
        if (message.role !== 'assistant') return message

        if (!message.toolInvocations) return message

        const toolResultIds: Array<string> = []

        for (const toolInvocation of message.toolInvocations) {
            if (toolInvocation.state === 'result') {
                toolResultIds.push(toolInvocation.toolCallId)
            }
        }

        const sanitizedToolInvocations = message.toolInvocations.filter(
            (toolInvocation: ToolInvocation) =>
                toolInvocation.state === 'result' ||
                toolResultIds.includes(toolInvocation.toolCallId)
        )

        return {
            ...message,
            toolInvocations: sanitizedToolInvocations,
        }
    })

    return messagesBySanitizedToolInvocations.filter(
        (message) =>
            message.content.length > 0 ||
            (message.toolInvocations && message.toolInvocations.length > 0)
    )
}

export function isEmpty(value: string | null | undefined) {
    return value === null || value === undefined || value === ''
}

export function isNotEmpty(value: string | null | undefined) {
    return !isEmpty(value)
}

export function completeJSON(incompleteJSON: string): string {
    try {
        // 如果已经是有效的 JSON，直接返回
        JSON.parse(incompleteJSON)
        return incompleteJSON
    } catch {
        let json = incompleteJSON

        // 计算左右括号数量
        const leftBraces = (json.match(/{/g) || []).length
        const rightBraces = (json.match(/}/g) || []).length
        const leftBrackets = (json.match(/\[/g) || []).length
        const rightBrackets = (json.match(/\]/g) || []).length

        // 补全缺失的右大括号
        for (let i = 0; i < leftBraces - rightBraces; i++) {
            json += '}'
        }

        // 补全缺失的右中括号
        for (let i = 0; i < leftBrackets - rightBrackets; i++) {
            json += ']'
        }

        // 验证修复后的 JSON 是否有效
        try {
            JSON.parse(json)
            return json
        } catch (e) {
            console.error('Failed to repair JSON:', e)
            throw new Error('Unable to repair malformed JSON')
        }
    }
}

// 将文件转换为 Blob
export function fileToBlob(selectedFile: File) {
    const file = new File([selectedFile], 'resume.pdf', {
        type: 'application/pdf',
    })
    return file
}

// 将时间格式化为 2024-01-01 12:00:00
export function formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss')
}

// 将时间格式化为 2024-01-01
export function formateDateToYearMonthDay(date: Date) {
    return format(date, 'yyyy-MM-dd')
}

export const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error(
            'An error occurred while fetching the data.'
        ) as ApplicationError

        error.info = await res.json()
        error.status = res.status

        throw error
    }

    return res.json()
}

interface ApplicationError extends Error {
    info: string
    status: number
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
