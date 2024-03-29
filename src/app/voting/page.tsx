"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGameInfo } from '../../hooks/useGameInfo'

import { socket } from '@/socket'
import { VotingResultsType } from '../../types/types';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CopyCodeBadge from '@/components/CopyCodeBadge'
import { useSearchParams } from 'next/navigation'
import { ModeToggle } from '@/components/ModeToggle'
import { useToast } from '@/components/ui/use-toast';
import PlayerCardForVoting from '@/components/PlayersDisplayCards/PlayerCardForVoting';


const Voting = () => {

    const { code, playerId, players, eliminated, countOfNotEliminatedPlayers, eliminatePlayer, incrementRound } = useGameInfo((state) => {
        return {
            code: state.code,
            playerId: state.playerId,
            players: state.players,
            eliminated: state.eliminated,
            countOfNotEliminatedPlayers: state.countOfNotEliminatedPlayers,
            eliminatePlayer: state.eliminatePlayer,
            incrementRound: state.incrementRound,
        }
    })

    // Проверку нужно исправить
    if (code === '') redirect('/')

    const router = useRouter()
    const { toast } = useToast()

    const searchParams = useSearchParams()
    const secondVoting = searchParams.get("second_voting") === 'true' ? true : false

    const secondVotingOptionsString = searchParams.get("options")
    const secondVotingOptionsParam = secondVotingOptionsString ? JSON.parse(decodeURIComponent(secondVotingOptionsString)) : [];
    const [secondVote, setSecondVote] = useState(secondVoting)
    const [secondVotingOptions, setSecondVotingOptions] = useState<number[]>(secondVotingOptionsParam)

    const [vote, setVote] = useState(-1)
    const [voted, setVoted] = useState(false)

    const readyInit = Number(searchParams.get("ready"))

    const [readyCount, setReadyCount] = useState(readyInit)

    useEffect(() => {
        socket.on("vote_response", (readyCount: number) => {
            setReadyCount(readyCount)
        })

        socket.on("end_of_voting", ({ votingResults, eliminatedPlayerId }: { votingResults: VotingResultsType, eliminatedPlayerId: number }) => {
            console.log(votingResults)
            console.log(eliminatedPlayerId)
            eliminatePlayer(eliminatedPlayerId)
            incrementRound()
            const votingString = JSON.stringify(votingResults);
            router.push(`/votingresults?results=${encodeURIComponent(votingString)}&eliminated=${players[eliminatedPlayerId].name}`)
        })

        socket.on("second_voting", (votingResults: number[]) => {
            setVote(-1)
            setReadyCount(0)
            setVoted(false)
            setSecondVote(true)
            setSecondVotingOptions(votingResults)
        })

        return () => {
            socket.off("vote_response")
            socket.off("end_of_voting")
            socket.off("second_voting")
        }
    }, [])

    const voteHandle = () => {
        if (!eliminated) {
            setVoted(true)
            socket.emit('vote', { code, playerId, vote })
        }
        else {
            toast({
                title: 'Вас уже выгнали('
            })
        }
    }

    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='flex justify-between items-center w-full'>
                <ModeToggle />
                <p>{`Проголосовало: ${readyCount}/${countOfNotEliminatedPlayers}`}</p>
                <CopyCodeBadge code={code} />
            </div>
            {secondVote && <h2 className='text-center text-xl'>{`Голоса разделились между ${secondVotingOptions.length} игроками. Попробуйте обсудить ваше решение еще раз, если вы снова не сможете договориться, игру покинет случайный кандидат!`}</h2>}

            <div className='flex flex-row flex-wrap gap-5 justify-center w-full'>
                {!secondVote && players.map((player, index) => {
                    if (!player.eliminated) {
                        return (
                            <PlayerCardForVoting onClick={() => setVote(player.id)} key={`playerCard${index}`} player={player} selected={vote === player.id} />
                        )
                    }
                }
                )}
                {secondVote && secondVotingOptions.map((id, index) => {
                    if (!players[id].eliminated) {
                        return (
                            <PlayerCardForVoting onClick={() => setVote(id)} key={`playerCard${index}`} player={players[id]} selected={vote === id} />
                        )
                    }
                })}

            </div>

            <Button onClick={voteHandle} disabled={vote === -1 || voted || eliminated}>Голосовать</Button>
        </div>
    )
}

export default Voting