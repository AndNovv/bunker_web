"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { CardType, PlayerType } from '../../types/types';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react'
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import { numberOfRounds } from '@/data/data';

const Game = () => {

    const { code, round, playerId, players, eliminated, updatePlayers } = useGameInfo((state) => {
        return {
            code: state.code,
            round: state.round,
            playerId: state.playerId,
            players: state.players,
            eliminated: state.eliminated,
            updatePlayers: state.updatePlayers,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const player = players[playerId]

    const shouldReveal = player.revealedCount < round

    const router = useRouter()

    useEffect(() => {
        socket.on("char_revealed_response", (players: PlayerType[]) => {
            updatePlayers(players)
        })
        socket.on("end_of_round_revealing", (players: PlayerType[]) => {
            updatePlayers(players)
            router.push('/discussion')
        })

        return () => {
            socket.off("char_revealed_response")
            socket.off("end_of_round_revealing")
        }
    }, [])

    return (
        <div className='flex flex-col gap-2 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <p>{`Раунд ${round}`}</p>
                <p>{`Ваш ID: ${playerId}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-center text-xl'>Каждый игрок должен по очереди раскрыть одну свою характеристику</h2>
                {shouldReveal && !eliminated && <h2 className='text-center text-xl'>Раскройте еще одну характеристику о себе</h2>}
                <div className='flex flex-wrap gap-2 justify-center'>
                    {players.map((player, index) => {
                        let cardType: CardType = player.id === playerId ? 'player game card' : 'opponent game card'
                        if (player.eliminated) { cardType = 'eliminated card' }
                        return (
                            <PlayerCard key={`player${index}`} nameInput={null} player={player} cardType={cardType} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Game