'use client'

import {useEffect} from 'react'

interface IProps {
    styles: string[]
}

export default function PostStyle ({styles}: IProps) {
    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = styles.map(style => `header + article ${style}`).join('\n')
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return null
}
