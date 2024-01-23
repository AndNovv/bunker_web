"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { CardType } from '../../types/types';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'

const Final = () => {

    const { code, name, round, playerId, players, eliminated, countOfNotEliminatedPlayers, updatePlayers, incrementRound } = useGameInfo((state) => {
        return {
            code: state.code,
            name: state.name,
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

    const router = useRouter()

    useEffect(() => {

        socket.emit("get_results")

        socket.on("get_results_response", () => {
            console.log("Результаты")
        })

        return () => {
            socket.off("get_results_response")
        }
    }, [])

    return (
        <div className='flex flex-col gap-2 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <p>{`Финал`}</p>
                <p>{`Ваш ID: ${playerId}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-center text-xl'>Время для подведения результатов</p>
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

export default Final