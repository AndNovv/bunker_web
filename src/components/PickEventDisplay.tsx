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
import { Button } from './ui/button';
import { Events } from '@/data/data';

const PickEventDisplay = ({ eventIds, handleChooseEventClick, playerName, open }: { eventIds: number[], handleChooseEventClick: (eventId: number) => void, playerName: string, open: boolean }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [drawerOpen, setDrawerOpen] = useState(open)

    useEffect(() => {
        if (open) {
            setDrawerOpen(true)
        }
    }, [open])

    if (isDesktop) {
        return (
            <div className='flex flex-col gap-4 justify-center mt-5'>
                <h2 className='text-center'>Выберите какое событие произойдет в бункере</h2>
                {eventIds.map((eventId, index) => {
                    return (
                        <div onClick={() => handleChooseEventClick(eventId)} className='border p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer' key={`event${index}`}>
                            <h2>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</h2>
                            <p className='text-muted-foreground'>{Events[eventId].description}</p>
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
                    <DrawerTitle>Выберите событие, которое произойдет в бункере</DrawerTitle>
                    <DrawerDescription>
                        Внимательно изучите слабые стороны выживающих
                    </DrawerDescription>
                    <div className='mt-4 flex flex-col gap-2'>
                        {eventIds.map((eventId, index) => {
                            return (
                                <div onClick={() => handleChooseEventClick(eventId)} className='border p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer' key={`event${index}`}>
                                    <h2>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</h2>
                                    <p className='text-muted-foreground'>{Events[eventId].description}</p>
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

export default PickEventDisplay