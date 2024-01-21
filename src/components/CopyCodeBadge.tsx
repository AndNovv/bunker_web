import React from 'react'
import { Badge } from './ui/badge'
import { useToast } from './ui/use-toast'
import copy from 'clipboard-copy';

const CopyCodeBadge = ({ code }: { code: string }) => {

    const { toast } = useToast()

    const handleCopy = async () => {
        try {
            await copy(code);
            toast({
                title: "Код скопирован",
                description: "Отправляйте друзьям"
            })
        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    return (
        <Badge onClick={handleCopy} className='text-2xl cursor-pointer'>{code}</Badge>
    )
}

export default CopyCodeBadge