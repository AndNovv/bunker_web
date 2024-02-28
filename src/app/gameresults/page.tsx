"use client"
import PlayerCard from '@/components/PlayersDisplayCards/PlayerCard'
import { useGameInfo } from '@/hooks/useGameInfo'
import { calculateMaxAnxietyLevel } from '@/lib/utils'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const GameResults = () => {

    const searchParams = useSearchParams()
    const reason = searchParams.get("reason")

    const router = useRouter()

    const { players, finale, bunkerStats } = useGameInfo((state) => {
        return {
            players: state.players,
            finale: state.finale,
            bunkerStats: state.bunkerStats,
        }
    })

    if (!bunkerStats || !finale) redirect('/')

    const maxAnxietyLevel = calculateMaxAnxietyLevel(players.length)

    const winningSide = bunkerStats.Anxiety.value < maxAnxietyLevel && finale.survivingPlayersId.length > 0 ? 'Survivors' : 'Eliminated'
    const winners = winningSide === 'Survivors' ?
        (finale.survivingPlayersId.map((playerId) => {
            return players[playerId]
        })) :
        (finale.eliminatedPlayersId.map((playerId) => {
            return players[playerId]
        }))

    return (
        <div className='flex flex-col justify-center items-center gap-2 text-lg'>
            <p className='text-center'>{winningSide === 'Survivors' ? 'Победили Выжившие' : 'Победили Изганные'}</p>
            <p className='text-center px-4 text-muted-foreground'>{reason}</p>
            <div className='flex gap-2 flex-wrap justify-center'>
                {winners.map((player, index) => {
                    return <PlayerCard key={`player${index}`} player={player} />

                }
                )}

            </div>
        </div>
    )
}

export default GameResults