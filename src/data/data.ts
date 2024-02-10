import { EventType } from "@/types/types"

export const minPlayers = 6
export const maxPLayers = 16

export const socialAverage = 5
export const psychoAverage = 3
export const phisicsAverage = 5
export const intelligenceAverage = 6
export const techAverage = 3
export const foodConsumptionAverage = 7
export const medConsumptionAverage = 2
export const medAverage = 1

type RoundsData = number[]

const RoundsData = {
    2: [1, 0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0, 1],
    4: [0, 0, 0, 1, 0, 0, 1],
    5: [0, 0, 0, 1, 0, 0, 1],
    6: [0, 0, 0, 1, 0, 1, 1],
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

export const numberOfRounds = 7

export const GameFlow = new Map(Object.entries(RoundsData))

export const Events: readonly EventType[] = [

    // Simple Events
    {
        type: 'Simple',
        title: 'Часть продовольствия испортилась из-за неправильного хранения',
        description: '-5 продовольствия',
        effect: [{ stat: 'Food', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Неисправность системы вентеляции',
        description: 'Прочность системы вентиляции -50%',
        effect: [{ stat: 'Vent System', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Неисправность системы очистки воды',
        description: 'Прочность системы очистки воды -50%',
        effect: [{ stat: 'Water Cleaning System', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Неисправность системы электроэнергии',
        description: 'Прочность системы электроэнергии -50%',
        effect: [{ stat: 'Electricity System', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Выжившие не смогли найти общий язык',
        description: '+1 к напряженности',
        effect: [{ stat: 'Anxiety', value: 1 }]
    },

    // Complex Events

    {
        type: 'Complex',
        title: 'Игрок заболел',
        description: 'Случайный игрок заболеет',
        responses: [
            {
                title: 'Само пройдет',
                consequences: [
                    {
                        type: 'Simple',
                        title: 'Игрок скончался после осложнений',
                        descrition: 'Само не прошло',
                        probability: 0.1,
                        effect: [{ stat: 'Death', playerId: 1 }],
                    },
                    {
                        type: 'Simple',
                        title: 'Болезнь оказалась не серьезной и быстро отступила',
                        descrition: 'В этот раз вам повезло',
                        probability: 0.3,
                        effect: [],
                    },
                    {
                        type: 'Simple',
                        title: 'Игрок тяжело перенес заболевание',
                        descrition: 'Могло быть и хуже. +2 к напряженности',
                        probability: 0.6,
                        effect: [{ stat: 'Anxiety', value: 2 }],
                    },
                ]
            },

            {
                title: 'Оказать простую медицинскую помощь',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Игрок тяжело перенес заболевание',
                        descrition: '-3 медикаментов и +2 к напряженности',
                        probability: [0.6, 0.5, 0.4, 0.3, 0.2],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Medicines', value: -3 }],
                    },
                    {
                        type: 'Complex',
                        title: 'Игрок быстро пошел на поправку',
                        descrition: '-3 медикаментов',
                        probability: [0.4, 0.5, 0.6, 0.7, 0.8],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Medicines', value: -3 }],
                    },

                ]
            },

            {
                title: 'Провести лучшее возможное медицинское лечение',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Игрок тяжело перенес заболевание',
                        descrition: '-5 медикаментов и +2 к напряженности',
                        probability: [0.5, 0.4, 0.3, 0.2, 0.1],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Medicines', value: -5 }],
                    },
                    {
                        type: 'Complex',
                        title: 'Игрок быстро пошел на поправку',
                        descrition: '-5 медикаментов',
                        probability: [0.5, 0.6, 0.7, 0.8, 0.9],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Medicines', value: -5 }],
                    },

                ]
            },
        ]
    },

    {
        title: 'Рейд на бункер',
        type: 'Complex',
        description: 'На бункер нападают выжившие',
        responses: [
            {
                title: 'Попробовать провести мирные переговоры',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Переговоры прошли успешно',
                        descrition: 'Напряженность -1',
                        probability: [0, 0.2, 0.4, 0.6, 0.7],
                        probabilityDependence: { type: 'Player', stat: 'Intelligence' },
                        effect: [{ stat: 'Anxiety', value: -1 }]
                    },
                    {
                        type: 'Complex',
                        title: 'Вас не стали слушать и обокрали',
                        descrition: 'Продовольствие -20; Медикаменты -10; Напряженность +2',
                        probability: [1, 0.8, 0.6, 0.4, 0.3],
                        probabilityDependence: { type: 'Player', stat: 'Intelligence' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Food', value: -20 }, { stat: 'Medicines', value: -10 }]
                    },
                ]
            },
            {
                title: 'Защищать бункер',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Вы смогли защитить свой бункер. Рейдеры отступили',
                        descrition: 'Напряженность -1',
                        probability: [0, 0.2, 0.4, 0.6, 0.7],
                        probabilityDependence: { type: 'Bunker', stat: 'Safety' },
                        effect: [{ stat: 'Anxiety', value: -1 }]
                    },
                    {
                        type: 'Complex',
                        title: 'Рейдеры оказались сильнее, вас ограбили',
                        descrition: 'Продовольствие -10; Медикаменты -5; Напряженность +2',
                        probability: [1, 0.8, 0.6, 0.4, 0.3],
                        probabilityDependence: { type: 'Bunker', stat: 'Safety' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Food', value: -10 }, { stat: 'Medicines', value: -5 }]
                    },
                ]
            },
        ]
    }
]