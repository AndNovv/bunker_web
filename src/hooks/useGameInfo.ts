import { create } from 'zustand'

import { BunkerRelatives, BunkerStatsType, FinaleType, PlayerType } from '../types/types'

type GameInfoType = {
    code: string,
    name: string,
    playerId: number,
    players: PlayerType[],
    round: number,
    eliminated: boolean,
    countOfNotEliminatedPlayers: number,

    roundsFlow: number[],
    updateRoundsFlow: (roundsFlow: number[]) => void,

    bunkerStats: BunkerStatsType | null
    setBunkerStats: (bunkerStats: BunkerStatsType) => void

    finale: FinaleType | null
    setFinale: (finale: FinaleType) => void

    bunkerRelatives: BunkerRelatives | null
    setBunkerRelatives: (bunkerRelatives: BunkerRelatives) => void

    initialStart: (code: string, name: string, round: number, playerId: number, players: PlayerType[], eliminated: boolean, countOfNotEliminatedPlayers: number, roundsFlow: number[], bunkerStats: BunkerStatsType | null, finale: FinaleType | null, bunkerRelatives: BunkerRelatives | null) => void,
    addNewPlayer: (player: PlayerType) => void,
    updatePlayers: (players: PlayerType[]) => void,
    eliminatePlayer: (playerId: number) => void,
    incrementRound: () => void,
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
        finale: null,
        setFinale: (finale: FinaleType) => set((state) => {
            return {
                ...state,
                finale
            }
        }),

        bunkerStats: null,
        setBunkerStats: (bunkerStats: BunkerStatsType) => set((state) => {
            return {
                ...state,
                bunkerStats
            }
        }),

        bunkerRelatives: null,
        setBunkerRelatives: (bunkerRelatives: BunkerRelatives) => set((state) => {
            return {
                ...state,
                bunkerRelatives
            }
        }),

        initialStart: (code: string, name: string, round: number, playerId: number, players: PlayerType[], eliminated: boolean, countOfNotEliminatedPlayers: number, roundsFlow: number[], bunkerStats: BunkerStatsType | null, finale: FinaleType | null, bunkerRelatives: BunkerRelatives | null) => set(() => ({ code, name, round, playerId, players, eliminated, countOfNotEliminatedPlayers, roundsFlow, bunkerStats, finale, bunkerRelatives })),
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
