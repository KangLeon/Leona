import type { Message } from 'ai'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'

import { CopyIcon } from './Icon'
import { Button } from './ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export function MessageActions({
    message,
    isLoading,
}: {
    chatId: string
    message: Message
    isLoading: boolean
}) {
    const [, copyToClipboard] = useCopyToClipboard()

    if (isLoading) return null
    if (message.role === 'user') return null
    if (message.toolInvocations && message.toolInvocations.length > 0) return null

    return (
        <TooltipProvider delayDuration={0}>
            <div className='flex flex-row gap-2'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className='py-1 px-2 h-fit text-muted-foreground'
                            variant='outline'
                            onClick={async () => {
                                await copyToClipboard(message.content as string)
                                toast.success('Copied to clipboard!')
                            }}>
                            <CopyIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy</TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
}
