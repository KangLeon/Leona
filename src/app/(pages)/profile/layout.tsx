
import { redirect } from 'next/navigation'
import { auth } from '../(auth)/auth'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        return redirect('/login')
    }

    return <div className="h-screen">{children}</div>
}
