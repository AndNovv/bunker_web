import { EventResponse, EventType } from '@/types/types'
import React from 'react'


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
                    <div className='border bg-accent text-[#cfcfcf61] p-4 rounded-md w-full' key={`event${index}`}>
                        <h2>{response.title}</h2>
                    </div>
                )
            })
        )
    }

    return (
        event.responses.map((response, index) => {

            if (!VariantIsValid(response)) {
                return (
                    <div className='border bg-accent text-[#cfcfcf61] p-4 rounded-md w-full' key={`event${index}`}>
                        <h2>{response.title}</h2>
                    </div>
                )
            }

            return (
                <div onClick={() => handleChooseResponseClick(index)} className='border p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer' key={`event${index}`}>
                    <h2>{response.title}</h2>
                </div>
            )
        })
    )
}

export default PickResponseOptions