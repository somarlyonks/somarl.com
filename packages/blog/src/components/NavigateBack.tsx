'use client'

import {useCallback} from 'react'
import Button from './Button'


export default function NavigateBack () {
    const handleClick = useCallback(() => {
        if (history.length) return history.back()
        return location.assign('/')
    }, [])

    return (
        <Button borderless label="Back" onClick={handleClick} />
    )
}
