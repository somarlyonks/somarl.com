import withPlaiceholder from "@plaiceholder/next"


export default withPlaiceholder({
    images: {
        domains: ['s3.us-east-2.amazonaws.com', 'picsum.photos'],
        deviceSizes: [1001, 10000],
        imageSizes: [1000, 2000],
    },
})