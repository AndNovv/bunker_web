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
import { cn } from '@/lib/utils'


const PlayerCard = React.memo(function PlayerCard({ player, cardType, nameInput }: { player: PlayerType, cardType: CardType, nameInput: React.Ref<HTMLInputElement> }) {

    type keys = keyof typeof player.characteristics
    const charachteristicNames = Object.keys(player.characteristics) as keys[]

    let cardStyles = ''
    let descriptionStyles = ''
    if (cardType === 'eliminated card') {
        cardStyles = cn('text-[#383636cd]', 'bg-[#7274740f]')
        descriptionStyles = cn('text-[#383636cd]')
    }

    return (
        <Card className={cn("w-[350px]", cardStyles)}>
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription className={cn(descriptionStyles)}>
                    <p>{player.host ? 'Хост' : 'Игрок'}</p>
                    <p>{player.eliminated ? 'Изгнан' : 'В игре'}</p>
                </CardDescription>
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