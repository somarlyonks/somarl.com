const withTM = require('next-transpile-modules')([
    '@csszen/components.button',
    '@csszen/components.flexmini',
])


module.exports = withTM({
    webpack5: true,
})
