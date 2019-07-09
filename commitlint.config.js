const { utils } = require('@commitlint/config-lerna-scopes')


module.exports = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes"
  ],
  rules: {
    'scope-enum': async (ctx) => {
      const pkgs = await utils.getPackages(ctx)
      return [2, 'always', [...pkgs, 'pkg', 'plan']]
    }
  }
}
