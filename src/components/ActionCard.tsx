import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ActionCardType } from '@/types/types'

const ActionCard = (props: { actionData: ActionCardType }) => {
    return (
        <Card className="w-[200px] cursor-pointer hover:scale-105 transition-all">
            <CardHeader>
                <CardTitle>{props.actionData.name}</CardTitle>
                <CardDescription>
                    <p>{props.actionData.key}</p>
                    <p>{props.actionData.char}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    {props.actionData.used ? 'Карта уже использована' : 'Карта еще не использована'}
                </div>
            </CardContent>
        </Card>
    )
}

export default ActionCard