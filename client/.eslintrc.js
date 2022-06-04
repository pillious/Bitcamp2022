// Example eslint config
// https://medium.com/swlh/a-bit-on-eslint-configuration-in-a-react-project-c9b0eef390c4

// {
//     "extends": ["eslint:recommended", "plugin:react/recommended"],
//     "rules": {
//         // suppress errors for missing 'import React' in files
//        "react/react-in-jsx-scope": "off"
//     }
// };

module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        //   "plugin:jsx-a11y/recommended"
    ],
    plugins: [
        "react",
        "react-hooks",
        //   "jsx-a11y",
    ],
    rules: {
        strict: 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
