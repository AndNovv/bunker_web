import { create } from 'zustand'

import { PlayerType } from '../types/types'

type GameInfoType = {
    code: string,
    name: string,
    playerId: number,
    players: PlayerType[],
    round: number,
    eliminated: boolean,
    countOfNotEliminatedPlayers: number,
    roundsFlow: number[],
    initialStart: (code: string, name: string, round: number, playerId: number, players: PlayerType[], eliminated: boolean, countOfNotEliminatedPlayers: number, roundsFlow: number[]) => void,
    addNewPlayer: (player: PlayerType) => void,
    updatePlayers: (players: PlayerType[]) => void,
    eliminatePlayer: (playerId: number) => void,
    incrementRound: () => void,
    updateRoundsFlow: (roundsFlow: number[]) => void,
}

export const useGameInfo = create<GameInfoType>((set) => {
    return {
        code: '',
        name: '',
        playerId: 0,
        players: [],
        round: 0,
        eliminated: false,
        countOfNotEliminatedPlayers: 0,
        roundsFlow: [],
        initialStart: (code: string, name: string, round: number, playerId: number, players: PlayerType[], eliminated: boolean, countOfNotEliminatedPlayers: number, roundsFlow: number[]) => set(() => ({ code, name, round, playerId, players, eliminated, countOfNotEliminatedPlayers, roundsFlow })),
        addNewPlayer: (player: PlayerType) => set((state) => {
            const newPlayers = state.players
            newPlayers.push(player)
            return {
                ...state,
                countOfNotEliminatedPlayers: state.countOfNotEliminatedPlayers + 1,
                players: newPlayers
            }
        }),
        updatePlayers: (players: PlayerType[]) => set((state) => {
            return {
                ...state,
                players,
            }
        }),
        eliminatePlayer: (playerId: number) => set((state) => {
            const newPlayers = state.players
            newPlayers[playerId].eliminated = true
            return {
                ...state,
                eliminated: playerId === state.playerId,
                countOfNotEliminatedPlayers: state.countOfNotEliminatedPlayers - 1,
                players: newPlayers,
            }
        }),
        incrementRound: () => set((state) => {
            return {
                ...state,
                round: state.round + 1
            }
        }),
        updateRoundsFlow: (roundsFlow: number[]) => set((state) => {
            return {
                ...state,
                roundsFlow
            }
        })
    }
})
