
export default {
    images: {
        domains: ['s3.us-east-2.amazonaws.com', 'picsum.photos'],
        deviceSizes: [1001, 10000],
        imageSizes: [1000, 2000],
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
