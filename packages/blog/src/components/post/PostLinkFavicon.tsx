'use client'

import {InvalidEvent} from 'react'

const EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export default function Favicon ({src}: {src: string}) {
    const handleError = (e: InvalidEvent<HTMLImageElement>) => {
        e.target.src = EMPTY_GIF
    }

    return <img role="favicon" loading="lazy" src={src} alt="" aria-hidden onError={handleError} />
}
