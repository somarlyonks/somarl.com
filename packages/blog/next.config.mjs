
export default {
    transpilePackages: ["next-mdx-remote"],
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
            }
        ]
    }
}
