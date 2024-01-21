
export type responseType<TData> = {
    status: 'success' | 'error',
    data: TData,
    message: string
}

export type joinDataResponse = {
    code: string,
    name: string,
    playerId: number,
    players: PlayerType[],
    gameStatus: 'waiting' | 'preparing'
}

export type GameStatus = 'waiting' | 'preparing' | 'in game' | 'voting' | 'results'

export type GameType = {
    gamestatus: GameStatus,
    code: string,
    countOfReadyPlayers: number,
    players: PlayerType[],
}

export type PlayerType = {
    id: number,
    name: string,
    host: boolean,
    ready: boolean,
    votes: number,
    characteristics: PlayerCharachteristicsType
}

export type PlayerCharachteristicsType = {
    name: Charachteristic<'Имя', string>,
    sex: Charachteristic<'Пол', 'Мужчина' | 'Женщина'>,
    age: Charachteristic<'Возраст', string>,
    profession: Charachteristic<'Профессия', string>,
    hobby: Charachteristic<'Хобби', string>,
    phobia: Charachteristic<'Фобия', string>,
    health: Charachteristic<'Здоровье', string>,
    interestingFact: Charachteristic<'Факт', string>,
}

export type Charachteristic<TTitle, Tvalue> = {
    key: keyof PlayerCharachteristicsType,
    title: TTitle,
    value: Tvalue,
    hidden: boolean
}

export type CardType = 'preparation card' | 'player game card' | 'opponent game card'
