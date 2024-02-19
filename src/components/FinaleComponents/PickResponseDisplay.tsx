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
import { EventType } from '@/types/types';
import { Button } from '../ui/button';
import PickResponseOptions from './PickResponseOptions';

const PickResponseDisplay = ({ muted, event, handleChooseResponseClick, medicines, playerName, open }: { muted: boolean, event: EventType, handleChooseResponseClick: (index: number) => void, medicines: number, playerName: string, open: boolean }) => {
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
                <h2 className='text-center text-lg'>
                    {event.type === 'Complex' ? event.title === 'Игрок заболел' ? `${event.title} (${playerName})` : event.title : null}
                    {event.type === 'Simple' && 'Что будут делать выжившие в свободное время?'}
                </h2>
                <PickResponseOptions handleChooseResponseClick={handleChooseResponseClick} event={event} muted={muted} medicines={medicines} />
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
                        <PickResponseOptions handleChooseResponseClick={handleChooseResponseClick} event={event} muted={muted} medicines={medicines} />
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