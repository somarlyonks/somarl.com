/// <reference types="@mdx-js/loader" />

interface IPostMeta extends Record<string, unknown> {
    title: string
    published: string
    language: string

    /** @optional */
    abstract: string
    /** @optional */
    tags: string[]
    cover: string

    /** @generated */
    url: string
}


declare module '*.mdx' {
    export const meta: IPostMeta
}

declare module 'remark-sectionize' {}
