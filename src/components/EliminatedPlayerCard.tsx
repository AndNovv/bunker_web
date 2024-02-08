import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CardType, Charachteristic, PlayerType } from '@/types/types'
import Characteristic from './Characteristic'
import { cn } from '@/lib/utils'


const EliminatedPlayerCard = React.memo(function PlayerCard({ player }: { player: PlayerType }) {

    type keys = keyof typeof player.characteristics
    const charachteristicNames = Object.keys(player.characteristics) as keys[]

    return (
        <Card className={"w-[350px] text-[#383636cd] bg-[#7274740f]"}>
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription className={'text-[#383636cd]'}>
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
                            <Characteristic key={`char${index}`} cardType={"eliminated card"} char={charData} />
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
})

export default EliminatedPlayerCard