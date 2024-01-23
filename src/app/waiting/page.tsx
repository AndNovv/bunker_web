"use client"
import React, { useEffect } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { socket } from '@/socket'
import { GameType, PlayerType } from '../../types/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { redirect } from 'next/navigation'
import CopyCodeBadge from '@/components/CopyCodeBadge'
import { ModeToggle } from '@/components/ModeToggle'


const Waiting = () => {

    const { code, name, players, playerId, addNewPlayer, initialStart } = useGameInfo((state) => {
        return {
            code: state.code,
            name: state.name,
            players: state.players,
            playerId: state.playerId,
            addNewPlayer: state.addNewPlayer,
            initialStart: state.initialStart,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const isHost = players[playerId].host
    const minPlayers = 2

    const router = useRouter()

    useEffect(() => {

        socket.on("player_connected", (player: PlayerType) => addNewPlayer(player))

        socket.on("start_game_response", (game: GameType) => {
            router.push('/preparation')
        })

        return () => {
            socket.off("player_connected")
            socket.off("start_game_response")
        }

    }, [])

    const startGame = () => {
        socket.emit("start_game", code)
    }

    return (
        <div className='flex flex-col gap-10 px-10 py-10'>
            <div className='flex justify-between items-center'>
                <ModeToggle />
                <p>{`Ваш ID: ${playerId}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex gap-5 flex-wrap justify-center'>
                {players.map((player, index) => {
                    return (
                        <Card key={`player${index}`} className="w-[350px]">
                            <CardHeader>
                                <CardTitle>{player.name}</CardTitle>
                                <CardDescription>{player.host ? 'Хост' : 'Игрок'}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Информация о игроке
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                Футер
                            </CardFooter>
                        </Card>
                    )
                }
                )}
            </div>
            {isHost && <Button className='max-w-fit self-end' disabled={players.length < minPlayers} onClick={startGame}>Начать</Button>}
        </div >
    )
}

export default Waiting