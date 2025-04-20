'use client'

import { useRouter } from 'next/navigation'

import { PlusIcon } from './Icon'
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    useSidebar,
} from '@/components/ui/sidebar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { SidebarUserNav } from './SidebarUserNav'
import { SidebarHistory } from './SidebarHistory'
import { User } from 'next-auth'
import { application_name } from '@/lib/constant'
import { LogOut } from 'lucide-react'
export function ChatSideBar({ user }: { user: User | undefined }) {
    const router = useRouter()
    const { setOpenMobile } = useSidebar()

    return (
        <Sidebar className='group-data-[side=left]:border-r-0'>
            <SidebarHeader>
                <SidebarMenu>
                    <div className='flex flex-row justify-between items-center'>
                        <Link
                            href='/'
                            onClick={() => {
                                setOpenMobile(false)
                            }}
                            className='flex flex-row gap-3 items-center'>
                            <div className="flex flex-row items-center gap-4">
                                <LogOut
                                    className="h-4 w-4 hover:text-gray-700 cursor-pointer rotate-180"
                                    onClick={() => {
                                        router.push('/')
                                    }}
                                />
                                <span className='text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer'>
                                    {application_name}
                                </span>
                            </div>
                        </Link>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        type='button'
                                        className='p-2 h-fit'
                                        onClick={() => {
                                            setOpenMobile(false)
                                            router.push('/chat')
                                            router.refresh()
                                        }}>
                                        <PlusIcon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>New Chat</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarHistory user={user} />
            </SidebarContent>
            <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
        </Sidebar>
    )
}
