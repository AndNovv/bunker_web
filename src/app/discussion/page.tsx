"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { ActionCardType, ActionTypes, CardType, PlayerType } from '../../types/types';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import { GameFlow } from '@/data/data'
import ActionCard from '@/components/ActionCard'

const Discussion = () => {

    const { code, round, playerId, players, eliminated, countOfNotEliminatedPlayers, updatePlayers, incrementRound } = useGameInfo((state) => {
        return {
            code: state.code,
            round: state.round,
            playerId: state.playerId,
            players: state.players,
            eliminated: state.eliminated,
            countOfNotEliminatedPlayers: state.countOfNotEliminatedPlayers,
            updatePlayers: state.updatePlayers,
            incrementRound: state.incrementRound,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const gameRounds = GameFlow.get(players.length.toString())
    const currentRoundKickCount = gameRounds !== undefined ? gameRounds[round - 1] : 0

    const searchParams = useSearchParams()
    const readyInit = Number(searchParams.get("ready"))

    const [readyPlayers, setReadyPlayers] = useState(readyInit)
    const [ready, setReady] = useState(false)

    const router = useRouter()
    const { toast } = useToast()

    // Sockets

    useEffect(() => {
        socket.on("ready_to_vote_response", (countOfReadyPlayers: number) => {
            setReadyPlayers(countOfReadyPlayers)
        })

        socket.on("start_voting", () => {
            router.push('/voting')
        })

        socket.on("start_next_round", () => {
            incrementRound()
            router.push('/game')
        })

        socket.on("action_card_was_used", ({ playerId, actionCard, players }: { playerId: number, actionCard: ActionCardType, players: PlayerType[] }) => {
            updatePlayers(players)
            toast({
                title: `Игрок ${players[playerId].name} использовал карту "${actionCard.name}"`
            })
        })

        return () => {
            socket.off("action_card_was_used")
            socket.off("ready_to_vote_response")
            socket.off("start_voting")
            socket.off("start_next_round")
        }
    }, [])


    // Handlers

    const readyHandler = () => {
        setReady(true)
        socket.emit("ready_discussion", { code, playerId })
    }

    return (
        <div className='flex flex-col gap-2 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <p>{`Раунд ${round}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-center text-xl'>Время для общего обсуждения. Не забывайте о том, что у вас есть Карты Действия!</p>
                {!!currentRoundKickCount && <p className='text-center text-xl'>{`В предстоящем голосовании Вам нужно избавиться от ${currentRoundKickCount} ${currentRoundKickCount === 1 ? 'Игрока' : 'Игроков'}`}</p>}
                <div className='flex flex-wrap gap-2 justify-center'>
                    {players.map((player, index) => {
                        let cardType: CardType = player.id === playerId ? 'player game card' : 'opponent game card'
                        if (player.eliminated) { cardType = 'eliminated card' }
                        return (
                            <PlayerCard key={`player${index}`} player={player} cardType={cardType} />
                        )
                    })}
                </div>
            </div>
            <div className='mt-4'>
                <h1 className='text-2xl text-center'>Ваши карточки действий</h1>
                <div className='flex gap-4 mt-2'>
                    {players[playerId].actionCards.map((actionCard, index) => {
                        return (
                            <ActionCard ready={ready} key={`actionCard${index}`} actionCardId={index} actionData={actionCard} />
                        )
                    })
                    }
                </div>
            </div>
            <p>{`Готовы ${readyPlayers}/${countOfNotEliminatedPlayers}`}</p>
            <Button disabled={ready || eliminated} onClick={readyHandler}>{currentRoundKickCount ? 'Готов к голосованию' : 'Готов к следующему раунду'}</Button>
        </div>
    )
}

export default Discussion