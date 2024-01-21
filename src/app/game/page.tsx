"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { CardType, PlayerType } from '../../types/types';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react'
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'

const Game = () => {

    const { code, name, playerId, players, updatePlayers } = useGameInfo((state) => {
        return {
            code: state.code,
            name: state.name,
            playerId: state.playerId,
            players: state.players,
            updatePlayers: state.updatePlayers,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const player = players[playerId]

    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        socket.on("char_revealed_response", (players: PlayerType[]) => {
            updatePlayers(players)
        })

        return () => {
            socket.off("char_revealed_response")
        }
    }, [])


    return (
        <div className='flex flex-col gap-2 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <Button onClick={() => { router.push('/') }}>
                    <ChevronLeft />
                    На Главную
                </Button>
                <Button onClick={() => { router.push('/voting') }}>
                    Голосовать
                </Button>
                <p>{`Ваш ID: ${playerId}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-wrap gap-2 justify-center'>
                {players.map((player, index) => {
                    const cardType: CardType = player.id === playerId ? 'player game card' : 'opponent game card'
                    return (
                        <PlayerCard key={`player${index}`} nameInput={null} player={player} cardType={cardType} />
                    )
                })}
            </div>
        </div>
    )
}

export default Game