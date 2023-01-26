module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
    ],
    "rules": {
        'prettier/prettier': [
            'error',
            {
                'endOfLine': 'auto'
            }
        ],
        "react/destructuring-assignment": 0,
        '@typescript-eslint/no-shadow': 0,
        "default-case": 0,
        "consistent-return": 0,
        "import/no-extraneous-dependencies": 0,
        "@typescript-eslint/default-param-last": 0,
        "import/prefer-default-export": 0,
        "react/react-in-jsx-scope": 0
    }
}
