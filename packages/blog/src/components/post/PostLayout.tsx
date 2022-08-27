import Head, {IProps as IHeadProps} from '../Head'
import Header from '../Header'
import Footer from '../Footer'


interface IProps extends IHeadProps {
    slug: string
}

export default function Layout ({slug, title, description, children}: IProps) {
    return (
        <>
            <Head title={title + ' | Yang'} description={description} />
            <Header title={title} />
            {children}
            <Footer slug={slug} />
        </>
    )
}
