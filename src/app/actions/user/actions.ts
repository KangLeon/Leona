'use server'

import { deleteUser, updateUser } from '@/lib/db/user'

export async function updateUserAction(
    userId: string,
    name: string,
    email: string
) {
    console.log('updateUserAction', userId, name, email)
    return await updateUser(userId, name, email)
}

export async function deleteUserAction(userId: string) {
    console.log('deleteUserAction', userId)
    await deleteUser(userId)
}
