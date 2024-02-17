
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


export type DiseaseStatus = 'cured' | 'ill' | 'death' | 'epidemic'

export type CuredDiseaseInfo = {
    status: 'cured'
    playerId: number
    diseaseName: string
}

export type DeathDiseaseInfo = {
    status: 'death'
    playerId: number
}

export type EpidemicDiseaseInfo = {
    status: 'epidemic'
    playerId: number
    medConsumption: number
    diseaseName: string
}

export type PlayerDiseaseInfo = CuredDiseaseInfo | DeathDiseaseInfo | EpidemicDiseaseInfo

export type FinaleRoundStatistic = {
    // Не хватило еды
    // Закончились медикаменты
    // Сводка по болезням
    // Эпидемия
    // Система жизнеобеспечения сломана
    foodEnough: boolean
    medicinesEnough: boolean
    electricityWorks: boolean
    waterWorks: boolean
    airWorks: boolean
    diseasesInfo: PlayerDiseaseInfo[]

    responseData: {
        title: string
        consequenceTitle: string
        consequenceDescription: string
    }
    eventTargetPlayerId: number
}

export type FinaleType = {
    round: number
    maxRounds: number
    pickedEventId: number | null
    survivingPlayersId: number[]
    eliminatedPlayersId: number[]
    eventsIdList: number[]
    turn: 'Survivors' | 'Eliminated'
    eventTargetPlayerId: number
    prevRoundStatistics: FinaleRoundStatistic
}

export type GameType = {
    gamestatus: GameStatus,
    code: string,
    round: number,
    countOfReadyPlayers: number,
    players: PlayerType[],
    secondVotingOptions: number[],
    roundsFlow: number[],
    countOfNotEliminatedPlayers: number,
    bunkerStats: BunkerStatsType
    bunkerRelatives: BunkerRelatives,
    finale: FinaleType,
}


export type BunkerStat<TTitle> = {
    key: BunkerStats,
    title: TTitle,
    value: number,
}

export type BunkerStatsType = {
    "Med": BunkerStat<'Навыки медицины'>,
    "Safety": BunkerStat<'Безопасность'>,
    "Anxiety": BunkerStat<'Напряженность'>,
    "Food": BunkerStat<'Запасы еды'>,
    "Medicines": BunkerStat<'Запасы медикаментов'>,
    "Food Consumption": BunkerStat<'Потребление пищи'>,
    "Med Consumption": BunkerStat<'Потребление медикаментов'>,
    "Tech": BunkerStat<'Техническая компетентность'>,
    "Vent System": BunkerStat<'Система вентеляции'>,
    "Water Cleaning System": BunkerStat<'Система очистки воды'>,
    "Electricity System": BunkerStat<'Система электроснабжения'>,
}

type RelativeValue = 0 | 1 | 2 | 3 | 4

export type RelativeStat<TTitle> = {
    title: TTitle
    key: BunkerStats
    value: RelativeValue
    expected: number
    real: number
}

export type BunkerRelatives = {
    "Safety": RelativeStat<"Безопасность">,
    "Med": RelativeStat<"Медицинские навыки">,
    "Tech": RelativeStat<"Технические навыки">,
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

export type RelativePlayerStat = {
    key: PlayerStats
    value: RelativeValue
}

export type PlayerRelatives = {
    "Intelligence": RelativePlayerStat,
    "Social": RelativePlayerStat,
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
    relatives: PlayerRelatives,
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

export type BunkerStats = 'Med' | 'Safety' | 'Anxiety' | 'Food' | 'Food Consumption' | 'Tech' | 'Medicines' | 'Med Consumption' | 'Vent System' | 'Water Cleaning System' | 'Electricity System'

export type BunkerStatEffectType = {
    stat: BunkerStats,
    value: number
}

export type Bagage = {
    name: string,
    effect: BunkerStatEffectType[]
}

type NamesOfBodyTypes = 'Худой' | 'Среднего телосложения' | 'Крепкий' | 'Атлетическое' | 'Полный' | 'Ожирение'

export type BodyType = {
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
    bodyType: Charachteristic<'Телосложение', BodyType>,
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

// Events 

type SimpleConsequence = {
    type: 'Simple',
    title: string,
    descrition: string,
    probability: number,
    effect: EventEffect[]
}

type PlayerDependency = {
    type: 'Player'
    stat: PlayerStats
}
type BunkerDependency = {
    type: 'Bunker'
    stat: BunkerStats
}

type probabilityDependence = PlayerDependency | BunkerDependency

type ComplexConsequence = {
    type: 'Complex',
    title: string,
    descrition: string,
    probability: [number, number, number, number, number],
    probabilityDependence: probabilityDependence
    effect: EventEffect[]
}

export type Consequence = SimpleConsequence | ComplexConsequence

export type EventResponse = {
    title: string,
    consequences: Consequence[]
}

export type ComplexEvent = {
    type: 'Complex',
    title: string,
    description: string,
    responses: EventResponse[],

}

export type SimpleEvent = {
    type: 'Simple',
    title: string,
    description: string,
    effect: EventEffect[],
    responses: EventResponse[],
}

type EventEffect = {
    stat: BunkerStats,
    value: number,
} | {
    stat: 'Death',
    playerId: number
}

export type EventType = SimpleEvent | ComplexEvent
