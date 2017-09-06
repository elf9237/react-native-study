module.exports = {
  "env": {
      "browser": true,
      "commonjs": false,
      "es6": true
  },
  // "extends": "eslint:recommended",
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "indent": [
          "error",
          4
      ],
      "linebreak-style": [
          "error",
          // "unix"
          "windows"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ]
  }
};