/// <reference types="@mdx-js/loader" />

interface IPostMeta extends Record<string, unknown> {
    title: string
    abstract: string
    published: string
    url: string
}


declare module '*.mdx' {
    export const meta: IPostMeta
}

declare module 'remark-sectionize' {}
