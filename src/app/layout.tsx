import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ThemeProvider } from "@/components/ThemeProvider"
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
