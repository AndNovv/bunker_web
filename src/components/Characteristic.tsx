import { useGameInfo } from '@/hooks/useGameInfo'
import { cn } from '@/lib/utils'
import { socket } from '@/socket'
import { CardType, Charachteristic } from '@/types/types'
import React from 'react'


const Characteristic = ({ char, cardType }: { char: Charachteristic<string, string>, cardType: CardType }) => {

    const { code, playerId } = useGameInfo((state) => {
        return {
            code: state.code,
            playerId: state.playerId,
            updatePlayers: state.updatePlayers
        }
    })

    const revealChar = () => {
        if (char.hidden) {
            console.log('char revealed')
            socket.emit("char_revealed", { code, playerId, charTitle: char.key })
        }
    }

    if (cardType === 'player game card') {

        const bgcolor = char.hidden ? 'bg-secondary' : 'bg-accent text-[#7cc66e] cursor-default'
        return (
            <div className={cn('rounded cursor-pointer transition-all hover:bg-[#7cc66e] hover:text-[#FFF] px-2 py-1', bgcolor)} onClick={revealChar}>{`${char.title}: ${char.value}`}</div>
        )
    }

    if (cardType === 'opponent game card') {
        if (char.hidden) {
            return (
                <div>{`${char.title}: Неизвестно`}</div>
            )
        }
        else {
            return (
                <div>{`${char.title}: ${char.value}`}</div>
            )
        }
    }

    return (
        <div>{`${char.title}: ${char.value}`}</div>
    )
}

export default Characteristic