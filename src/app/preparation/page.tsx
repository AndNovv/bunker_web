"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { PlayerType } from '../../types/types';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react'
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import PreparationPlayerCard from '@/components/PreparationPlayerCard'
import ActionCard from '@/components/ActionCard'


const Preparation = () => {

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

    const searchParams = useSearchParams()
    const readyInit = Number(searchParams.get("ready"))

    const [readyPlayers, setReadyPlayers] = useState(readyInit)
    const [ready, setReady] = useState(false)

    const player = players[playerId]
    const router = useRouter()
    const { toast } = useToast()

    const nameInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        socket.on("player_ready_response", () => {
            setReadyPlayers((prev) => prev + 1)
        })

        socket.on("all_players_ready", (players: PlayerType[]) => {
            updatePlayers(players)
            router.push('/game')
        })

        return () => {
            socket.off("player_ready_response")
            socket.off("all_players_ready")
        }
    }, [])

    const readyHandler = () => {
        const charachterName = nameInput.current?.value
        if (charachterName && charachterName !== '') {
            setReady(true)
            socket.emit("player_ready", { code, playerId, charachterName })
        }
        else {
            toast({
                title: 'Введите имя для вашего персонажа'
            })
            nameInput.current?.focus()
        }
    }

    return (
        <div className='flex flex-col gap-2 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <p>{`Ваш ID: ${playerId}`}</p>
                <p>{`Готовы к игре: ${readyPlayers}/${players.length}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <p className='text-center'>Познакомьтесь со своим персонажем и вашими картами</p>
            <PreparationPlayerCard nameInput={nameInput} player={player}></PreparationPlayerCard>
            <div className='mt-4'>
                <h1 className='text-2xl text-center'>Ваши карточки действий</h1>
                <div className='flex gap-4 mt-2'>
                    <ActionCard actionData={players[playerId].actionCard1} />
                    <ActionCard actionData={players[playerId].actionCard2} />
                </div>
            </div>
            <Button disabled={ready} onClick={readyHandler}>{ready ? 'Вы готовы' : 'Готов'}</Button>
        </div>
    )
}

export default Preparation