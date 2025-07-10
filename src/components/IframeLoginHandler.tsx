'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function IframeLoginHandler() {
    const { data: session, status } = useSession()

    useEffect(() => {
        // 检测是否在 iframe 中
        const isInIframe = window !== window.parent

        if (isInIframe) {
            // 向父窗口发送登录状态更新
            const sendLoginStatus = () => {
                window.parent.postMessage(
                    {
                        type: 'LOGIN_STATUS_UPDATE',
                        isLoggedIn: !!session,
                        status: status,
                        user: session?.user || null,
                    },
                    '*'
                )
            }

            // 状态变化时发送更新
            sendLoginStatus()

            // 监听来自父窗口的登录检查请求
            const handleMessage = (event: MessageEvent) => {
                if (event.data.type === 'CHECK_LOGIN_STATUS') {
                    sendLoginStatus()
                }
            }

            window.addEventListener('message', handleMessage)

            return () => {
                window.removeEventListener('message', handleMessage)
            }
        }
    }, [session, status])

    // 在 iframe 中显示登录状态提示
    const isInIframe = typeof window !== 'undefined' && window !== window.parent

    if (isInIframe && status === 'loading') {
        return (
            <div className="fixed top-4 left-4 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm z-50">
                🔐 检查登录状态...
            </div>
        )
    }

    if (isInIframe && !session) {
        return (
            <div className="fixed top-4 left-4 bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm z-50">
                ⚠️ 需要登录才能进行演示
            </div>
        )
    }

    if (isInIframe && session) {
        return (
            <div className="fixed top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm z-50">
                ✅ 已登录: {session.user?.email}
            </div>
        )
    }

    return null
}
