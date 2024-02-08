import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Charachteristic, PlayerType } from '@/types/types'
import Characteristic from './Characteristic'
import { cn } from '@/lib/utils'


const PlayerCardForVoting = React.memo(function PlayerCard({ player, selected, onClick }: { player: PlayerType, selected: boolean, onClick: () => void }) {

    type keys = keyof typeof player.characteristics
    const charachteristicNames = Object.keys(player.characteristics) as keys[]

    const selectedCardStyles = cn('scale-105 bg-secondary')

    const cardStyles = selected ? cn("w-[350px]", selectedCardStyles) : "w-[350px]"

    return (
        <Card onClick={onClick} className={cardStyles}>
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription>
                    <p>{player.host ? 'Хост' : 'Игрок'}</p>
                    <p>{player.eliminated ? 'Изгнан' : 'В игре'}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    {charachteristicNames.map((char, index) => {
                        const playerChar = player.characteristics[char]
                        const value = (typeof playerChar.value === "string") ? playerChar.value : playerChar.value.name
                        const charData: Charachteristic<string, string> = { key: playerChar.key, title: playerChar.title, value: value, hidden: playerChar.hidden }
                        return (
                            <Characteristic key={`char${index}`} cardType={"opponent game card"} char={charData} />
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
})

export default PlayerCardForVoting