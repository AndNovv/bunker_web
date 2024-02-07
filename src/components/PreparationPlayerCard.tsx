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
import { Input } from './ui/input'
import { cn } from '@/lib/utils'


const PreparationPlayerCard = React.memo(function PreparationPlayerCard({ player, nameInput }: { player: PlayerType, nameInput: React.Ref<HTMLInputElement> }) {

    type keys = keyof typeof player.characteristics
    const charachteristicNames = Object.keys(player.characteristics) as keys[]

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription>
                    <p>{player.host ? 'Хост' : 'Игрок'}</p>
                    <p>{player.eliminated ? 'Изгнан' : 'В игре'}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <Input ref={nameInput} placeholder='Введите имя Вашего персонажа'></Input>
                    {charachteristicNames.map((char, index) => {
                        if (char !== 'name') {
                            const playerChar = player.characteristics[char]
                            const value = (typeof playerChar.value === "string") ? playerChar.value : playerChar.value.name
                            const charData: Charachteristic<string, string> = { key: playerChar.key, title: playerChar.title, value: value, hidden: playerChar.hidden }
                            return (
                                <Characteristic key={`char${index}`} cardType={'preparation card'} char={charData} />
                            )
                        }
                    })}
                </div>
            </CardContent>
        </Card>
    )
})

export default PreparationPlayerCard