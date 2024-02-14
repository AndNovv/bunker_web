import { RelativeStat } from '@/types/types'
import { ChevronsDown, ChevronDown, ChevronUp, ChevronsUp, Minus } from "lucide-react"
import React from 'react'

const StatEvaluationProgress = ({ stat }: { stat: RelativeStat<string> }) => {

    return (
        <div>
            <h3 className='mb-1'>{stat.title}</h3>
            <div className='h-10 w-full rounded-md border flex flex-row overflow-hidden'>
                <div className={`flex justify-center items-center w-full h-full border-r ${stat.value === 0 ? 'bg-primary' : null}`}><ChevronsDown /></div>
                <div className={`flex justify-center items-center w-full h-full border-r ${stat.value === 1 ? 'bg-primary' : null}`}><ChevronDown /></div>
                <div className={`flex justify-center items-center w-full h-full border-r ${stat.value === 2 ? 'bg-primary' : null}`}><Minus /></div>
                <div className={`flex justify-center items-center w-full h-full border-r ${stat.value === 3 ? 'bg-primary' : null}`}><ChevronUp /></div>
                <div className={`flex justify-center items-center w-full h-full ${stat.value === 4 ? 'bg-primary' : null}`}><ChevronsUp /></div>
            </div>
        </div>
    )
}

export default StatEvaluationProgress