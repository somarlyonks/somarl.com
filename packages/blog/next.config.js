const withTM = require('next-transpile-modules')([
    '@csszen/components.button',
    '@csszen/components.flexmini',
    '@csszen/components.fof',
])

module.exports = withTM({
    webpack5: true,
    experimental: {
        images: {
            layoutRaw: true,
        },
    },
    images: {
        deviceSizes: [1001, 10000],
        imageSizes: [1000, 2000],
    },
})
