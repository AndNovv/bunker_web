
export const minPlayers = 6
export const maxPLayers = 16


// type RoundsData = number[]

const RoundsData = {
    2: [0, 1, 1, 0, 0, 0, 0],
    4: [0, 1, 1, 0, 0, 0, 0],
    6: [0, 0, 0, 0, 1, 1, 1],
    7: [0, 0, 0, 1, 1, 1, 1],
    8: [0, 0, 0, 1, 1, 1, 1],
    9: [0, 0, 1, 1, 1, 1, 1],
    10: [0, 0, 1, 1, 1, 1, 1],
    11: [0, 1, 1, 1, 1, 1, 1],
    12: [0, 1, 1, 1, 1, 1, 1],
    13: [0, 1, 1, 1, 1, 1, 2],
    14: [0, 1, 1, 1, 1, 1, 2],
    15: [0, 1, 1, 1, 1, 2, 2],
    16: [0, 1, 1, 1, 1, 2, 2],
}

export const GameFlow = new Map(Object.entries(RoundsData))
