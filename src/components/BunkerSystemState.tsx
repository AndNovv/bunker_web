import React from 'react'
import { Progress } from './ui/progress'

const BunkerSystemState = ({ value, title }: { value: number, title: string }) => {

    const maxStrength = 10

    return (
        <div>
            <h2 className='mb-1'>{title}</h2>
            <Progress value={(value / maxStrength) * 100} />
        </div>
    )
}

export default BunkerSystemState