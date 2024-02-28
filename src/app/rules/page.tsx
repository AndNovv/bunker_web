"use client"
import BunkerState from '@/components/BunkerState/BunkerState';
import CopyCodeBadge from '@/components/CopyCodeBadge';
import PlayerCard from '@/components/PlayersDisplayCards/PlayerCard';
import { TracingBeam } from '@/components/ui/TracingBeam';
import { BunkerRelatives, BunkerStatsType, PlayerType } from '@/types/types';
import React from 'react'
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';

const examplePlayer: PlayerType = {
    id: 1,
    name: 'Игрок',
    host: true,
    ready: false,
    votes: 0,
    characteristics: {
        name: {
            key: 'name',
            title: 'Имя',
            value: 'Василий Иванов',
            hidden: true,
        },
        sex: {
            key: 'sex',
            title: 'Пол',
            value: 'Мужчина',
            hidden: true,
        },
        age: {
            key: 'age',
            title: 'Возраст',
            value: '58',
            hidden: true,
        },
        bodyType: {
            key: 'bodyType',
            title: 'Телосложение',
            value: {
                name: 'Атлетическое',
                effect: [
                    { stat: 'Phisics', value: 4 },
                    { stat: 'Food Consumption', value: 1 },
                ],
            },
            hidden: true,
        },
        profession: {
            key: 'profession',
            title: 'Профессия',
            value: { name: "Экскурсовод", effect: [{ stat: 'Social', value: 3 }, { stat: 'Intelligence', value: 1 }] },
            hidden: true,
        },
        health: {
            key: 'health',
            title: 'Здоровье',
            value: {
                name: 'Сахарный диабет',
                lethal: 0.05,
                contagious: 0,
                cureProbability: 0.05,
                effect: [
                    { stat: 'Phisics', value: -2 },
                    { stat: 'Intelligence', value: -1 },
                    { stat: 'Tech', value: -1 },
                    { stat: 'Psycho', value: -1 },
                    { stat: 'Med Consumption', value: 3 },
                ],
            },
            hidden: true,
        },
        trait: {
            key: 'trait',
            title: 'Черта характера',
            value: {
                name: 'Щедрость',
                effect: [
                    { stat: 'Med', value: 1 },
                    { stat: 'Social', value: 2 }
                ]
            },
            hidden: true,
        },
        hobby: {
            key: 'hobby',
            title: 'Хобби',
            value: { name: "Археология и раскопки", effect: [{ stat: 'Phisics', value: 1 }] },
            hidden: true,
        },
        interestingFact: {
            key: 'interestingFact',
            title: 'Факт',
            value: {
                name: "Провел неделю в полном молчании в монастыре, практикуя медитацию.",
                effect: [
                    { stat: 'Psycho', value: 3 }
                ]
            },
            hidden: true,
        },
        bagage: {
            key: 'bagage',
            title: 'Багаж',
            value: {
                name: 'Набор изоленты',
                effect: [
                    { stat: 'Tech', value: 1 },
                ],
            },
            hidden: true,
        }

    },
    actionCards: [],
    revealedCount: 0,
    eliminated: false,
    playerStats: {
        Phisics: {
            key: 'Phisics',
            title: 'Физическая форма',
            value: 3,
        },
        Intelligence: {
            key: 'Intelligence',
            title: 'Интеллект',
            value: 3,
        },
        Tech: {
            key: 'Tech',
            title: 'Техническая компетентность',
            value: 1
        },
        Psycho: {
            key: 'Psycho',
            title: 'Психологическая устойчивотсь',
            value: 3,
        },
        Social: {
            key: 'Social',
            title: 'Социальность',
            value: 3,
        },
        "Food Consumption": {
            key: 'Food Consumption',
            title: 'Потребление пищи',
            value: 6,
        },
        "Med Consumption": {
            key: 'Med Consumption',
            title: 'Потребление медикаментов',
            value: 0
        },
        Med: {
            key: 'Med',
            title: 'Навыки медицины',
            value: 0
        }
    },
    relatives: {
        "Intelligence": {
            key: 'Intelligence',
            value: 0
        },
        "Social": {
            key: 'Social',
            value: 0
        }
    }
}

const exampleBunkerStats: BunkerStatsType = {
    Med: {
        key: "Med",
        title: 'Навыки медицины',
        value: 0,
    },
    Food: {
        key: 'Food',
        title: 'Запасы еды',
        value: 53,
    },
    Anxiety: {
        key: 'Anxiety',
        title: 'Напряженность',
        value: 0
    },
    "Food Consumption": {
        key: 'Food Consumption',
        title: 'Потребление пищи',
        value: 4,
    },
    "Med Consumption": {
        key: 'Med Consumption',
        title: 'Потребление медикаментов',
        value: 2,
    },
    Tech: {
        key: 'Tech',
        title: 'Техническая компетентность',
        value: 0,
    },
    Safety: {
        key: 'Safety',
        title: 'Безопасность',
        value: 5,
    },
    Medicines: {
        key: 'Medicines',
        title: 'Запасы медикаментов',
        value: 10,
    },
    "Vent System": {
        key: 'Vent System',
        title: 'Система вентеляции',
        value: 2,
    },
    "Water Cleaning System": {
        key: 'Water Cleaning System',
        title: 'Система очистки воды',
        value: 10,
    },
    "Electricity System": {
        key: 'Electricity System',
        title: 'Система электроснабжения',
        value: 6,
    }
}
const exampleBunkerRelatives: BunkerRelatives = {
    'Med': {
        title: 'Медицинские навыки',
        key: 'Med',
        value: 1,
        expected: 0,
        real: 0,
    },
    'Tech': {
        title: 'Технические навыки',
        key: 'Tech',
        value: 4,
        expected: 0,
        real: 0,
    },
    'Safety': {
        title: 'Безопасность',
        key: 'Safety',
        value: 3,
        expected: 0,
        real: 0,
    },
}

const Rules = () => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className='pt-6'>
            <TracingBeam>
                <div className="antialiased md:px-20 lg:px-40 xl:px-80 ml-10 flex md:gap-8 gap-4 flex-col">
                    <h1 className='text-2xl text-center'>Правила</h1>

                    <section className='flex flex-col gap-2 items-center'>
                        <h2 className='text-xl mb-2'>Общая информация</h2>

                        {isDesktop ?
                            <p>
                                В игре Бункер игроки сталкиваются с тяжелой задачей.
                                Планета Земля больше не пригодна для жизни, выживать в новых условиях стало невозможно.
                                Вы вместе с другими выжившими находите бункер, в котором можно пережить тяжелые времена.
                                Жаль, что мест в бункере хватает только для половины из вас.
                            </p> :
                            <div className='flex flex-col gap-2'>
                                <p>
                                    В игре Бункер игроки сталкиваются с тяжелой задачей.
                                </p>
                                <p>
                                    Планета Земля больше не пригодна для жизни, выживать в новых условиях стало невозможно.
                                </p>
                                <p>
                                    Вы вместе с другими выжившими находите бункер, в котором можно пережить тяжелые времена.
                                    Жаль, что мест в бункере хватает только для половины из вас.
                                </p>
                            </div>
                        }

                    </section>

                    <section className='flex flex-col gap-2 items-center w-full'>
                        <h2 className='text-xl mb-2'>Ход игры</h2>

                        {isDesktop ?
                            <p>
                                Выжившие по очереди рассказывают о себе - своей профессии, хобби, состоянии здоровья и тд.
                                Эта информация поможет определиться, кто будет более полезным членом команды, а кто должен уступить свое место другим.
                                Путем голосования вы должны вместе выгнать половину всех участников.
                                Старайтесь расказывать о себе только хорошее, если это возможно.
                                У каждого игрока также будут 2 специальные карты действий, которые помогут изменить ход игры в самым ответственный момент.
                                Договаривайтесь с другими игроками, обманывайте - делайте все, что потребуется, для того, чтобы попасть в бункер.
                            </p> :
                            <div className='flex flex-col gap-2'>
                                <p>
                                    Выжившие по очереди рассказывают о себе - своей профессии, хобби, состоянии здоровья и тд.
                                </p>
                                <p>
                                    Эта информация поможет определиться, кто будет более полезным членом команды, а кто должен уступить свое место другим.
                                </p>
                                <p>
                                    Путем голосования вы должны вместе выгнать половину всех участников.
                                    Старайтесь расказывать о себе только хорошее, если это возможно.
                                </p>
                                <p>
                                    У каждого игрока также будут 2 специальные карты действий, которые помогут изменить ход игры в самым ответственный момент.
                                </p>
                                <p>
                                    Договаривайтесь с другими игроками, обманывайте - делайте все, что потребуется, для того, чтобы попасть в бункер.
                                </p>
                            </div>
                        }
                    </section>

                    <section className='flex flex-col gap-2 items-center'>
                        <h2 className='text-xl mb-2'>Фаза выживания</h2>

                        {isDesktop ?
                            <p>
                                После окончания всех голосований, игроки деляться на две команды - Выжившие и Изганные.
                                В этой фазе команде Выживших предстоит доказать, что они действительно лучшие из лучших.
                                Характеристики всех выживших игроков будут влиять на состояние бункера в этой фазе.
                            </p> :
                            <div className='flex flex-col gap-2'>
                                <p>
                                    После окончания всех голосований, игроки деляться на две команды - Выжившие и Изганные.
                                </p>
                                <p>
                                    В этой фазе команде Выживших предстоит доказать, что они действительно лучшие из лучших.
                                </p>
                                <p>

                                </p>
                            </div>
                        }
                    </section>

                    <section className='flex flex-col gap-2 items-center'>
                        <h2 className='text-xl mb-2'>Ход игры в фазе выживания</h2>
                        <div className='w-full relative max-w-[600px]'>
                            <Image
                                src="/rules.svg"
                                alt="Game rules illustration"
                                width={100}
                                height={200}
                                style={{ width: '100%', height: 'auto' }}

                            />
                        </div>
                    </section>

                    <section className='flex flex-col gap-2'>
                        <h2 className='text-xl text-center mb-2'>Задачи команд</h2>
                        {isDesktop ?
                            <p>
                                Задачей первой команды является пережить 10 месяцев в бункере. Игроки, которые смогут пережить апокалипсис побеждают.
                                Команда Изгнанных должна всячески мешать выживающим. Команда выиграет, если все игроки в Бункере погибнут или уровень напряженности в Бункере достугнет предела.
                            </p> :
                            <div className='flex flex-col gap-2'>
                                <p>Задачей команды Выживших является пережить 10 месяцев в бункере. Игроки, которые смогут пережить апокалипсис побеждают.</p>
                                <p>Команда Изгнанных должна всячески мешать выживающим. Команда выиграет, если все игроки в Бункере погибнут или уровень напряженности в Бункере достугнет предела.</p>
                            </div>
                        }
                    </section>

                    <section className='flex flex-col gap-2 items-center'>
                        <p>Для каждого игрока будет сгенерирован случайный персонаж со своими особенными характеристиками, которые будут известны только вам</p>
                        <div className='flex flex-col w-full items-center justify-center gap-2'>
                            <p className='text-center'>Каждый персонаж будет выглядеть примерно так:</p>
                            <PlayerCard player={examplePlayer} />
                        </div>
                    </section>

                    <section className='flex flex-col gap-2 items-center relative'>
                        <h2 className='text-xl'>Подробнее про Бункер</h2>
                        <div className='w-[110%] -top-2 flex flex-col items-center'>
                            <BunkerState bunkerRelatives={exampleBunkerRelatives} bunkerStats={exampleBunkerStats} size={isDesktop ? 'regular' : 'small'} />
                        </div>
                    </section>



                    <section className='flex flex-col gap-2 items-center'>
                        <p>Игра состоит из 7 раундов. В каждом раунде все игроки по очереди должны раскрыть одну любую характеристику своего персонажа на свой выбор.</p>
                        <p>Всего у игрока 8 характеристик, поэтому к самому концу игры вы сможете скрыть от всех 1 характеристику.</p>
                    </section>

                    <section>
                        <p>Когда игроки раскроют достаточное количество информации о себе начнется новая фаза игры - обсуждение</p>
                        <p>Во время обсуждения вам нужно вместе определиться какой игрок по вашему мнению будет самым бесполезным</p>
                    </section>

                </div>
            </TracingBeam>
        </div>
    );
}

export default Rules