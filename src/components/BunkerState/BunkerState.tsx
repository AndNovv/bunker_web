import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BunkerRelatives, BunkerStatsType } from '@/types/types'
import { Progress } from '../ui/progress'
import { useGameInfo } from '@/hooks/useGameInfo'
import StatEvaluationProgress from './StatEvaluationProgress'
import BunkerSystemState from './BunkerSystemState'
import { calculateMaxAnxietyLevel, cn } from '@/lib/utils'

type sizeType = 'small' | 'regular'

const BunkerState = ({ bunkerStats, bunkerRelatives, size = 'regular' }: { bunkerStats: BunkerStatsType, bunkerRelatives: BunkerRelatives, size?: sizeType }) => {

    const { players } = useGameInfo((state) => {
        return {
            players: state.players,
        }
    })

    const maxAnxietyLevel = calculateMaxAnxietyLevel(players.length)

    let anxietyPercentage = bunkerStats.Anxiety.value / maxAnxietyLevel * 100

    if (anxietyPercentage > 100) {
        anxietyPercentage = 100
    }
    else if (anxietyPercentage < 0) {
        anxietyPercentage = 0
    }

    return (
        <Card className={cn("w-full max-w-fit", size === 'small' ? 'scale-90' : null)}>
            <CardHeader>
                <CardTitle className='text-center'>Бункер</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-6 justify-center'>

                    <div className='flex flex-col justify-center items-center'>
                        <p className='mb-1'>Уровень напряженности</p>
                        <Progress className='w-full h-8' value={anxietyPercentage} />
                    </div>

                    <div className='flex flex-row justify-center gap-2'>
                        <div className='border rounded-md p-3 flex-1'>
                            <div className='mb-1'>
                                Продовольствие
                            </div>
                            <p className='whitespace-nowrap'>{`Запасы: ${bunkerStats.Food.value}`}</p>
                            <p className='whitespace-nowrap'>{`Потребление: ${bunkerStats['Food Consumption'].value}`}</p>
                        </div>

                        <div className='border rounded-md p-3 flex-1'>
                            <p className='mb-1'>
                                Медикаменты
                            </p>
                            <p className='whitespace-nowrap'>{`Запасы: ${bunkerStats.Medicines.value}`}</p>
                            <p className='whitespace-nowrap'>{`Потребление: ${bunkerStats['Med Consumption'].value}`}</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center gap-5 w-full'>
                        <StatEvaluationProgress stat={bunkerRelatives.Safety} />
                        <StatEvaluationProgress stat={bunkerRelatives.Med} />
                        <StatEvaluationProgress stat={bunkerRelatives.Tech} />
                    </div>

                    <div className='flex flex-col justify-center gap-5 w-full'>
                        <BunkerSystemState value={bunkerStats['Vent System'].value} title={bunkerStats['Vent System'].title} />
                        <BunkerSystemState value={bunkerStats['Water Cleaning System'].value} title={bunkerStats['Water Cleaning System'].title} />
                        <BunkerSystemState value={bunkerStats['Electricity System'].value} title={bunkerStats['Electricity System'].title} />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default BunkerState