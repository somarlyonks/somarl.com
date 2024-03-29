
import {Metadata} from 'next'


export interface ITagParams {
    tag: string
}

export interface ICollectionParams {
    collection: string
}

const isTagParams = (params: ITagParams | ICollectionParams): params is ITagParams => params.hasOwnProperty('tag')

export async function generateMetadata ({params}: {
    params: ITagParams | ICollectionParams
}): Promise<Metadata> {
    const title = `${decodeURIComponent(isTagParams(params) ? params.tag : params.collection)} | Yang`
    const url = isTagParams(params)
        ? `/tag/${params.tag}`
        : `/collection/${params.collection}`

    return {
        title,
        openGraph: {
            title,
            description: 'My life and thoughts.',
            url,
        },
    }
}
