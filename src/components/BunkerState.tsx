import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BunkerRelatives, BunkerStatsType, CardType, PlayerType } from '@/types/types'
import { Progress } from './ui/progress'
import { useGameInfo } from '@/hooks/useGameInfo'
import { phisicsAverage, psychoAverage, socialAverage } from '@/data/data'
import StatEvaluationProgress from './StatEvaluationProgress'


const BunkerState = React.memo(function PlayerCard({ bunkerStats, bunkerRelatives }: { bunkerStats: BunkerStatsType, bunkerRelatives: BunkerRelatives }) {

    const { countOfNotEliminatedPlayers } = useGameInfo((state) => {
        return {
            countOfNotEliminatedPlayers: state.countOfNotEliminatedPlayers,
        }
    })

    const countOfPlayers = 6

    const maxAnxietyLevel = countOfPlayers * (socialAverage + psychoAverage)

    return (
        <Card className="max-w-fit">
            <CardHeader>
                <CardTitle>Состояние бункера</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2 justify-center text-lg'>

                    <div className='flex flex-col gap-2 justify-center items-center text-lg'>
                        <p className='mb-2'>Напряженность в бункере</p>
                        <Progress className='w-full h-10' value={(bunkerStats.Anxiety.value / maxAnxietyLevel) * 100} />
                    </div>

                    <div className='flex flex-col items-center gap-5 mt-8'>
                        <div className='flex flex-row justify-center gap-5'>
                            <div className='border rounded-md p-6'>
                                <p className='text-xl mb-1'>Продовольствие</p>
                                <p>{`Запасы: ${bunkerStats.Food.value}`}</p>
                                <p>{`Потребление: ${bunkerStats['Food Consumption'].value}`}</p>
                            </div>

                            <div className='border rounded-md p-6'>
                                <p className='text-xl mb-1'>Медикаменты</p>
                                <p>{`Запасы: ${bunkerStats.Medicines.value}`}</p>
                                <p>{`Потребление: ${bunkerStats['Med Consumption'].value}`}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center gap-5 mt-8'>
                        <div className='flex flex-col justify-center gap-7 w-full'>
                            <StatEvaluationProgress stat={bunkerRelatives.Safety} />
                            <StatEvaluationProgress stat={bunkerRelatives.Med} />
                            <StatEvaluationProgress stat={bunkerRelatives.Tech} />
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
})

export default BunkerState