"use client"
import React, { useEffect, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { PlayerStats, PlayerType } from '../../types/types';
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'

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
                <div className='flex flex-wrap gap-4 justify-center'>
                    {players.map((player, index) => {
                        return (
                            <PlayerCard key={`player${index}`} player={player} cardType={"opponent game card"} />
                        )
                    })}

                </div>
                <div className='flex flex-wrap gap-4 justify-center'>
                    {players.map((player, index) => {
                        let result: React.ReactNode[] = []
                        for (const key in player.playerStats) {
                            result.push(<div>{`${player.playerStats[key as PlayerStats].title}: ${player.playerStats[key as PlayerStats].value}`}</div>)
                        }
                        return <div key={`player${index}`}><h1>{player.name}</h1>{result}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Test