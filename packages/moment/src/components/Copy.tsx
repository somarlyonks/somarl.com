import React, {useState, useCallback} from 'react'

import OcticonClippy from '@somarl.com/icons/Clippy'
import OcticonCheck from '@somarl.com/icons/Check'

import useClipboard from '../libs/useClipboard'


export interface IProps {
    content: string
    className?: string
}


export default function Copy ({content, className}: IProps) {
    const [, setClipboard] = useClipboard()
    const [clipped, setClipped] = useState(false)

    const handleClick = useCallback(() => {
        if (clipped) return
        setClipboard(content)
        setClipped(true)
        setTimeout(() => setClipped(false), 1000)
    }, [clipped, content])

    return (
        <a className={className} role="button" aria-disabled={clipped} onClick={handleClick}>
            {clipped ? <OcticonCheck /> : <OcticonClippy />}
        </a>
    )
}
