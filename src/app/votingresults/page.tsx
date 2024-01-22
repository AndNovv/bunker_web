"use client"
import CopyCodeBadge from '@/components/CopyCodeBadge';
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGameInfo } from '@/hooks/useGameInfo';
import { VotingResultsType } from '@/types/types';
import { ChevronLeft } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const VotingResults = () => {

    const router = useRouter();
    const searchParams = useSearchParams()

    const { code, players } = useGameInfo((state) => {
        return {
            code: state.code,
            players: state.players,
        }
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/game')
        }, 10000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    if (code === '') redirect('/')

    let votingResults: VotingResultsType = []
    const eleminatedPlayerName = searchParams.get("eliminated")

    if (searchParams.has('results')) {
        const votingResultsString = searchParams.get("results")
        votingResults = votingResultsString ? JSON.parse(decodeURIComponent(votingResultsString)) : [];
    }
    else {
        router.back()
    }

    return (
        <div className='flex flex-col gap-4 justify-center items-center px-10 py-4'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <Button onClick={() => { router.push('/') }}>
                    <ChevronLeft />
                    На Главную
                </Button>
                <CopyCodeBadge code={code} />
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <h2 className='text-center text-lg'>Голосование окончено</h2>
                <h2 className='text-center text-lg'>{`По результатам голосования выбивает: ${eleminatedPlayerName}`}</h2>
                <div className='flex flex-col gap-5 w-full items-center mt-4'>
                    {votingResults.map((player, index) => {
                        return (
                            <div key={`player${index}`} className='flex flex-row justify-between items-center w-full'>
                                <h2 className='text-lg'>{players[player.playerId].name}</h2>
                                <Progress className='w-2/3' value={(player.votes / players.length) * 100} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default VotingResults