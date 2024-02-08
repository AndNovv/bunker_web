
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


type Stat<TTitle> = {
    key: PlayerStats,
    title: TTitle,
    value: number,
}

export type PlayerStatsType = {
    "Phisics": Stat<'Физическая форма'>,
    "Intelligence": Stat<'Интеллект'>,
    "Tech": Stat<'Техническая компетентность'>,
    "Psycho": Stat<'Психологическая устойчивотсь'>,
    "Social": Stat<'Социальность'>,
    "Food Consumption": Stat<'Потребление пищи'>,
    "Med Consumption": Stat<'Потребление медикаментов'>,
    "Med": Stat<'Навыки медицины'>,
}

export type PlayerType = {
    id: number,
    name: string,
    host: boolean,
    ready: boolean,
    votes: number,
    characteristics: PlayerCharachteristicsType,
    actionCards: ActionCardType[],
    revealedCount: number,
    eliminated: boolean,
    playerStats: PlayerStatsType,
}

export type charKeys = keyof PlayerCharachteristicsType

export type ActionTypes = 'pick' | 'no pick' | 'pick except yourself'

export type ActionCardType = {
    key: string,
    type: ActionTypes,
    char: charKeys,
    name: string,
    used: boolean,
}

// Stats Types

export type PlayerStats = 'Phisics' | 'Intelligence' | 'Tech' | 'Psycho' | 'Social' | 'Med' | 'Food Consumption' | 'Med Consumption'

export type StatEffectType = {
    stat: PlayerStats,
    value: number
}

export type BunkerStats = 'Med' | 'Safety' | 'Anxiety' | 'Food' | 'Food Consumption' | 'Tech' | 'Medicines' | 'Med Consumption'

export type BunkerStatEffectType = {
    stat: BunkerStats,
    value: number
}

export type Bagage = {
    name: string,
    effect: BunkerStatEffectType[]
}

type NamesOfBodyTypes = 'Худой' | 'Среднего телосложения' | 'Крепкий' | 'Атлетическое' | 'Полный' | 'Ожирение'

export type BodeType = {
    name: NamesOfBodyTypes,
    effect: StatEffectType[],
}

export type HealthConditionType = {
    name: string,                       // Название болезни, заболевания, состояния здоровья
    lethal: number,                     // Вероятность смерти с этим заболеванием (0 - не опасно, 1 - вероятность смерти очень велика)
    contagious: number,                 // Вероятность заразить окружающих (0 - нельзя заразить, 1 - заражение крайне вероятно)
    cureProbability: number,            // Вероятность вылечиться в ближайший месяц (0 - шансов нет, 1 - 100%)
    effect: StatEffectType[]            // Как болезнь влияет на статистику человека (физическую форму 'Physics', интеллект 'Intelligence', психологическая устойчивость 'Psycho')
}

export type Hobby = {
    name: string,
    effect: StatEffectType[]
}

export type InterestingFact = {
    name: string,
    effect: StatEffectType[]
}

export type Profession = {
    name: string,
    effect: StatEffectType[]
}

export type Trait = {
    name: string,
    effect: StatEffectType[]
}

export type PlayerCharachteristicsType = {
    name: Charachteristic<'Имя', string>,
    sex: Charachteristic<'Пол', 'Мужчина' | 'Женщина'>,
    age: Charachteristic<'Возраст', string>,
    bodyType: Charachteristic<'Телосложение', BodeType>,
    profession: Charachteristic<'Профессия', Profession>,
    hobby: Charachteristic<'Хобби', Hobby>,
    health: Charachteristic<'Здоровье', HealthConditionType>,
    interestingFact: Charachteristic<'Факт', InterestingFact>,
    bagage: Charachteristic<'Багаж', Bagage>,
    trait: Charachteristic<'Черта характера', Trait>,
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

export type useActionCardDataType = {
    pickedPlayerId: number | null
}