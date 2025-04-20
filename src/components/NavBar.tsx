'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import GradientAvatar from '@/components/GradientAvatar'
import { useRouter } from 'next/navigation'
import { application_name } from '@/lib/constant'
import { GoogleLogin } from './GoogleLogin'
import { SignInButton } from './SignInButton'

export default function NavBar() {
    const { data: session, status } = useSession()
    const [showMenu, setShowMenu] = useState(false)
    const [showLogin, setShowLogin] = useState<boolean | null>(null)

    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated' && session) {
            setShowLogin(true)
            console.log('Session updated:', session)
        } else if (status === 'unauthenticated') {
            setShowLogin(false)
        }
    }, [status, session])

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            className="text-white/80 hover:text-white transition-colors relative group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
    )

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-b border-white/10 z-50 px-6 py-4 md:py-5 flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-bold text-white">
                {application_name}
            </div>
            <div className="flex items-center gap-6 md:gap-8">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/intro/features">Features</NavLink>
                <NavLink href="/intro/contact">Contact</NavLink>
                <NavLink href="/intro/privacy">Privacy</NavLink>
                <NavLink href="/intro/about">About</NavLink>
                <NavLink href="/intro/pricing">Pricing</NavLink>

                {showLogin !== null ? (
                    showLogin ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="focus:outline-none"
                            >
                                <GradientAvatar />
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-sm border border-white/10 rounded-md shadow-lg py-1 z-50">
                                    <button
                                        onClick={() => {
                                            router.push('/profile')
                                            setShowMenu(false)
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            signOut()
                                            setShowMenu(false)
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <SignInButton onClick={() => router.push('/login')} />
                        </div>
                    )
                ) : null}
            </div>
        </nav>
    )
}
