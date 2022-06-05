module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaVersion: 2020, // Needed to use new js features.
        sourceType: "module",
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    // plugins: ["import"],
    rules: {
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // "import/no-webpack-loader-syntax": 2,
        // "import/no-unresolved": 2,
    },
};

// Example eslint config
// https://medium.com/swlh/a-bit-on-eslint-configuration-in-a-react-project-c9b0eef390c4
// module.exports = {
//     parser: "babel-eslint",
//     env: {
//         browser: true,
//         node: true,
//         es6: true,
//         jest: true,
//     },
//     extends: [
//         "eslint:recommended",
//         "plugin:react/recommended",
//         //   "plugin:jsx-a11y/recommended"
//     ],
//     plugins: [
//         "react",
//         "react-hooks",
//         //   "jsx-a11y",
//     ],
//     rules: {
//         strict: 0,
//         "react-hooks/rules-of-hooks": "error",
//         "react-hooks/exhaustive-deps": "warn",
//     },
//     settings: {
//         react: {
//             version: "detect",
//         },
//     },
// };
