import { EventResponse, EventType } from '@/types/types'
import React from 'react'
import { Card, CardTitle } from '../ui/card'


const PickResponseOptions = ({ handleChooseResponseClick, event, muted, medicines }: { handleChooseResponseClick: (eventId: number) => void, event: EventType, muted: boolean, medicines: number }) => {

    const VariantIsValid = (response: EventResponse) => {

        // Проверка есть ли медикаменты для лечения
        const effect = response.consequences[0].effect
        for (let i = 0; i < effect.length; i++) {
            const curEffect = effect[i]
            if (curEffect.stat === 'Medicines' && curEffect.value < 0 && medicines <= 0) {
                return false
            }
        }
        return true
    }

    if (muted) {
        return (
            event.responses.map((response, index) => {
                return (
                    <Card className={'muted text-muted-foreground w-full p-4'} key={`event${index}`}>
                        <CardTitle className='text-lg'>{response.title}</CardTitle>
                    </Card>
                )
            })
        )
    }

    return (
        event.responses.map((response, index) => {

            if (!VariantIsValid(response)) {
                return (
                    <Card className={'muted text-muted-foreground w-full p-4'} key={`event${index}`}>
                        <CardTitle className='text-lg'>{response.title}</CardTitle>
                    </Card>
                )
            }

            return (
                <Card onClick={() => handleChooseResponseClick(index)} className={'w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer p-4'} key={`event${index}`}>
                    <CardTitle className='text-lg'>{response.title}</CardTitle>
                </Card>
            )
        })
    )
}

export default PickResponseOptions