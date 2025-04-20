import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ChatSideBar } from '@/components/ChatSideBar'
import { auth } from '@/app/(pages)/(auth)/auth'
import { redirect } from 'next/navigation'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <ChatSideBar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
