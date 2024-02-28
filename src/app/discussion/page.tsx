"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { ActionCardType, ActionTypes, CardType, PlayerType } from '../../types/types';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayersDisplayCards/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import { GameFlow } from '@/data/data'
import ActionCard from '@/components/ActionCard'
import EliminatedPlayerCard from '@/components/PlayersDisplayCards/EliminatedPlayerCard'
import OpponentCard from '@/components/PlayersDisplayCards/OpponentCard'

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
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <p>{`Готовы ${readyPlayers}/${countOfNotEliminatedPlayers}`}</p>
                <CopyCodeBadge code={code} />
            </div>

            {/* <p className='text-center text-xl'>Время для общего обсуждения. Не забывайте о том, что у вас есть Карты Действия!</p> */}
            {/* {!!currentRoundKickCount && <p className='text-center text-xl'>{`В предстоящем голосовании Вам нужно избавиться от ${currentRoundKickCount} ${currentRoundKickCount === 1 ? 'Игрока' : 'Игроков'}`}</p>} */}
            <div className='flex flex-wrap gap-4 justify-center'>
                {players.map((player, index) => {
                    let cardType: CardType = player.id === playerId ? 'player game card' : 'opponent game card'
                    if (player.eliminated) {
                        return <EliminatedPlayerCard key={`player${index}`} player={player} />
                    }
                    else if (player.id === playerId) {
                        return <PlayerCard key={`player${index}`} player={player} />
                    }
                    else {
                        return (
                            <OpponentCard key={`player${index}`} player={player} />
                        )
                    }
                })}
            </div>

            <div className='flex gap-4'>
                {players[playerId].actionCards.map((actionCard, index) => {
                    return (
                        <ActionCard ready={ready} key={`actionCard${index}`} actionCardId={index} actionData={actionCard} />
                    )
                })
                }
            </div>

            <Button className='mt-3' variant={'outline'} disabled={ready || eliminated} onClick={readyHandler}>{currentRoundKickCount ? 'Готов к голосованию' : 'Готов к следующему раунду'}</Button>
        </div>
    )
}

export default Discussion