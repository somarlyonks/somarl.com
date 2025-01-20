// @ts-check

import configs from '@somarlyonks/eslint'

export default configs.concat([
    {
        rules: {
            '@stylistic/jsx-one-expression-per-line': ['error', {allow: 'single-child'}],
        },
    },
])
