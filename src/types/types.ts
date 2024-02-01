
export type responseType<TData> = {
    status: 'success' | 'error',
    data: TData,
    message: string
}

export type JoinDataResponse = {
    name: string,
    playerId: number,
    game: GameType,
}

export type GameStatus = 'waiting' | 'preparing' | 'revealing' | 'discussion' | 'voting' | 'second voting' | 'results'

export type GameType = {
    gamestatus: GameStatus,
    code: string,
    round: number,
    countOfReadyPlayers: number,
    players: PlayerType[],
    secondVotingOptions: number[],
    roundsFlow: number[],
    countOfNotEliminatedPlayers: number,
}

export type PlayerType = {
    id: number,
    name: string,
    host: boolean,
    ready: boolean,
    votes: number,
    characteristics: PlayerCharachteristicsType,
    actionCard1: ActionCardType,
    actionCard2: ActionCardType,
    revealedCount: number,
    eliminated: boolean,
}

export type charKeys = keyof PlayerCharachteristicsType

export type ActionCardType = {
    key: string,
    char: charKeys,
    name: string,
    used: boolean,
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

export type VotingResultsType = {
    playerId: number,
    votes: number,
}[]

export type CardType = 'preparation card' | 'player game card' | 'opponent game card' | 'eliminated card'
