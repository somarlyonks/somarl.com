import Script from 'next/script'
import {PropsWithChildren} from 'react'

export default function PostScript ({id, children}: PropsWithChildren<{id?: string}>) {
    return (
        <Script id={id} type="module" strategy="lazyOnload">
            {children}
        </Script>
    )
}
