export default {
    transpilePackages: ['@somarl.com/icons'],
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
