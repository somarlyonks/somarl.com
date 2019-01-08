module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts'
  ],
  // 'roots': [
  //   '<rootDir>/src/test'
  // ],
  setupFiles: [
    '<rootDir>/config/polyfills.js'
  ],
  // 'testMatch': [
  //   '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
  //   '<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)'
  // ],
  testRegex: '(/src/test/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironment: 'jsdom', // node
  testURL: 'http://localhost',
  transform: {
    // @see https://jestjs.io/docs/en/webpack
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx|mjs)$': '../../node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^src/(.*)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'mjs',
    'node',
    'ts',
    'tsx',
    'web.js',
    'web.jsx',
    'web.ts',
    'web.tsx'
  ],
  globals: {
    'ts-jest': {
      'tsConfig': './tsconfig.test.json'
    }
  },
  preset: 'ts-jest/presets/js-with-babel',
  testMatch: null,
}
