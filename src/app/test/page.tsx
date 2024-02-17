"use client"
import React, { useEffect, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { BunkerRelatives, BunkerStatsType, FinaleType, GameType } from '../../types/types';
import { ModeToggle } from '@/components/ModeToggle'
import BunkerState from '@/components/BunkerState';
import { Events } from '@/data/data';
import { useToast } from '@/components/ui/use-toast';
import FinaleNewRoundInfoAlert from '@/components/FinaleNewRoundInfoAlert';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import PickEventDisplay from '@/components/PickEventDisplay';
import PickResponseDisplay from '@/components/PickResponseDisplay';

const Test = () => {


    const { players, updatePlayers } = useGameInfo((state) => {
        return {
            players: state.players,
            updatePlayers: state.updatePlayers,
        }
    })

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
        socket.on("test_get_players", (game: GameType) => {
            updatePlayers(game.players)
            setBunkerStats(game.bunkerStats)
            setCode(game.code)
            setBunkerRelatives(game.bunkerRelatives)
            setFinaleInfo(game.finale)
            socket.emit("get_events_to_pick", code)
        })

        socket.on("get_events_to_pick_response", (finaleInfo: FinaleType) => {
            setFinaleInfo(finaleInfo)
        })

        socket.on("event_picked", ({ finaleInfo, bunkerStats }: { finaleInfo: FinaleType, bunkerStats: BunkerStatsType }) => {
            setFinaleInfo(finaleInfo)
            setBunkerStats(bunkerStats)
            if (typeof finaleInfo.pickedEventId === 'number' && Events[finaleInfo.pickedEventId].type === 'Simple') {
                toast({
                    title: finaleInfo.prevRoundStatistics.responseData.title,
                    description: finaleInfo.prevRoundStatistics.responseData.consequenceDescription

                })
            }
        })

        socket.on("pick_response_response", (game: GameType) => {
            setFinaleInfo(game.finale)
            updatePlayers(game.players)
            setBunkerStats(game.bunkerStats)
            setBunkerRelatives(game.bunkerRelatives)
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

    const startGame = () => {
        socket.emit("test_game")
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
                <Button onClick={startGame}>Перезапуск</Button>
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>

                <div className='flex flex-row gap-1 flex-wrap justify-center'>
                    {finaleInfo && finaleInfo.survivingPlayersId.map((playerId, index) => {
                        const player = players[playerId]
                        return (
                            <PlayerCard key={`player${index}`} player={player} cardType='opponent game card' />
                        )
                    })}
                </div>


                {prevRoundStatistics && <FinaleNewRoundInfoAlert display={showRoundInfoAlert} hideFunction={() => { setShowRoundInfoAlert(false) }} finale={finaleInfo} />}

                <div className='flex flex-col md:flex-row mg:gap-10 gap-4 justify-center items-center w-full'>

                    <div className='md:w-1/2 flex justify-center'>
                        {bunkerStats && bunkerRelatives && <BunkerState bunkerStats={bunkerStats} bunkerRelatives={bunkerRelatives} />}
                    </div>

                    <div className='md:w-1/2'>
                        {turn === 'Eliminated' && eventIds &&
                            <PickEventDisplay eventIds={eventIds} handleChooseEventClick={handleChooseEventClick} playerName={players[finaleInfo.eventTargetPlayerId].name} />
                        }

                        {turn === 'Survivors' && pickedEvent && finaleInfo &&
                            <PickResponseDisplay event={pickedEvent} handleChooseResponseClick={handleChooseResponseClick} medicines={bunkerStats?.Medicines.value ? bunkerStats?.Medicines.value : 0} playerName={players[finaleInfo.eventTargetPlayerId].name} />
                        }
                    </div>


                </div>


            </div>
        </div>
    )
}

export default Test