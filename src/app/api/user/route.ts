import { auth } from '@/app/(pages)/(auth)/auth'
import { deleteUserAction } from '@/app/actions/user/actions'
import { NextResponse } from 'next/server'

export async function DELETE() {
    try {
        const session = await auth()

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Please login first' },
                { status: 401 }
            )
        }

        if (!session.user.id) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            )
        }

        // 删除用户
        await deleteUserAction(session.user.id)

        return NextResponse.json(
            { message: 'Account deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Delete user error:', error)
        return NextResponse.json(
            { error: 'Failed to delete account. Please try again later.' },
            { status: 500 }
        )
    }
}
