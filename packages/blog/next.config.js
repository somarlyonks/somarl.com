const withTM = require('next-transpile-modules')([
    '@csszen/components.button',
    '@csszen/components.flexmini',
    '@csszen/components.fof',
])

module.exports = withTM({
    webpack5: true,
})
