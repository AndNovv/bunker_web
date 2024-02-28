import { RelativeStat } from '@/types/types'
import { ChevronsDown, ChevronDown, ChevronUp, ChevronsUp, Minus } from "lucide-react"
import React from 'react'

const StatEvaluationProgress = ({ stat }: { stat: RelativeStat<string> }) => {

    const icons = [<ChevronsDown key='ChevronsDown' />, <ChevronDown key='ChevronDown' />, <Minus key='Minus' />, <ChevronUp key='ChevronUp' />, <ChevronsUp key='ChevronsUp' />]

    return (
        <div>
            {/* dev stats */}
            {/* <h3 className='mb-1'>{`${stat.title} Среднее: ${stat.expected} Ваше: ${stat.real}`}</h3> */}
            <h3 className='mb-1'>{stat.title}</h3>
            <div className='h-10 w-full rounded-md border flex flex-row overflow-hidden divide-x divide-secondary'>
                {icons.map((icon, index) => {
                    return <div key={`icon ${icon.key}`} className={`flex justify-center items-center w-full h-full ${stat.value === index ? 'bg-primary' : null}`}>{icon}</div>
                })}
            </div>
        </div>
    )
}

export default StatEvaluationProgress