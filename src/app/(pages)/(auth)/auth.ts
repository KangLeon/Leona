import { compare } from 'bcrypt-ts'
import NextAuth, { type User, type Session, Account } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { type JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import { getUser, getUserById } from '@/lib/db/user'

interface ExtendedSession extends Session {
    user: User
}

const authOptions = {
    providers: [
        Google,
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                const { email, password } = credentials as {
                    email: string
                    password: string
                }
                const users = await getUser(email)
                if (users.length === 0) return null
                // biome-ignore lint: Forbidden non-null assertion.
                const passwordsMatch = await compare(
                    password,
                    users[0].password!
                )
                if (!passwordsMatch) return null

                return {
                    ...users[0],
                    subscription: null,
                }
            },
        }),
    ],
    // 支持 iframe 的配置
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'none' as const,
                path: '/',
                secure: true,
            },
        },
        callbackUrl: {
            name: 'next-auth.callback-url',
            options: {
                sameSite: 'none' as const,
                path: '/',
                secure: true,
            },
        },
        csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
                httpOnly: true,
                sameSite: 'none' as const,
                path: '/',
                secure: true,
            },
        },
    },
    // 信任域名配置
    trustHost: true,
    callbacks: {
        async signIn({
            user,
            account,
        }: {
            user: User
            account: Account | null
        }) {
            console.log('用户信息1', user)
            console.log('account', account)
            return true
        },
        async jwt({
            token,
            account,
            user,
        }: {
            token: JWT
            account: Account | null
            user: User
        }) {
            if (account) {
                token.provider = account.provider
            }
            if (user) {
                token.id = user.id
                token.name = user.name
            }
            return token
        },
        async session({
            session,
            token,
        }: {
            session: ExtendedSession
            token: JWT
        }): Promise<ExtendedSession> {
            // 从数据库获取最新的用户信息
            const users = await getUserById(token.id as string)
            const latestUser = users[0]

            if (session.user && latestUser) {
                session.user = {
                    ...session.user,
                    ...latestUser,
                    // 确保 id 和 name 从 token 中获取（如果需要）
                    id: token.id as string,
                }
            }

            return session
        },
    },
    pages: {
        signIn: '/login',
    },
}

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth(authOptions)
