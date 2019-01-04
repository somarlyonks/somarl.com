module.exports = {
  'testEnvironment': 'jsdom',
  'testURL': 'http://localhost',
  'roots': [
    '<rootDir>/src/test'
  ],
  'transform': {
    // @see https://jestjs.io/docs/en/webpack
    // "\\.(css|less)$": "identity-obj-proxy",
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '(/src/test/.*|(\\.|/)(test|spec))\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'node'
  ],
  'globals': {
    'ts-jest': {
      'tsConfig': './tsconfig.test.json'
    }
  },
  'moduleNameMapper': {
    '^src/(.*)': '<rootDir>/src/$1'
  },
  'collectCoverageFrom': [
    'src/App.tsx',
  ]
}
