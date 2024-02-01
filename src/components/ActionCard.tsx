import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ActionCardType, useActionCardDataType } from '@/types/types'
import { useGameInfo } from '@/hooks/useGameInfo'
import { Button } from './ui/button'
import { socket } from '@/socket'
import { cn } from '@/lib/utils'

const ActionCard = (props: { ready: boolean, actionCardId: number, actionData: ActionCardType }) => {

    const { code, playerId, players } = useGameInfo((state) => {
        return {
            code: state.code,
            playerId: state.playerId,
            players: state.players,
        }
    })

    const [pickedPlayerId, setPickedPlayerId] = useState(-1)

    const pickPlayerHandler = (playerId: number) => {
        setPickedPlayerId(playerId)
    }

    const handleUseCardClick = () => {
        const data: useActionCardDataType = {
            pickedPlayerId: null,
        }
        if (props.actionData.type === 'pick' || props.actionData.type === 'pick except yourself') {
            data.pickedPlayerId = pickedPlayerId
        }
        console.log(data)
        socket.emit("use_action_card", { code, playerId, actionCardId: props.actionCardId, data })
    }


    let cardStyles = ''
    let descriptionStyles = ''
    if (props.actionData.used) {
        cardStyles = cn('text-[#383636cd]', 'bg-[#7274740f]')
        descriptionStyles = cn('text-[#383636cd]')
    }

    return (
        <Card className={cn("flex-1", cardStyles)}>
            <CardHeader>
                <CardTitle className='lg:text-xl text-lg'>{props.actionData.name}</CardTitle>
                <CardDescription className={cn(descriptionStyles)}>
                    <p>{props.actionData.key}</p>
                    <p>{props.actionData.char}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {props.actionData.type !== 'no pick' &&
                    <Select disabled={props.actionData.used} onValueChange={(value) => { pickPlayerHandler(Number(value)) }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Игрок" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Выбор игрока</SelectLabel>
                                {players.map((player, index) => {
                                    if (props.actionData.type === 'pick except yourself' && player.id === playerId) return null
                                    return (<SelectItem key={`player${index}`} value={String(player.id)}>{player.name}</SelectItem>)
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                }
                <Button onClick={handleUseCardClick} disabled={pickedPlayerId === -1 && props.actionData.type != 'no pick' || props.actionData.used || props.ready} className='mt-3'>Применить</Button>
            </CardContent>
        </Card>
    )
}

export default ActionCard