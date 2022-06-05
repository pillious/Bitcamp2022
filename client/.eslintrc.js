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
    rules: {
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
    },
};
