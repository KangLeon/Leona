'use client'

import { Avatar } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'

export default function GradientAvatar() {
    const { data: session } = useSession()
    const email = session?.user?.email ?? ''
    const name = session?.user?.name ?? ''

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
            </Avatar>
            <p className="text-m text-white font-medium">
                {name.length > 0 ? name : email}
            </p>
        </div>
    )
}
