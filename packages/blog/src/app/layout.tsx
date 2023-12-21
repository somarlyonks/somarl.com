
import {PropsWithChildren} from 'react'
import {Viewport} from 'next'
import localFont from 'next/font/local'

import 'src/styles/index.scss'


const fontSans = localFont({
    src: '../../public/fonts/DejaVuSans.woff2',
    display: 'swap',
})

const fontMono = localFont({
    src: '../../public/fonts/CamingoCode-Regular-webfont.woff',
    display: 'swap',
    variable: '--font-mono',
    adjustFontFallback: false,
})

export const metadata = {
    metadataBase: new URL('https://blog.somarl.com'),
    title: 'Blogs | Yang',
    description: 'My life and thoughts.',
    robots: 'all',
    manifest: '/site.webmanifest',
    openGraph: {
        title: 'Blogs | Yang',
        description: 'My life and thoughts.',
        url: 'https://blog.somarl.com',
        siteName: 'Yang',
    },
}

export const viewport: Viewport = {
    themeColor: '#00a1f1',
    colorScheme: 'light dark',
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout ({
    children,
}: PropsWithChildren) {
    return (
        <html lang="en" className={`${fontSans.className} ${fontMono.variable}`}>
            <body>{children}</body>
        </html>
    )
}
