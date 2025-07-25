'use client'

import { startTransition, useMemo, useState, useEffect } from 'react'

import { setCookie } from 'cookies-next'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { models } from '@/lib/ai/models'
import { cn } from '@/lib/utils'

import { CheckCirclFillIcon, ChevronDownIcon } from './Icon'
import useChatStore from '@/store/chatStore'

export const ModelSelector = ({
    selectedModelId,
    className,
}: {
    selectedModelId: string
} & React.ComponentProps<typeof Button>) => {
    const [open, setOpen] = useState(false)
    const { setModelId } = useChatStore()
    const [optimisticModelId, setOptimisticModelId] = useState(
        selectedModelId || 'deepseek-chat'
    )

    const selectModel = useMemo(
        () =>
            models.find((model) => model.id === optimisticModelId) ||
            models.find((model) => model.id === 'deepseek-chat'),
        [optimisticModelId]
    )

    // 组件挂载时检查是否需要设置默认模型
    useEffect(() => {
        if (!selectedModelId) {
            startTransition(() => {
                setOptimisticModelId('deepseek-chat')
                setCookie('modelId', 'deepseek-chat')
                setModelId('deepseek-chat')
            })
        }
    }, [selectedModelId, setModelId])

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                asChild
                className={cn(
                    'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
                    className
                )}
            >
                <Button variant="outline" className="md:px-2 md:h-[34px]">
                    {selectModel?.label || 'GPT-4'}
                    <ChevronDownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[300px]">
                {models.map((model) => (
                    <DropdownMenuItem
                        key={model.id}
                        onSelect={() => {
                            setOpen(false)

                            startTransition(() => {
                                setOptimisticModelId(model.id)
                                setCookie('modelId', model.id) // 部分设置cookie
                                setModelId(model.id)
                            })
                        }}
                        className="gap-4 group/item flex flex-row justify-between items-center"
                        data-active={model.id === optimisticModelId}
                    >
                        <div className="flex flex-col gap-1 items-start">
                            {model.label}
                            {model.description && (
                                <div className="text-xs text-muted-foreground">
                                    {model.description}
                                </div>
                            )}
                        </div>
                        <div className="text-primary dark:text-primary-foreground opacity-0 group-data-[active=true]/item:opacity-100">
                            <CheckCirclFillIcon />
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
