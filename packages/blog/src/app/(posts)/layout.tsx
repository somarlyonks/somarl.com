import {PropsWithChildren} from 'react'
import Footer from '@/components/Footer'

export default function Layout ({
    children,
}: PropsWithChildren) {
    return (
        <>
            <article>{children}</article>
            <Footer />
        </>
    )
}
