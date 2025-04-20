import {
    appendResponseMessages,
    createDataStreamResponse,
    smoothStream,
    streamText,
    UIMessage,
} from 'ai'
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
import { openai } from '@ai-sdk/openai'

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
            messages,
            selectedChatModel,
        }: {
            id: string
            messages: Array<UIMessage>
            selectedChatModel: string
        } = await request.json()

        console.log('selectedChatModel：', selectedChatModel)
        console.log('id是：', id)

        const session = await auth()

        if (!session || !session.user || !session.user.id) {
            return new Response('Unauthorized', { status: 401 })
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
                    attachments: userMessage.experimental_attachments ?? [],
                    createdAt: new Date(),
                },
            ],
        })

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
                            searchContextSize: 'high', // 获取更多上下文
                            userLocation: {
                                type: 'approximate',
                                city: 'Shanghai', // 可以根据需要更改
                                region: 'Shanghai',
                            },
                        }),
                        getWeather,
                    },
                    // 强制使用 web search 工具
                    toolChoice: {
                        type: 'tool',
                        toolName: 'web_search_preview',
                    },
                    onFinish: async ({ response }) => {
                        if (session.user?.id) {
                            try {
                                const assistantId = getTrailingMessageId({
                                    messages: response.messages.filter(
                                        (message) =>
                                            message.role === 'assistant'
                                    ),
                                })

                                if (!assistantId) {
                                    throw new Error(
                                        'No assistant message found!'
                                    )
                                }

                                const [, assistantMessage] =
                                    appendResponseMessages({
                                        messages: [userMessage],
                                        responseMessages: response.messages,
                                    })

                                await saveMessages({
                                    messages: [
                                        {
                                            id: assistantId,
                                            chatId: id,
                                            role: assistantMessage.role,
                                            parts: assistantMessage.parts,
                                            attachments:
                                                assistantMessage.experimental_attachments ??
                                                [],
                                            createdAt: new Date(),
                                        },
                                    ],
                                })
                            } catch (error) {
                                console.error('Failed to save chat', error)
                            }
                        }
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
