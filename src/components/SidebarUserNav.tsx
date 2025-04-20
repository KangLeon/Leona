'use client'
import { ChevronUp } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'

export const SidebarUserNav = ({ user }: { user: User | undefined }) => {

    const { push } = useRouter()

    const handleLogOut = () => {
        toast.loading('退出登录中...')
        signOut({
            redirect: true,
            callbackUrl: '/', // 登出后重定向到首页
        }).then(() => {
            toast.success('退出成功')
        })
    }

    const handleLogin = () => {
        push('/login')
    }

    return (
        <SidebarMenu className="shadow-[0_1px_6px_rgba(0,0,0,0.1)]">
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {user ? (
                            <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10'>
                                <Avatar className='h-8 w-8'>
                                    <AvatarImage src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMil8nWCZVGH1RB9ezf2Zx-mYobzLQ8HolA&s"} />
                                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <span className='truncate font-medium text-sm'>{user?.email}</span>
                                <ChevronUp className='ml-auto' />
                            </SidebarMenuButton>
                        ) : (
                            <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10'>
                                Not login
                            </SidebarMenuButton>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side='top'
                        className='w-[--radix-popper-anchor-width]'>
                        <DropdownMenuItem asChild>
                            {user ? (
                                <button
                                    type='button'
                                    className='w-full cursor-pointer'
                                    onClick={handleLogOut}>
                                    Logout
                                </button>
                            ) : (
                                <button onClick={handleLogin}>Login</button>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
