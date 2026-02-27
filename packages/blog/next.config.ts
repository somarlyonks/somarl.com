import type {NextConfig} from 'next'
import createMDX from '@next/mdx'

const nextConfig = {
    transpilePackages: [
        '@somarl.com/icons',
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.us-east-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
        deviceSizes: [1001, 10000],
        imageSizes: [1000, 2000],
    },
    sassOptions: {
        api: 'modern',
        silenceDeprecations: ['legacy-js-api'],
    },
    async redirects () {
        return [
            {
                source: '/dashboard',
                destination: '/',
                permanent: true,
            },
        ]
    },
} satisfies NextConfig

const HastLinkIcon = {
    type: 'element',
    tagName: 'svg',
    properties: {
        className: ['octicon', 'octicon-link'],
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 16 16',
        version: '1.1',
        width: '16',
        height: '16',
    },
    children: [{
        type: 'element',
        tagName: 'path',
        properties: {
            fillRule: 'evenodd',
            d: 'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z',
        },
    }],
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            '@somarlyonks/remark-toc',
            'remark-frontmatter',
            'remark-mdx-frontmatter',
            'remark-sectionize',
            'remark-gfm',
        ],
        rehypePlugins: [
            'rehype-slug',
            'rehype-unwrap-images',
            ['@shikijs/rehype', {
                themes: {
                    light: 'github-light',
                    dark: 'github-dark',
                },
            }],
            ['rehype-autolink-headings', {
                content: HastLinkIcon,
                properties: {
                    ariaHidden: 'true',
                    tabIndex: -1,
                    role: 'button',
                },
            }],
        ],
    },
})

export default withMDX(nextConfig)
