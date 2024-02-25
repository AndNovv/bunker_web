import { useState, useEffect } from "react";

const usePlayerAndCodeSessionStorage = () => {
    const [value, setValue] = useState<[string, string]>(['', ''])


    useEffect(() => {
        const playerName = window.sessionStorage.getItem("playerName")
        const code = window.sessionStorage.getItem("code")
        setValue([playerName ?? '', code ?? ''])
    }, [])

    return value
}

export default usePlayerAndCodeSessionStorage