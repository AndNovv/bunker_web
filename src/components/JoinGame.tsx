"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

import { socket } from '@/socket'
import { useGameInfo } from '@/hooks/useGameInfo'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { responseType, PlayerType, JoinDataResponse } from '@/types/types'


const JoinGame: React.FC = () => {

    const router = useRouter();
    const { toast } = useToast()

    const [codeValue, setCodeValue] = useState('');

    const codeInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const createNameInput = useRef<HTMLInputElement>(null)

    const [joinOrCreateInProgress, setJoinOrCreateInProgress] = useState(false)

    const setGameInfo = useGameInfo((state) => state.initialStart)

    useEffect(() => {
        socket.on("create_game_response", (response: responseType<{ code: string, name: string, players: PlayerType[] }>) => {
            setGameInfo(response.data.code, response.data.name, 1, 0, response.data.players, false, 1)
            router.push('/waiting')
        })

        socket.on("join_game_response", (response: responseType<JoinDataResponse>) => {
            if (response.status === 'success') {
                setGameInfo(response.data.game.code, response.data.name, response.data.game.round, response.data.playerId, response.data.game.players, response.data.game.players[response.data.playerId].eliminated, response.data.game.countOfNotEliminatedPlayers)
                if (response.data.game.gamestatus === 'waiting') {
                    router.push(`/waiting`)
                }
                if (response.data.game.gamestatus === 'preparing') {
                    router.push(`/preparation?ready=${response.data.game.countOfReadyPlayers}`)
                }
                if (response.data.game.gamestatus === 'revealing') {
                    router.push(`/game`)
                }
                if (response.data.game.gamestatus === 'discussion') {
                    router.push(`/discussion?ready=${response.data.game.countOfReadyPlayers}`)
                }
                if (response.data.game.gamestatus === 'voting') {
                    router.push(`/voting?ready=${response.data.game.countOfReadyPlayers}`)
                }
                if (response.data.game.gamestatus === 'second voting') {
                    const optionsString = JSON.stringify(response.data.game.secondVotingOptions);
                    router.push(`/voting?second_voting=true&options=${encodeURIComponent(optionsString)}&ready=${response.data.game.countOfReadyPlayers}`)
                }
                if (response.data.game.gamestatus === 'results') {
                    router.push(`/final`)
                }
            }
            else {
                setJoinOrCreateInProgress(false)
                toast({
                    variant: "destructive",
                    title: response.message,
                    description: "Попробуй еще раз"
                })
                if (response.message == 'Неверный код') {
                    codeInput.current?.focus()
                }
                else {
                    nameInput.current?.focus()
                }
            }
        })

        return () => {
            socket.off("create_game_response")
            socket.off("join_game_response")
        }

    }, [])

    const createGame = (e: React.FormEvent) => {
        e.preventDefault()
        const name = createNameInput.current?.value
        if (name) {
            setJoinOrCreateInProgress(true)
            socket.emit("create_game", name)
        }
        else {
            toast({
                variant: "destructive",
                title: "Введите имя",
            })
            createNameInput.current?.focus()
        }
    }

    const joinGame = (e: React.FormEvent) => {
        e.preventDefault()
        const code = codeInput.current?.value
        const name = nameInput.current?.value
        if (code && name) {
            setJoinOrCreateInProgress(true)
            socket.emit("join_game", code, name)
        }
        else {
            if (!code) {
                toast({
                    variant: "destructive",
                    title: "Введите Код",
                })
                codeInput.current?.focus()
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Введите имя",
                })
                nameInput.current?.focus()
            }
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uppercaseValue = event.target.value.toUpperCase();
        setCodeValue(uppercaseValue);
    };


    return (
        <div className='flex flex-col gap-5 items-center'>
            <form onSubmit={joinGame} className='flex gap-4 items-center flex-col border p-8 rounded-xl'>
                <Input value={codeValue} onChange={handleInputChange} placeholder='Код комнаты' ref={codeInput}></Input>
                <Input placeholder='Ваше имя' ref={nameInput}></Input>
                <Button disabled={joinOrCreateInProgress} type='submit'>Присоединиться</Button>
            </form>
            <p>или</p>
            <form onSubmit={createGame} className='flex gap-4 items-center flex-col border p-8 rounded-xl'>
                <Input placeholder='Ваше имя' ref={createNameInput}></Input>
                <Button disabled={joinOrCreateInProgress} type='submit'>Создать новый бункер</Button>
            </form>
        </div >
    )
}

export default JoinGame