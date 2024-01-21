import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CardType, PlayerType } from '@/types/types'
import Characteristic from './Characteristic'
import { Input } from './ui/input'


const PlayerCard = React.memo(function PlayerCard({ player, cardType, nameInput }: { player: PlayerType, cardType: CardType, nameInput: React.Ref<HTMLInputElement> }) {

    type keys = keyof typeof player.characteristics
    const charachteristicNames = Object.keys(player.characteristics) as keys[]

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription>{player.host ? 'Хост' : 'Игрок'}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    {cardType === 'preparation card' && <Input ref={nameInput} placeholder='Введите имя Вашего персонажа'></Input>}
                    {charachteristicNames.map((char, index) => {
                        return (
                            <Characteristic key={`char${index}`} cardType={cardType} char={player.characteristics[char]} />
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
})

export default PlayerCard