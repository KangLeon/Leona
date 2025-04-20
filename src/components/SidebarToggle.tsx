
import { useSidebar } from '@/components/ui/sidebar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { SidebarLeftIcon } from '@/components/Icon'
import { Button } from '@/components/ui/button'

export function SidebarToggle() {
    const { toggleSidebar } = useSidebar()

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={toggleSidebar}
                        variant='outline'
                        className='md:px-2 md:h-fit'>
                        <SidebarLeftIcon size={16} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Sidebar</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
