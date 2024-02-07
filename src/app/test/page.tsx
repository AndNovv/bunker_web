"use client"
import React, { useEffect, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { CardType, PlayerType } from '../../types/types';
import { redirect, useRouter } from 'next/navigation';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import NewRoundAlert from '@/components/NewRoundAlert';

const Test = () => {

    const [players, setPlayers] = useState<PlayerType[]>([])

    useEffect(() => {
        socket.emit("test_game")
    }, [])

    useEffect(() => {
        socket.on("test_get_players", (players: PlayerType[]) => {
            setPlayers(players)
        })

        return () => {
            socket.off("test_get_players")
        }
    }, [])


    return (
        <div className='flex flex-col gap-6 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
            </div>
            <div className='flex flex-col gap-4'>
                {/* <h2 className='text-center text-xl'>Каждый игрок должен по очереди раскрыть одну свою характеристику</h2>
                {shouldReveal && !eliminated && <h2 className='text-center text-xl'>Раскройте еще одну характеристику о себе</h2>} */}
                <div className='flex flex-wrap gap-4 justify-center'>
                    {players.map((player, index) => {
                        return (
                            <PlayerCard key={`player${index}`} nameInput={null} player={player} cardType={"opponent game card"} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Test