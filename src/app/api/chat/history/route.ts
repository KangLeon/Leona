import { auth } from '@/app/(pages)/(auth)/auth'
import { NextRequest } from 'next/server'
import { getChatsByUserId } from '@/lib/db/chat'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl

    const startingAfter = searchParams.get('starting_after')
    const endingBefore = searchParams.get('ending_before')

    if (startingAfter && endingBefore) {
        return Response.json(
            'Only one of starting_after or ending_before can be provided!',
            { status: 400 }
        )
    }

    const session = await auth()

    if (!session?.user?.id) {
        return Response.json('Unauthorized!', { status: 401 })
    }

    const limit = parseInt(searchParams.get('limit') || '10')

    try {
        const chats = await getChatsByUserId({
            id: session.user.id,
            limit,
            startingAfter,
            endingBefore,
        })

        return Response.json(chats)
    } catch (error) {
        console.error('Failed to fetch chats!', error)
        return Response.json('Failed to fetch chats!', { status: 500 })
    }
}
