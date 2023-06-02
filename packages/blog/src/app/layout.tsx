import 'src/styles/index.scss'
import localFont from 'next/font/local'


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
    title: 'Blogs | Yang',
    description: 'My life and thoughts.',
    robots: 'all',
    themeColor: '#00a1f1',
    manifest: '/site.webmanifest',
}

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${fontSans.className} ${fontMono.variable}`}>
            <body>{children}</body>
        </html>
    )
}
