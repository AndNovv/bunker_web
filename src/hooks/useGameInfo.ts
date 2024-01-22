import { create } from 'zustand'

import { PlayerCharachteristicsType, PlayerType } from '../types/types'

type GameInfoType = {
    code: string,
    name: string,
    playerId: number,
    players: PlayerType[],
    round: number,
    initialStart: (code: string, name: string, round: number, playerId: number, players: PlayerType[]) => void,
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
        initialStart: (code: string, name: string, round: number, playerId: number, players: PlayerType[]) => set(() => ({ code, name, round, playerId, players })),
        addNewPlayer: (player: PlayerType) => set((state) => {
            const newPlayers = state.players
            newPlayers.push(player)
            return { players: newPlayers }
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
                players: newPlayers,
            }
        }),
        incrementRound: () => set((state) => {
            return {
                round: state.round + 1
            }
        })
    }
})
