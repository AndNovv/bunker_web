import JoinGame from '@/components/JoinGame'
import { ModeToggle } from '@/components/ModeToggle'

export default function Home() {
  return (
    <main className="flex min-h-screen gap-4 flex-col items-center justify-between p-24">
      <div className='flex justify-between items-center'>
        <ModeToggle />
      </div>
      <JoinGame />
    </main>
  )
}
