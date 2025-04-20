// src/utils/cookies.ts
import {
    getCookie as getNextCookie,
    setCookie as setNextCookie,
    deleteCookie,
} from 'cookies-next'

export interface TTSSettings {
    speed: number
    voice: string
}

interface CookieOptions {
    maxAge?: number
    path?: string
}

const defaultOptions: CookieOptions = {
    maxAge: 365 * 24 * 60 * 60, // 默认一年
    path: '/',
}

export class CookieUtil {
    static set(
        key: string,
        value: TTSSettings,
        options: CookieOptions = defaultOptions
    ) {
        try {
            const stringValue =
                typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value)
            setNextCookie(key, stringValue, options)
        } catch (error) {
            console.error('Error setting cookie:', error)
        }
    }

    static get<T>(key: string): T | null {
        try {
            const value = getNextCookie(key)
            if (!value) return null

            try {
                return JSON.parse(value as string) as T
            } catch {
                return value as T
            }
        } catch (error) {
            console.error('Error getting cookie:', error)
            return null
        }
    }

    static remove(key: string) {
        try {
            deleteCookie(key)
        } catch (error) {
            console.error('Error removing cookie:', error)
        }
    }
}
