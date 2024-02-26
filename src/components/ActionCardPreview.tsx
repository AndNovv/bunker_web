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
                <CardTitle className='text-xl md:text-2xl'>{props.actionData.name}</CardTitle>
                <CardDescription>{props.actionData.description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default ActionCardPreview