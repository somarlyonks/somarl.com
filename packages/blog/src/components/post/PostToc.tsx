'use client'

import type {PropsWithChildren} from 'react'
import useInteractiveToc from '@/libs/useInteractiveToc'

export default function PostToc ({
    children,
}: PropsWithChildren) {
    useInteractiveToc()

    return (
        <>{children}</>
    )
}
