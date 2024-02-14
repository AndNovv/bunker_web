import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FinaleRoundStatistic } from "@/types/types"
import React from 'react'
import { Button } from "./ui/button"

const FinaleNewRoundInfoAlert = ({ display, hideFunction, roundStatistics }: { display: boolean, hideFunction: () => void, roundStatistics: FinaleRoundStatistic }) => {

    if (!display) return

    return (
        <div className="bg-[#000000c9] w-screen h-screen flex items-center justify-center fixed top-0 z-10">
            <Alert className="flex gap-2 flex-col p-5 shadow shadow-white w-[90%] md:gap-6 md:p-10 md:w-fit">
                <AlertTitle className="text-center mb-3 text-xl">Прошел очередной месяц. Вот что интересного произошло</AlertTitle>
                <AlertDescription>
                    <div className="mb-4">
                        <p>{`Выжившие выбрали '${roundStatistics.responseData.title}'`}</p>
                        <p>{`В результате: ${roundStatistics.responseData.consequenceTitle} (${roundStatistics.responseData.consequenceDescription})`}</p>
                    </div>

                    <div className="mb-2">
                        {roundStatistics.airWorks ? <p>Система вентеляции работает</p> : <p>Система вентеляции не работает (+2 к напряженности)</p>}
                        {roundStatistics.electricityWorks ? <p>Система электроснабжения работает</p> : <p>Система электроснабжения не работает (+2 к напряженности)</p>}
                        {roundStatistics.waterWorks ? <p>Система очистки воды работает</p> : <p>Система очистки воды не работает (+2 к напряженности)</p>}

                        {roundStatistics.foodEnough ? <p>Еды достаточно</p> : <p>Не всем хватило еды (+2 к напряженности)</p>}
                        {roundStatistics.medicinesEnough ? <p>Медикаментов достаточно</p> : <p>Не всем хватило медикаментов (+2 к напряженности)</p>}
                    </div>
                </AlertDescription>
                <Button onClick={hideFunction}>Продолжить</Button>
            </Alert>
        </div>

    )
}

export default FinaleNewRoundInfoAlert