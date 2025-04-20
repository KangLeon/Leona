'use client'

import localFont from 'next/font/local'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import NavBar from '@/components/NavBar'
import { usePathname, useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const hideNavbarPaths = ['/chat', '/login', '/register', '/report']
const shouldBackPaths = ['/login', '/register', '/report']

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()

  const shouldHideNavbar = hideNavbarPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  const [shouldShowBack, setShouldShowBack] = useState(false)

  useEffect(() => {
    const shouldBack = shouldBackPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )
    setShouldShowBack(shouldBack)
  }, [pathname])

  const renderComponent = () => {
    if (pathname.includes('editor')) {
      return children
    } else {
      return (
        <>
          {!shouldHideNavbar && <NavBar />}
          {shouldShowBack && (
            <button
              onClick={() => router.back()}
              className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              aria-label="返回"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div
            style={{
              minHeight: '800px',
            }}
          >
            {children}
          </div>
          {!shouldHideNavbar && pathname !== '/' && <Footer />}
        </>
      )
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {/*数据分析*/}
          <Analytics />

          <Toaster position="top-center" />
          <main>{renderComponent()}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
