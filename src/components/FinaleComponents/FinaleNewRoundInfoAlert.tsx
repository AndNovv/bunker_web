import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FinaleRoundStatistic, FinaleType } from "@/types/types"
import React from 'react'
import { Button } from "../ui/button"
import { useGameInfo } from "@/hooks/useGameInfo"

const FinaleNewRoundInfoAlert = ({ display, hideFunction, finale }: { display: boolean, hideFunction: () => void, finale: FinaleType }) => {

    const { players } = useGameInfo((state) => {
        return {
            players: state.players,
        }
    })

    const roundStatistics = finale.prevRoundStatistics

    if (!display) return


    return (
        <div className="bg-[#000000c9] w-screen h-screen flex items-center justify-center fixed top-0 z-10">
            <Alert className="flex gap-2 flex-col p-5 shadow shadow-white w-[90%] md:gap-6 md:p-10 md:w-fit">
                <AlertTitle className="text-center mb-3 text-xl">Прошел очередной месяц. Вот что интересного произошло</AlertTitle>
                <AlertDescription className="ldkf text-base">
                    <div className="mb-4">
                        <h2 className="text-lg">События:</h2>
                        <p className="mb-1">{`Выжившие выбрали: '${roundStatistics.responseData.title}'`}</p>
                        {roundStatistics.responseData.consequenceTitle === "Игрок скончался после осложнений" ?
                            <p>{`В результате: ${roundStatistics.responseData.consequenceTitle} (${players[roundStatistics.eventTargetPlayerId].name})`}</p> :
                            <p>{`В результате: ${roundStatistics.responseData.consequenceTitle} (${roundStatistics.responseData.consequenceDescription})`}</p>
                        }

                    </div>

                    <div className="mb-2">
                        {roundStatistics.diseasesInfo.length > 0 &&
                            <h1 className="mb-1 text-lg">Информация о болезнях:</h1>
                        }
                        <div className="flex flex-col gap-1">
                            {roundStatistics.diseasesInfo.map((diseaseInfo, index) => {

                                const diseaseName = diseaseInfo.status === 'cured' || diseaseInfo.status === 'epidemic' ? diseaseInfo.diseaseName : players[diseaseInfo.playerId].characteristics.health.value.name
                                const playerName = players[diseaseInfo.playerId].name

                                let medConsumption = 0

                                players[diseaseInfo.playerId].characteristics.health.value.effect.forEach((effect) => {
                                    if (effect.stat === 'Med Consumption') {
                                        medConsumption = effect.value
                                    }
                                })

                                if (diseaseInfo.status === 'cured') {
                                    return (
                                        <div key={`diseaseInfo${index}`}>{`${playerName} вылечил "${diseaseName}". Теперь он здоров`}</div>
                                    )
                                }
                                else if (diseaseInfo.status === 'death') {
                                    return (
                                        <div key={`diseaseInfo${index}`}>{`${playerName} умер после осложнений, вызванных "${diseaseName}"`}</div>
                                    )
                                }
                                else if (diseaseInfo.status === 'epidemic') {
                                    return (
                                        <div key={`diseaseInfo${index}`}>
                                            {`${playerName} заразил всех выживших болезнью "${diseaseName}". На лечение было потрачено ${diseaseInfo.medConsumption} медикаментов. Теперь ${playerName} абсолютно здоров`}
                                        </div>
                                    )
                                }
                                return null
                            })}
                        </div>
                    </div>

                    <div className="mb-2">
                        {!roundStatistics.airWorks && <p>Система вентеляции сломана (+2 к напряженности)</p>}
                        {!roundStatistics.electricityWorks && <p>Система электроснабжения сломана (+2 к напряженности)</p>}
                        {!roundStatistics.waterWorks && <p>Система очистки сломана (+2 к напряженности)</p>}

                        {!roundStatistics.foodEnough && <p>Не всем хватило еды (+2 к напряженности)</p>}
                        {!roundStatistics.medicinesEnough && <p>Не всем хватило медикаментов (+2 к напряженности)</p>}
                    </div>
                </AlertDescription>
                <Button onClick={hideFunction}>Продолжить</Button>
            </Alert>
        </div>

    )
}

export default FinaleNewRoundInfoAlert