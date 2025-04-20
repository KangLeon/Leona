import 'server-only'

import { db } from '..'
import { user, User } from '../schema'
import { eq } from 'drizzle-orm'
import { genSaltSync, hashSync } from 'bcrypt-ts'

export async function getUser(email: string): Promise<Array<User>> {
    try {
        return await db.select().from(user).where(eq(user.email, email))
    } catch (error) {
        console.error('Failed to get user from database')
        throw error
    }
}

export async function getUserById(id: string): Promise<Array<User>> {
    return await db.select().from(user).where(eq(user.id, id))
}

export async function createUser(email: string, password: string) {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)

    try {
        return await db.insert(user).values({ email, password: hash, name: '' })
    } catch (error) {
        console.error('Failed to create user in database')
        throw error
    }
}

export async function updateUser(userId: string, name: string, email: string) {
    return await db.update(user).set({ name, email }).where(eq(user.id, userId))
}

export async function deleteUser(userId: string) {
    return await db.delete(user).where(eq(user.id, userId))
}
