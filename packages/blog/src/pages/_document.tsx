import {useContext} from 'react'
import Document, {Html, Head, NextScript} from 'next/document'
import {BODY_RENDER_TARGET} from 'next/dist/shared/lib/constants'
import {HtmlContext} from 'next/dist/shared/lib/utils'


export default class MyDocument extends Document {
    public render () {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

const Main = () => {
    const {inAmpMode, docComponentsRendered} = useContext(
        HtmlContext
    )

    docComponentsRendered.Main = true
    if (inAmpMode) return <>{BODY_RENDER_TARGET}</>
    return <main role="main" id="__next">{BODY_RENDER_TARGET}</main>
}
