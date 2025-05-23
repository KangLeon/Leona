'use client'

import { useRouter } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { PlusIcon } from './Icon'
import { useSidebar } from '@/components/ui/sidebar'
import { ModelSelector } from '@/components/ModelSelector'
import { SidebarToggle } from '@/components/SidebarToggle'
import { memo } from 'react'

function PureChatHeader({ selectedModelId }: { selectedModelId: string }) {
    const router = useRouter()
    const { open } = useSidebar()

    const { width: windowWidth } = useWindowSize()

    return (
        <header className='flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2'>
            <SidebarToggle />
            {(!open || windowWidth < 768) && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                className='order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0'
                                onClick={() => {
                                    router.push('/chat')
                                    router.refresh()
                                }}>
                                <PlusIcon />
                                <span className='md:sr-only'>New Chat</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>New Chat</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            <ModelSelector
                selectedModelId={selectedModelId}
                className='order-1 md:order-2'
            />
        </header>
    )
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
    return prevProps.selectedModelId === nextProps.selectedModelId
})
