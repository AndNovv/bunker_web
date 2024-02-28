"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

import { socket } from '@/socket'
import { useGameInfo } from '@/hooks/useGameInfo'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { responseType, PlayerType, JoinDataResponse } from '@/types/types'
import usePlayerAndCodeSessionStorage from '@/hooks/usePlayerAndCodeSessionStorage'
import CodeInput from './CodeInput'


const JoinGame: React.FC = () => {

    const router = useRouter();
    const { toast } = useToast()

    const [sessionPlayerName, sessionCode] = usePlayerAndCodeSessionStorage()

    const codeInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const createNameInput = useRef<HTMLInputElement>(null)

    const [joinOrCreateInProgress, setJoinOrCreateInProgress] = useState(false)


    const setGameInfo = useGameInfo((state) => state.initialStart)


    useEffect(() => {
        socket.on("create_game_response", (response: responseType<{ code: string, name: string, players: PlayerType[] }>) => {
            window.sessionStorage.setItem("playerName", response.data.name)
            window.sessionStorage.setItem("code", response.data.code)
            setGameInfo(response.data.code, response.data.name, 1, 0, response.data.players, false, 1, [], null, null, null)
            router.push('/waiting')
        })

        socket.on("join_game_response", (response: responseType<JoinDataResponse>) => {
            if (response.status === 'success') {
                window.sessionStorage.setItem("playerName", response.data.name)
                window.sessionStorage.setItem("code", response.data.game.code)
                setGameInfo(response.data.game.code,
                    response.data.name,
                    response.data.game.round,
                    response.data.playerId,
                    response.data.game.players,
                    response.data.game.players[response.data.playerId].eliminated,
                    response.data.game.countOfNotEliminatedPlayers,
                    response.data.game.roundsFlow,
                    response.data.game.bunkerStats,
                    response.data.game.finale,
                    response.data.game.bunkerRelatives)

                if (response.data.game.gamestatus === 'waiting') {
                    router.push(`/waiting`)
                }
                else if (response.data.game.gamestatus === 'preparing') {
                    router.push(`/preparation?ready=${response.data.game.countOfReadyPlayers}`)
                }
                else if (response.data.game.gamestatus === 'revealing') {
                    router.push(`/game`)
                }
                else if (response.data.game.gamestatus === 'discussion') {
                    router.push(`/discussion?ready=${response.data.game.countOfReadyPlayers}`)
                }
                else if (response.data.game.gamestatus === 'voting') {
                    router.push(`/voting?ready=${response.data.game.countOfReadyPlayers}`)
                }
                else if (response.data.game.gamestatus === 'second voting') {
                    const optionsString = JSON.stringify(response.data.game.secondVotingOptions);
                    router.push(`/voting?second_voting=true&options=${encodeURIComponent(optionsString)}&ready=${response.data.game.countOfReadyPlayers}`)
                }
                else if (response.data.game.gamestatus === 'results') {
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


    return (
        <div className='flex flex-col gap-5 items-center'>
            <form onSubmit={joinGame} className='flex gap-6 bg-background items-center flex-col border py-8 px-6 rounded-xl shadow-md shadow-accent'>
                <div className='flex gap-4 flex-col'>
                    <CodeInput code={sessionCode} codeInput={codeInput} />
                    <Input defaultValue={sessionPlayerName} placeholder='Ваше имя' ref={nameInput}></Input>
                </div>
                <Button variant={'outline'} disabled={joinOrCreateInProgress} type='submit'>Присоединиться</Button>
            </form>
            <p className='bg-background px-4 py-2 rounded-full outline-accent outline shadow-md shadow-accent'>или</p>
            <form onSubmit={createGame} className='flex gap-6 bg-background items-center flex-col border py-8 px-6 rounded-xl shadow-md shadow-accent'>
                <Input defaultValue={sessionPlayerName} placeholder='Ваше имя' ref={createNameInput}></Input>
                <Button variant={'outline'} disabled={joinOrCreateInProgress} type='submit'>Создать новый бункер</Button>
            </form>
        </div >

    )
}

export default JoinGame