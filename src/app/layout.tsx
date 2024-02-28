import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/ThemeProvider"
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Бункер',
  description: 'Бункер - онлайн игра',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen w-full font-sans relative", inter.variable)}>
        <main>
          <div className='fixed w-full min-h-screen dark:bg-black bg-white dark:bg-dot-white/[0.25] bg-dot-black/[0.25] -z-10'>
            <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white md:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] -z-10'></div>
          </div>

          <div className='md:px-10 px-6 py-4'>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </div>
          <Toaster />

        </main>

      </body>
    </html>
  )
}
