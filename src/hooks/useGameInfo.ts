import { create } from 'zustand'

import { PlayerCharachteristicsType, PlayerType } from '../types/types'

type GameInfoType = {
    code: string,
    name: string,
    playerId: number,
    players: PlayerType[],
    initialStart: (code: string, name: string, playerId: number, players: PlayerType[]) => void,
    addNewPlayer: (player: PlayerType) => void,
    updatePlayers: (players: PlayerType[]) => void,
}

export const useGameInfo = create<GameInfoType>((set) => {
    return {
        code: '',
        name: '',
        playerId: 0,
        players: [],
        initialStart: (code: string, name: string, playerId: number, players: PlayerType[]) => set(() => ({ code, name, playerId, players })),
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
    }
})
