import { smoothStream, streamText, UIMessage } from 'ai'
import { getWeather } from '@/lib/ai/tools/get-weather'

import {
    deleteMessagesForChat,
    getChatById,
    saveChat,
    saveMessages,
} from '@/lib/db/chat'
import {
    generateTitleFromUserMessage,
    generateUUID,
    getMostRecentUserMessage,
    getTrailingMessageId,
    regularPrompt,
} from '@/lib/utils'
import { auth } from '@/app/(pages)/(auth)/auth'
import { deleteChat } from '@/app/actions/chat/actions'
import { customModel } from '@/lib/ai'
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { ChatSDKError } from '@/lib/errors'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
        return Response.json({ error: 'id is required' }, { status: 400 })
    }
    const chat = await getChatById({ id })

    return Response.json({ chat })
}

export async function POST(request: Request) {
    try {
        const {
            id,
            message,
            selectedChatModel,
        }: {
            id: string
            message: ChatMessage
            selectedChatModel: string
        } = await request.json()

        const session = await auth()

        if (!session || !session.user || !session.user.id) {
            return new ChatSDKError('unauthorized:chat').toResponse()
        }

        const userMessage = getMostRecentUserMessage(messages)

        if (!userMessage) {
            return new Response('No user message found', { status: 400 })
        }

        const chat = await getChatById({ id })

        if (!chat) {
            const title = await generateTitleFromUserMessage({
                message: userMessage,
            })

            await saveChat({
                id,
                userId: session.user.id,
                title,
                modelId: selectedChatModel,
            })
        } else {
            if (chat.userId !== session.user.id) {
                return new Response('Unauthorized', { status: 401 })
            }
        }

        await saveMessages({
            messages: [
                {
                    chatId: id,
                    id: userMessage.id,
                    role: 'user',
                    parts: userMessage.parts,
                    attachments: [],
                    createdAt: new Date(),
                },
            ],
        })

        const uiMessages = [...convertToUIMessages(messagesFromDb), message]

        const { longitude, latitude, city, country } = geolocation(request)

        const requestHints: RequestHints = {
            longitude,
            latitude,
            city,
            country,
        }

        return createDataStreamResponse({
            execute: (dataStream) => {
                const result = streamText({
                    model: customModel(selectedChatModel),
                    system: regularPrompt,
                    messages,
                    experimental_transform: smoothStream({ chunking: 'word' }),
                    experimental_generateMessageId: generateUUID,
                    tools: {
                        // 配置 web_search_preview 工具
                        web_search_preview: openai.tools.webSearchPreview({
                            // 可选配置
                            searchContextSize: 'medium', // 获取更多上下文
                            userLocation: {
                                type: 'approximate',
                                city: 'Shanghai', // 可以根据需要更改
                                region: 'Shanghai',
                            },
                        }),
                        computer: anthropic.tools.computer_20250124({
                            displayWidthPx: 1920,
                            displayHeightPx: 1080,
                            displayNumber: 1,
                        }),
                        getWeather,
                    },
                    // 强制使用 web search 工具
                    //toolChoice: {
                    //    type: 'tool',
                    //    toolName: 'web_search_preview',
                    //},
                    onFinish: async ({ response }) => {
                        await saveMessages({
                            messages: messages.map((message) => ({
                                id: message.id,
                                role: message.role,
                                parts: message.parts,
                                createdAt: new Date(),
                                attachments: [],
                                chatId: id,
                            })),
                        })
                    },
                    experimental_telemetry: {
                        isEnabled: true,
                        functionId: 'stream-text',
                    },
                })

                result.consumeStream()

                result.mergeIntoDataStream(dataStream, {
                    sendReasoning: true,
                })
            },
            onError: (e) => {
                console.error('Failed to process request1', e)
                return 'Oops, an error occurred!'
            },
        })
    } catch (error) {
        console.error('Failed to process request2', error)
        return new Response(
            'An error occurred while processing your request!',
            {
                status: 404,
            }
        )
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        console.log('No id found row122')
        return new Response('Not Found', { status: 404 })
    }

    // 先删除所有相关的消息记录
    await deleteMessagesForChat({ chatId: id })

    // 最后删除聊天记录
    await deleteChat(id)

    return new Response('Chat and related messages deleted', { status: 200 })
}
