"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { BunkerRelatives, BunkerStatsType, Consequence, EventType, FinaleType, GameType, PlayerStats, PlayerType } from '../../types/types';
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import BunkerState from '@/components/BunkerState';
import { Events } from '@/data/data';
import { useToast } from '@/components/ui/use-toast';
import FinaleNewRoundInfoAlert from '@/components/FinaleNewRoundInfoAlert';

const Test = () => {

    const [players, setPlayers] = useState<PlayerType[]>([])
    const [bunkerStats, setBunkerStats] = useState<BunkerStatsType>()
    const [bunkerRelatives, setBunkerRelatives] = useState<BunkerRelatives>()


    const [finaleInfo, setFinaleInfo] = useState<FinaleType>()

    const round = finaleInfo?.round
    const turn = finaleInfo?.turn
    const eventIds = finaleInfo?.eventsIdList
    const pickedEventId = finaleInfo?.pickedEventId
    const pickedEvent = typeof pickedEventId === 'number' ? Events[pickedEventId] : null

    const prevRoundStatistics = finaleInfo?.prevRoundStatistics

    const [showRoundInfoAlert, setShowRoundInfoAlert] = useState(false)

    const [code, setCode] = useState('')

    const { toast } = useToast()

    useEffect(() => {
        if (turn === 'Eliminated' && round !== 1) {
            setShowRoundInfoAlert(true)
        }
    }, [turn, round])

    useEffect(() => {
        socket.emit("test_game")
    }, [])

    useEffect(() => {
        socket.on("test_get_players", (game: GameType) => {
            setPlayers(game.players)
            setBunkerStats(game.bunkerStats)
            setCode(game.code)
            setBunkerRelatives(game.bunkerRelatives)
            setFinaleInfo(game.finale)
            socket.emit("get_events_to_pick", code)
        })

        socket.on("get_events_to_pick_response", (finaleInfo: FinaleType) => {
            setFinaleInfo(finaleInfo)
        })

        socket.on("event_picked", ({ finaleInfo, bunkerStats, message }: { finaleInfo: FinaleType, bunkerStats: BunkerStatsType, message: string }) => {
            setFinaleInfo(finaleInfo)
            setBunkerStats(bunkerStats)
            if (message) {
                toast({
                    title: message
                })
            }
        })

        socket.on("pick_response_response", ({ finaleInfo, bunkerStats, players }: { finaleInfo: FinaleType, bunkerStats: BunkerStatsType, players: PlayerType[] }) => {
            setFinaleInfo(finaleInfo)
            setPlayers(players)
            setBunkerStats(bunkerStats)

            // const { title, consequenceTitle, consequenceDescription } = finaleInfo.prevRoundStatistics.responseData

            // toast({
            //     title: `Выжившие выбрали '${title}'`,
            //     description: `В результате '${consequenceTitle} (${consequenceDescription})'`,
            //     variant: 'default'
            // })

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
        socket.emit("pick_response", { code, playerId: 0, responseIndex })
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                {finaleInfo?.round && finaleInfo.maxRounds && (
                    <>
                        <h2>{`Текущий месяц: ${finaleInfo?.round}`}</h2>
                        <h2>{`Осталось прожить: ${finaleInfo?.maxRounds - finaleInfo?.round}`}</h2>
                    </>
                )}
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>


                {prevRoundStatistics && <FinaleNewRoundInfoAlert display={showRoundInfoAlert} hideFunction={() => { setShowRoundInfoAlert(false) }} roundStatistics={prevRoundStatistics} />}

                <div className='flex flex-col md:flex-row gap-10 justify-center items-center w-full'>

                    <div className='md:w-1/2 flex justify-center'>
                        {bunkerStats && bunkerRelatives && <BunkerState bunkerStats={bunkerStats} bunkerRelatives={bunkerRelatives} />}
                    </div>

                    <div className='md:w-1/2'>
                        {turn === 'Eliminated' && eventIds &&
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

                        {turn === 'Survivors' && pickedEvent &&
                            <div>
                                {<div className='flex flex-col gap-4 justify-center mt-5'>
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


            </div>
        </div>
    )
}

export default Test