"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { CardType, PlayerType } from '../../types/types';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react'
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import { GameFlow } from '@/data/data'

const Discussion = () => {

    const { code, name, round, playerId, players, updatePlayers } = useGameInfo((state) => {
        return {
            code: state.code,
            name: state.name,
            round: state.round,
            playerId: state.playerId,
            players: state.players,
            updatePlayers: state.updatePlayers,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const currentRoundKickCount = GameFlow.get(players.length.toString())?.[round]

    const searchParams = useSearchParams()
    const readyInit = Number(searchParams.get("ready"))

    const [readyPlayers, setReadyPlayers] = useState(readyInit)
    const [ready, setReady] = useState(false)

    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        socket.on("ready_to_vote_response", (countOfReadyPlayers: number) => {
            setReadyPlayers(countOfReadyPlayers)
        })

        socket.on("start_voting", () => {
            router.push('/voting')
        })

        return () => {
            socket.off("ready_to_vote_response")
            socket.off("start_voting")
        }
    }, [])

    const votingReadyHandler = () => {
        setReady(true)
        socket.emit('ready_to_vote', { code, playerId })
    }

    return (
        <div className='flex flex-col gap-2 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <Button onClick={() => { router.push('/') }}>
                    <ChevronLeft />
                    На Главную
                </Button>
                <p>{`Раунд ${round}`}</p>
                <p>{`Ваш ID: ${playerId}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-center text-xl'>Время для общего обсуждения. Не забывайте о том, что у вас есть Карты Действия!</p>
                <p className='text-center text-xl'>{`В предстоящем голосовании Вам нужно избавиться от ${currentRoundKickCount} ${currentRoundKickCount === 1 ? 'Игрока' : 'Игроков'}`}</p>
                <div className='flex flex-wrap gap-2 justify-center'>
                    {players.map((player, index) => {
                        const cardType: CardType = player.id === playerId ? 'player game card' : 'opponent game card'
                        return (
                            <PlayerCard key={`player${index}`} nameInput={null} player={player} cardType={cardType} />
                        )
                    })}
                </div>
            </div>
            <p>{`Готовы ${readyPlayers}/${players.length}`}</p>
            <Button disabled={ready} onClick={votingReadyHandler}>{currentRoundKickCount ? 'Готов к голосованию' : 'Готов к следующему раунду'}</Button>
        </div>
    )
}

export default Discussion