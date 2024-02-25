import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input';

const CodeInput = ({ code, codeInput }: { code: string, codeInput: React.RefObject<HTMLInputElement> }) => {

    const [codeValue, setCodeValue] = useState(code);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uppercaseValue = event.target.value.toUpperCase();
        setCodeValue(uppercaseValue);
    };

    useEffect(() => {
        setCodeValue(code)
    }, [code])

    return (
        <Input value={codeValue} onChange={handleInputChange} placeholder='Код комнаты' ref={codeInput}></Input>
    )
}

export default CodeInput