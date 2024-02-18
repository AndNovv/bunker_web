import React, { useEffect, useState } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { EventResponse, EventType } from '@/types/types';
import { Button } from './ui/button';

const PickResponseDisplay = ({ event, handleChooseResponseClick, medicines, playerName, open }: { event: EventType, handleChooseResponseClick: (index: number) => void, medicines: number, playerName: string, open: boolean }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [drawerOpen, setDrawerOpen] = useState(open)

    useEffect(() => {
        if (open) {
            setDrawerOpen(true)
        }
    }, [open])

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


    if (isDesktop) {
        return (
            <div className='flex flex-col gap-4 justify-center mt-5'>
                <h2 className='text-center text-lg'>
                    {event.type === 'Complex' ? event.title === 'Игрок заболел' ? `${event.title} (${playerName})` : event.title : null}
                    {event.type === 'Simple' && 'Что будут делать выжившие в свободное время?'}
                </h2>
                {event.responses.map((response, index) => {

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
                })}
            </div>
        )
    }

    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Выбор события</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {event.type === 'Complex' ? event.title === 'Игрок заболел' ? `${event.title} (${playerName})` : event.title : null}
                        {event.type === 'Simple' && 'Что будут делать выжившие в свободное время?'}
                    </DrawerTitle>
                    <DrawerDescription>
                        Постарайтесь вместе с командой принять лучшее решение
                    </DrawerDescription>
                    <div className='flex flex-col gap-4 justify-center mt-5'>
                        {event.responses.map((response, index) => {

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
                        })}
                    </div>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default PickResponseDisplay