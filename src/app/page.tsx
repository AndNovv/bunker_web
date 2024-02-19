import JoinGame from '@/components/JoinGame'
import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen md:px-24 px-12 pt-10">
      <div className='flex gap-10 flex-col'>
        <div className='flex w-full justify-between items-center'>
          <ModeToggle />
          <Button>Настройки</Button>
        </div>
        <JoinGame />
      </div>
    </main>
  )
}
