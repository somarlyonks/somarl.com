import {useEffect} from 'react'

import Head from '../../components/Head'
import Footer from '../../components/Footer'

export default function Home () {
    useEffect(() => {
        //
    }, [])

    return (
        <>
            <Head title="Moments | Yang" description="I'm a Web developer based in Shanghai.">
                <script src="https://cdn.apple-livephotoskit.com/lpk/1/livephotoskit.js" />
            </Head>

            <article>
                <h1>Moments</h1>

                <div
                    data-live-photo
                    data-photo-src="https://s3.us-east-2.amazonaws.com/static.somarl.com/34d303fe-0ec9-48ea-b270-d842d58d7e1e/IMG_5367.jpg"
                    style={{width: '100%', height: '500px'}}
                />
            </article>
            <Footer />
        </>
    )
}
