import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import React, { useEffect, useState } from 'react'

const NewRoundAlert = (props: { round: number }) => {

    const [newRoundAlertVisible, setNewRoundAlertVisible] = useState(false)

    useEffect(() => {
        setNewRoundAlertVisible(true)

        const timeout = setTimeout(() => {
            setNewRoundAlertVisible(false)
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [props.round])

    if (!newRoundAlertVisible) return

    return (
        <div className="bg-[#00000088] w-screen h-screen flex items-center justify-center fixed top-0">
            <Alert className="w-fit p-5 text-xl shadow shadow-white">
                <AlertTitle className="text-center mb-3">{`Раунд №${props.round}`}</AlertTitle>
                <AlertDescription>
                    Откройте еще по одной характеристике
                </AlertDescription>
            </Alert>
        </div>

    )
}

export default NewRoundAlert