'use client'

import type { Attachment, ChatRequestOptions, CreateMessage, Message } from 'ai'
import cx from 'classnames'
import type React from 'react'
import {
    useRef,
    useEffect,
    useState,
    useCallback,
    type Dispatch,
    type SetStateAction,
    type ChangeEvent,
    memo,
} from 'react'
import { toast } from 'sonner'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'

import { sanitizeUIMessages } from '@/lib/utils'

import { ArrowUpIcon, PaperclipIcon, StopIcon } from './Icon'
import { PreviewAttachment } from './PreviewAttachment'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { SuggestedActions } from './SuggestedActions'


function PureMultimodalInput({
    chatId,
    input,
    setInput,
    isLoading,
    stop,
    attachments,
    setAttachments,
    messages,
    setMessages,
    append,
    handleSubmit,
    className,
}: {
    chatId: string
    input: string
    setInput: (value: string) => void
    isLoading: boolean
    stop: () => void
    attachments: Array<Attachment>
    setAttachments: Dispatch<SetStateAction<Array<Attachment>>>
    messages: Array<Message>
    setMessages: Dispatch<SetStateAction<Array<Message>>>
    append: (
        message: Message | CreateMessage,
        chatRequestOptions?: ChatRequestOptions
    ) => Promise<string | null | undefined>
    handleSubmit: (
        event?: {
            preventDefault?: () => void
        },
        chatRequestOptions?: ChatRequestOptions
    ) => void
    className?: string
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { width } = useWindowSize()

    useEffect(() => {
        if (textareaRef.current) {
            adjustHeight()
        }
    }, [])

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2
                }px`
        }
    }

    const [localStorageInput, setLocalStorageInput] = useLocalStorage('input', '')

    useEffect(() => {
        if (textareaRef.current) {
            const domValue = textareaRef.current.value
            // Prefer DOM value over localStorage to handle hydration
            const finalValue = domValue || localStorageInput || ''
            setInput(finalValue)
            adjustHeight()
        }
        // Only run once after hydration
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLocalStorageInput(input)
    }, [input, setLocalStorageInput])

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value)
        adjustHeight()
    }

    const [isNeedSummary, setIsNeedSummary] = useState(false)
    const [summaryText, setSummaryText] = useState('')


    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadQueue, setUploadQueue] = useState<Array<string>>([])

    const submitForm = useCallback(() => {
        window.history.replaceState({}, '', `/chat/${chatId}`)

        handleSubmit(undefined, {
            experimental_attachments: attachments,
        })

        setAttachments([])
        setLocalStorageInput('')

        if (width && width > 768) {
            textareaRef.current?.focus()
        }
    }, [
        attachments,
        handleSubmit,
        setAttachments,
        setLocalStorageInput,
        width,
        chatId,
    ])

    const uploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/files/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const data = await response.json()
                const { url, pathname, contentType } = data

                return {
                    url,
                    name: pathname,
                    contentType: contentType,
                }
            }
            const { error } = await response.json()
            toast.error(error)
        } catch (error) {
            console.error('Error uploading files!', error)
            toast.error('Failed to upload file, please try again!')
        }
    }

    const handleFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.target.files || [])

            setUploadQueue(files.map((file) => file.name))

            try {
                const uploadPromises = files.map((file) => uploadFile(file))
                const uploadedAttachments = await Promise.all(uploadPromises)
                const successfullyUploadedAttachments = uploadedAttachments.filter(
                    (attachment) => attachment !== undefined
                )

                /// 发起总结
                if (isNeedSummary && summaryText.length > 0) {
                    append({
                        role: 'user',
                        content: summaryText,
                    }, {
                        experimental_attachments: [...attachments, ...successfullyUploadedAttachments],
                    })
                    setIsNeedSummary(false)
                    setSummaryText('')
                } else {
                    setAttachments((currentAttachments) => [
                        ...currentAttachments,
                        ...successfullyUploadedAttachments,
                    ])
                }
            } catch (error) {
                console.error('Error uploading files!', error)
            } finally {
                setUploadQueue([])
            }
        },
        [setAttachments, isNeedSummary, summaryText, attachments, append]
    )

    const handleFileClick = useCallback(async (action: string) => {
        return new Promise<void>((resolve) => {
            const input = fileInputRef.current
            if (!input) {
                resolve()
                return
            }
            input.click()
            setSummaryText(action)
            setIsNeedSummary(true)
            resolve()
        })
    }, [setIsNeedSummary, setSummaryText])

    return (
        <div className='relative w-full flex flex-col gap-4'>
            {messages.length === 0 &&
                attachments.length === 0 &&
                uploadQueue.length === 0 && (
                    <SuggestedActions
                        append={append}
                        chatId={chatId}
                        handleFileClick={handleFileClick}
                    />
                )}

            <input
                type='file'
                className='fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none'
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                tabIndex={-1}
            />

            {(attachments.length > 0 || uploadQueue.length > 0) && (
                <div className='flex flex-row gap-2 overflow-x-scroll items-end'>
                    {attachments.map((attachment) => (
                        <PreviewAttachment key={attachment.url} attachment={attachment} />
                    ))}

                    {uploadQueue.map((filename) => (
                        <PreviewAttachment
                            key={filename}
                            attachment={{
                                url: '',
                                name: filename,
                                contentType: '',
                            }}
                            isUploading={true}
                        />
                    ))}
                </div>
            )}

            <Textarea
                ref={textareaRef}
                placeholder='Send a message...'
                value={input}
                onChange={handleInput}
                className={cx(
                    'min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-muted',
                    className
                )}
                rows={3}
                autoFocus
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()

                        if (isLoading) {
                            toast.error('Please wait for the model to finish its response!')
                        } else {
                            submitForm()
                        }
                    }
                }}
            />

            {isLoading ? (
                <Button
                    className='rounded-full p-1.5 h-fit absolute bottom-0.5 right-2 m-0.5 border dark:border-zinc-600'
                    onClick={(event) => {
                        event.preventDefault()
                        stop()
                        setMessages((messages) => sanitizeUIMessages(messages))
                    }}>
                    <StopIcon size={14} />
                </Button>
            ) : (
                <Button
                    className='rounded-full p-1.5 h-fit absolute bottom-0.5 right-2 m-0.5 border dark:border-zinc-600'
                    onClick={(event) => {
                        event.preventDefault()
                        submitForm()
                    }}
                    disabled={input.length === 0 || uploadQueue.length > 0}>
                    <ArrowUpIcon size={14} />
                </Button>
            )}

            <Button
                className='rounded-full p-1.5 h-fit absolute bottom-0.5 right-14 m-0.5 dark:border-zinc-700'
                onClick={(event) => {
                    event.preventDefault()
                    fileInputRef.current?.click()
                }}
                variant='outline'
                disabled={isLoading}>
                <PaperclipIcon size={14} />
            </Button>
        </div>
    )
}

export const MultimodalInput = memo(
    PureMultimodalInput,
    (prevProps, currentProps) => {
        if (prevProps.input !== currentProps.input) return false
        if (prevProps.isLoading !== currentProps.isLoading) return false

        return true
    }
)
