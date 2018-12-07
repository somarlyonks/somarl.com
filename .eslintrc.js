module.exports = {
  // {off: 0, warn: 1, error: 2}
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "none",
        "ignoreRestSiblings": false
      }
    ],
    "no-console": 0,
    "curly": 0,
    "eqeqeq": "error",
    "no-inner-declarations": 0,
    "space-before-function-paren": "error",
    "space-in-parens": "error",
    "comma-spacing": "error",
    "no-trailing-spaces": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "prefer-const": "error",
    "space-before-function-paren": "error"
  },
  "globals": {
    // "assert": true
  }
};