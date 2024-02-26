import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Charachteristic, PlayerType } from '@/types/types'
import Characteristic from '../Characteristic'


const PreparationPlayerCard = React.memo(function PreparationPlayerCard({ player }: { player: PlayerType }) {

    type keys = keyof typeof player.characteristics
    const charachteristicNames = Object.keys(player.characteristics) as keys[]

    return (
        <Card className="w-full max-w-[350px]">
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    {charachteristicNames.map((char, index) => {
                        if (char !== 'name') {
                            const playerChar = player.characteristics[char]
                            const value = (typeof playerChar.value === "string") ? playerChar.value : playerChar.value.name
                            const charData: Charachteristic<string, string> = { key: playerChar.key, title: playerChar.title, value: value, hidden: playerChar.hidden }
                            return (
                                <Characteristic key={`char${index}`} charType={'open'} char={charData} />
                            )
                        }
                    })}
                </div>
            </CardContent>
        </Card>
    )
})

export default PreparationPlayerCard