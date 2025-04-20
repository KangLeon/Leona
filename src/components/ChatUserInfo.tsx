'use client'

import { Avatar } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'
import { Badge } from './ui/badge'
import { useEffect, useState } from 'react'

export default function ChatUserInfo() {
    const { data: session } = useSession()
    const name = session?.user?.name ?? ''
    const email = session?.user?.email ?? ''

    const [loadingInfo, setLoadingInfo] = useState(false)

    useEffect(() => {
        setLoadingInfo(true)
        setTimeout(() => {
            setLoadingInfo(false)
        }, 2000)
    }, [])

    return (
        !loadingInfo && (
            <div className="bg-white flex border overflow-hidden border-gray-200 p-2 rounded-xl items-center w-full mx-auto">
                <div className="flex items-center justify-between gap-2 animate-in fade-in duration-700 w-full">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Avatar className="h-7 w-7 shrink-0 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
                        </Avatar>
                        <p className="text-sm font-medium truncate max-w-[120px]">
                            {name.length > 0 ? name : email}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {(name || email) && (
                            <Badge className="shrink-0">
                                {'Free'}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}
