"use client"
import JoinGame from '@/components/JoinGame'
import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'

export default function Home() {

  const router = useRouter()

  return (
    <div className="min-h-screen md:px-24 px-12 pt-10 antialiased relative flex gap-10 flex-col">
      <div className='flex w-full justify-end items-center gap-4'>
        <ModeToggle />
        <Button className='p-3 flex gap-2 justify-center items-center' variant={'outline'} onClick={() => { router.push('/rules') }}>
          <BookOpen className='h-[1.2rem] w-[1.2rem]' />
          <p>Правила</p>
        </Button>
      </div>
      <JoinGame />
    </div>
  )
}
