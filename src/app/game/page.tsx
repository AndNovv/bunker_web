"use client"
import React, { useEffect } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { CardType, PlayerType } from '../../types/types';
import { redirect, useRouter } from 'next/navigation';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayersDisplayCards/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import NewRoundAlert from '@/components/NewRoundAlert';
import EliminatedPlayerCard from '@/components/PlayersDisplayCards/EliminatedPlayerCard';
import PlayerRevealingCard from '@/components/PlayersDisplayCards/PlayerRevealingCard';
import OpponentCard from '@/components/PlayersDisplayCards/OpponentCard';

const Game = () => {

    const { code, round, playerId, players, roundsFlow, updatePlayers, incrementRound } = useGameInfo((state) => {
        return {
            code: state.code,
            round: state.round,
            playerId: state.playerId,
            players: state.players,
            roundsFlow: state.roundsFlow,
            updatePlayers: state.updatePlayers,
            incrementRound: state.incrementRound,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const player = players[playerId]

    const router = useRouter()

    const goToTheNextStage = () => {
        if (roundsFlow[round - 1]) {
            router.push('/discussion')
        }
        else {
            incrementRound()
        }
    }

    useEffect(() => {
        socket.on("char_revealed_response", (players: PlayerType[]) => {
            updatePlayers(players)
        })
        socket.on("end_of_round_revealing", (players: PlayerType[]) => {
            updatePlayers(players)
            goToTheNextStage()
        })

        return () => {
            socket.off("char_revealed_response")
            socket.off("end_of_round_revealing")
        }
    }, [round])

    const eliminatedPlayerCards: React.ReactNode[] = []
    const inGamePlayerCards: React.ReactNode[] = []

    players.map((player, index) => {
        let cardType: CardType = player.id === playerId ? 'player game card' : 'opponent game card'
        if (player.eliminated) {
            eliminatedPlayerCards.push(<EliminatedPlayerCard key={`player${index}`} player={player} />)
        }
        else if (player.id !== playerId) {
            inGamePlayerCards.push(<OpponentCard key={`player${index}`} player={player} />)
        }
    })


    return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <NewRoundAlert round={round} />
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <h2 className='lg:text-2xl text-lg'>{`Раунд ${round}`}</h2>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-wrap gap-4 justify-center w-full'>
                {!players[playerId].eliminated && <PlayerRevealingCard player={players[playerId]} />}
                {inGamePlayerCards.map((el) => {
                    return (el)
                })}
                {eliminatedPlayerCards.map((el) => {
                    return (el)
                })}
            </div>
        </div>
    )
}

export default Game