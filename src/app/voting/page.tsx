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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ModeToggle } from '@/components/ModeToggle'


const Voting = () => {

    const { code, playerId, players, updatePlayers } = useGameInfo((state) => {
        return {
            code: state.code,
            playerId: state.playerId,
            players: state.players,
            updatePlayers: state.updatePlayers,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const router = useRouter()

    const [vote, setVote] = useState(-1)
    const [voted, setVoted] = useState(false)
    const [readyCount, setReadyCount] = useState(0)

    useEffect(() => {
        socket.on("vote_response", (readyCount: number) => {
            setReadyCount(readyCount)
        })


        return () => {
            socket.off("vote_response")
        }
    }, [])

    const voteHandle = () => {
        setVoted(true)
        socket.emit('vote', { code, playerId, vote })
    }

    return (
        <div className='flex flex-col gap-4 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <Button onClick={() => { router.push('/') }}>
                    <ChevronLeft />
                    На Главную
                </Button>
                <p>{`Проголосовало: ${readyCount}/${players.length}`}</p>
                <p>{`Ваш ID: ${playerId}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Возраст</TableHead>
                        <TableHead>Профессия</TableHead>
                        <TableHead>Здоровье</TableHead>
                        <TableHead className="text-right">Фобия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {players.map((player, index) => (
                        <TableRow onClick={() => setVote(index)} className={vote === index ? 'bg-accent cursor-pointer hover:bg-accent' : 'cursor-pointer'} key={`playerinfo${index}`}>
                            <TableCell className="font-medium">{player.characteristics.name.value}</TableCell>
                            <TableCell>{player.characteristics.age.value}</TableCell>
                            <TableCell>{player.characteristics.profession.value}</TableCell>
                            <TableCell>{player.characteristics.health.value}</TableCell>
                            <TableCell className="text-right">{player.characteristics.phobia.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={voteHandle} disabled={vote === -1 || voted}>Голосовать</Button>
        </div>
    )
}

export default Voting