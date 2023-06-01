import 'src/styles/index.scss'


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
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
