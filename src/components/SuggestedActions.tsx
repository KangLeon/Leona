'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChatRequestOptions, CreateMessage, Message } from 'ai'
import { memo } from 'react'

interface SuggestedActionsProps {
    chatId: string
    append: (
        message: Message | CreateMessage,
        chatRequestOptions?: ChatRequestOptions
    ) => Promise<string | null | undefined>
    handleFileClick: (action: string) => Promise<void>
}

function PureSuggestedActions({ chatId, append, handleFileClick }: SuggestedActionsProps) {
    const suggestedActions = [
        {
            title: 'What is the weather',
            label: 'in San Francisco?',
            action: 'What is the weather in San Francisco?',
        },
        {
            title: 'Help me draft an essay',
            label: 'about Silicon Valley',
            action: 'Help me draft a short essay about Silicon Valley',
        },
        {
            title: 'How to be a software engineer',
            label: 'in China?',
            action: 'How to be a software engineer in China?',
        },
        {
            title: '帮我总结一下这篇pdf',
            label: '文件名：2024年1月1日',
            action: '请帮我总结一下我刚刚上传的PDF文件的主要内容',
        },
    ]

    return (
        <div className='grid sm:grid-cols-2 gap-2 w-full'>
            {suggestedActions.map((suggestedAction, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.05 * index }}
                    key={`suggested-action-${suggestedAction.title}-${index}`}
                    className={index > 1 ? 'hidden sm:block' : 'block'}>
                    <Button
                        variant='ghost'
                        onClick={async (event) => {
                            event.preventDefault()
                            if (suggestedAction.title === '帮我总结一下这篇pdf') {
                                handleFileClick(suggestedAction.action)
                            } else {
                                window.history.replaceState({}, '', `/chat/${chatId}`)
                                append({
                                    role: 'user',
                                    content: suggestedAction.action,
                                })
                                console.log('日志2224 append user message')
                            }
                        }}
                        className='text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start'>
                        <span className='font-medium'>{suggestedAction.title}</span>
                        <span className='text-muted-foreground'>
                            {suggestedAction.label}
                        </span>
                    </Button>
                </motion.div>
            ))}
        </div>
    )
}

export const SuggestedActions = memo(PureSuggestedActions, () => true)
