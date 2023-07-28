interface IPostMeta extends Record<string, unknown> {
    title: string
    published: string
    language: string

    /** @optional */
    abstract: string
    /** @optional */
    tags: string[]
    /** @optional */
    collection: string
    /** @optional */
    cover?: {
        src: string
        /** @optional */
        work: string
        /** @optional */
        author: string
        /** @optional */
        date: string
        /** @optional */
        material: string
        /** @optional */
        blurDataURL: string
    }

    /** @generated */
    url: string
}


declare module '*.mdx' {
    export const meta: IPostMeta
}

declare module 'remark-sectionize' {}
