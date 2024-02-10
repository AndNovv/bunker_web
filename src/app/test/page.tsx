"use client"
import React, { useEffect, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { BunkerRelatives, BunkerStatsType, EventType, GameType, PlayerStats, PlayerType } from '../../types/types';
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import BunkerState from '@/components/BunkerState';
import { Events } from '@/data/data';
import { useToast } from '@/components/ui/use-toast';

const Test = () => {

    const [players, setPlayers] = useState<PlayerType[]>([])
    const [bunkerStats, setBunkerStats] = useState<BunkerStatsType>()
    const [bunkerRelatives, setBunkerRelatives] = useState<BunkerRelatives>()

    const [code, setCode] = useState('')

    const [eventIds, setEventIds] = useState<number[]>([])
    const [pickedEventId, setPickedEventId] = useState(() => { return -1 })

    const pickedEvent = pickedEventId !== -1 ? Events[pickedEventId] : null


    const { toast } = useToast()

    useEffect(() => {
        socket.emit("test_game")
    }, [])

    useEffect(() => {
        socket.on("test_get_players", (game: GameType) => {
            setPlayers(game.players)
            setBunkerStats(game.bunkerStats)
            setCode(game.code)
            setBunkerRelatives(game.bunkerRelatives)
            socket.emit("get_events_to_pick")
        })

        socket.on("get_events_to_pick_response", (events: number[]) => {
            setEventIds(events)
        })

        socket.on("event_picked", (eventId: number) => {
            setPickedEventId(eventId)
        })

        socket.on("pick_response_response", ({ consequenceId, responseId, bunkerStats, players }: { consequenceId: number, responseId: number, bunkerStats: BunkerStatsType, players: PlayerType[] }) => {
            setPlayers(players)
            setBunkerStats(bunkerStats)
            if (pickedEvent && pickedEvent.type === 'Complex') {
                toast({
                    title: `Выжившие выбрали '${pickedEvent.responses[responseId].title}'`,
                    description: `В результате '${pickedEvent.responses[responseId].consequences[consequenceId].title}\t${pickedEvent.responses[responseId].consequences[consequenceId].descrition}'`,
                    variant: 'default'
                })
            }
        })

        return () => {
            socket.off("test_get_players")
            socket.off("get_events_to_pick_response")
            socket.off("event_picked")
            socket.off("pick_response_response")
        }
    }, [eventIds, pickedEvent, pickedEventId])

    const handleChooseEventClick = (eventId: number) => {
        socket.emit("pick_event", { code, eventId })
    }

    const handleChooseResponseClick = (responseIndex: number) => {
        socket.emit("pick_response", { code, playerId: 0, pickedEventId, responseIndex })
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>
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
                        return <div className='border p-4 mt-3 w-[350px]' key={`player${index}`}><h1>{player.name}</h1>{result}</div>
                    })}
                </div>

                {bunkerStats && bunkerRelatives && <BunkerState bunkerStats={bunkerStats} bunkerRelatives={bunkerRelatives} />}

                {pickedEventId === -1 && eventIds &&
                    <div className='flex flex-col gap-4 justify-center mt-5'>
                        <h2 className='text-center'>Сделайте ваш выбор</h2>
                        {eventIds.map((eventId, index) => {
                            return (
                                <div onClick={() => handleChooseEventClick(eventId)} className='border p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer' key={`event${index}`}>
                                    <h2>{Events[eventId].title}</h2>
                                    <p className='text-muted-foreground'>{Events[eventId].description}</p>
                                </div>
                            )
                        })}
                    </div>
                }

                {pickedEvent &&
                    <div>
                        {pickedEvent.type === 'Complex' &&
                            <div className='flex flex-col gap-4 justify-center mt-5'>
                                <h2 className='text-center'>Сделайте ваш выбор</h2>
                                {pickedEvent.responses.map((response, index) => {
                                    return (
                                        <div onClick={() => handleChooseResponseClick(index)} className='border p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer' key={`event${index}`}>
                                            <h2>{response.title}</h2>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default Test