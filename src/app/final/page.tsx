"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { toast, useToast } from "@/components/ui/use-toast"
import { socket } from '@/socket'
import { BunkerRelatives, BunkerStatsType, CardType, FinaleType, GameType } from '../../types/types';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import PlayerCard from '@/components/PlayerCard'
import { ModeToggle } from '@/components/ModeToggle'
import PickResponseDisplay from '@/components/PickResponseDisplay'
import PickEventDisplay from '@/components/PickEventDisplay'
import FinaleNewRoundInfoAlert from '@/components/FinaleNewRoundInfoAlert'
import { calculateMaxAnxietyLevel } from '@/lib/utils'
import { Events } from '@/data/data'
import BunkerState from '@/components/BunkerState'

const Final = () => {

    const { code, playerId, players, updatePlayers, finale, setFinale, bunkerStats, setBunkerStats } = useGameInfo((state) => {
        return {
            code: state.code,
            playerId: state.playerId,
            players: state.players,
            updatePlayers: state.updatePlayers,
            finale: state.finale,
            setFinale: state.setFinale,
            bunkerStats: state.bunkerStats,
            setBunkerStats: state.setBunkerStats,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const router = useRouter()

    const [bunkerRelatives, setBunkerRelatives] = useState<BunkerRelatives>()

    const [open, setOpen] = useState(false)

    const round = finale?.round
    const maxAnxietyLevel = calculateMaxAnxietyLevel(players.length)

    const checkForEndOfTheGame = () => {
        if (bunkerStats && bunkerStats.Anxiety.value >= maxAnxietyLevel) {
            router.push('/gameresults?reason=Напряженность в бункере поднялась до предела')
        }
        else if (finale && finale.survivingPlayersId.length === 0) {
            router.push('/gameresults?reason=Все выжившие погибли')
        }
        else if (finale && finale.round >= finale.maxRounds - 1) {
            router.push('/gameresults?reason=Выжившие смогли пережить 10 месяцев в бункере')
        }
    }

    const turn = finale?.turn
    const eventIds = finale?.eventsIdList
    const pickedEventId = finale?.pickedEventId
    const pickedEvent = typeof pickedEventId === 'number' ? Events[pickedEventId] : null

    const survivingPlayerTurnId = finale?.survivingPlayerTurnId
    const eliminatedPlayerTurnId = finale?.eliminatedPlayerTurnId

    const prevRoundStatistics = finale?.prevRoundStatistics

    const [showRoundInfoAlert, setShowRoundInfoAlert] = useState(false)


    useEffect(() => {
        if (turn === 'Eliminated' && round !== 1) {
            setShowRoundInfoAlert(true)
        }
    }, [turn, round])

    useEffect(() => {
        socket.emit('initialize_finale', { code })
    }, [])

    useEffect(() => {
        socket.on('initialize_finale_response', (game: GameType) => {
            console.log('init')
            console.log(game)
            setBunkerStats(game.bunkerStats)
            setBunkerRelatives(game.bunkerRelatives)
            setFinale(game.finale)
            setOpen(true)
        })

        socket.on("event_picked", ({ finale, bunkerStats }: { finale: FinaleType, bunkerStats: BunkerStatsType }) => {
            setFinale(finale)
            setBunkerStats(bunkerStats)
            if (typeof finale.pickedEventId === 'number' && Events[finale.pickedEventId].type === 'Simple') {
                toast({
                    title: finale.prevRoundStatistics.responseData.title,
                    description: finale.prevRoundStatistics.responseData.consequenceDescription
                })
            }
            setOpen(true)
        })

        socket.on("pick_response_response", (game: GameType) => {
            setOpen(false)
            setFinale(game.finale)
            updatePlayers(game.players)
            setBunkerStats(game.bunkerStats)
            setBunkerRelatives(game.bunkerRelatives)
            checkForEndOfTheGame()
        })

        return () => {
            socket.off("initialize_finale_response")
            socket.off("event_picked")
            socket.off("pick_response_response")
        }
    }, [eventIds, pickedEvent, pickedEventId, updatePlayers, code, toast, setFinale, setBunkerStats])

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
                {finale?.round && finale.maxRounds && (
                    <>
                        <h2>{`Текущий месяц: ${finale?.round}`}</h2>
                        <h2>{`Осталось прожить: ${finale?.maxRounds - finale?.round}`}</h2>
                    </>
                )}
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>

                <div className='flex flex-row gap-1 flex-wrap justify-center'>
                    {finale && finale.survivingPlayersId.map((playerId, index) => {
                        const player = players[playerId]
                        return (
                            <PlayerCard key={`player${index}`} player={player} cardType='opponent game card' />
                        )
                    })}
                </div>

                <div>
                    <h2>{`Ход ${turn === 'Eliminated' ? 'Изганных' : 'Выживших'}`}</h2>
                    {turn === 'Eliminated' && typeof eliminatedPlayerTurnId === 'number' && <p>{`Ход игрока: ${players[eliminatedPlayerTurnId].name}`}</p>}
                    {turn === 'Survivors' && typeof survivingPlayerTurnId === 'number' && <p>{`Ход игрока: ${players[survivingPlayerTurnId].name}`}</p>}
                </div>


                {prevRoundStatistics && <FinaleNewRoundInfoAlert display={showRoundInfoAlert} hideFunction={() => { setShowRoundInfoAlert(false); setOpen(true) }} finale={finale} />}

                <div className='flex flex-col md:flex-row mg:gap-10 gap-4 justify-center items-center w-full'>

                    <div className='md:w-1/2 flex justify-center'>
                        {bunkerStats && bunkerRelatives && <BunkerState bunkerStats={bunkerStats} bunkerRelatives={bunkerRelatives} />}
                    </div>

                    <div className='md:w-1/2'>
                        {turn === 'Eliminated' && eventIds &&
                            <PickEventDisplay eventIds={eventIds} handleChooseEventClick={handleChooseEventClick} playerName={players[finale.eventTargetPlayerId].name} open={open} />
                        }

                        {turn === 'Survivors' && pickedEvent && finale &&
                            <PickResponseDisplay event={pickedEvent} handleChooseResponseClick={handleChooseResponseClick} medicines={bunkerStats?.Medicines.value ? bunkerStats?.Medicines.value : 0} playerName={players[finale.eventTargetPlayerId].name} open={open} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Final