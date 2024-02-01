import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ActionCardType } from '@/types/types'

const ActionCardPreview = (props: { actionData: ActionCardType }) => {
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className='lg:text-xl text-lg'>{props.actionData.name}</CardTitle>
                <CardDescription>
                    <p>{props.actionData.key}</p>
                    <p>{props.actionData.char}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <p>{props.actionData.used ? 'Карта уже использована' : 'Карта еще не использована'}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ActionCardPreview