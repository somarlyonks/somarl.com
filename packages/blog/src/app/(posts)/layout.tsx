
import Footer from '@/components/Footer'


export default function Layout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <article>{children}</article>
            <Footer />
        </>
    )
}
