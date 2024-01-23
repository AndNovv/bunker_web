import React from 'react'
import CopyCodeBadge from './CopyCodeBadge'
import { ModeToggle } from './ModeToggle'

const GameHeader = ({ code }: { code: string }) => {
    return (
        <div className='flex justify-between items-center w-full'>
            <ModeToggle />
            <CopyCodeBadge code={code} />
        </div>
    )
}

export default GameHeader