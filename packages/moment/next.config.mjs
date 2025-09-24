export default {
    transpilePackages: ['@somarl.com/icons'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects () {
        return [
            {
                source: '/',
                destination: '/photo',
                permanent: true,
            },
        ]
    },
}
