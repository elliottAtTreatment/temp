module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:jsdoc/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        'plugin:@stylistic/recommended-extends',
        "plugin:@stylistic/disable-legacy",
    ],
    ignorePatterns: [
        "node_modules/",
        "dist/",
    ],
    plugins: [
        "jsdoc",
        "import",
        "@typescript-eslint",
        "@stylistic",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    settings: {
        jsdoc: {
            mode: "typescript",
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            typescript: {},
        },
    },
    rules: {
        "comma-dangle": "off",
        "jsdoc/require-description": ["warn", {
            contexts: [
                "TSInterfaceDeclaration",
                "TSTypeAliasDeclaration",
                "FunctionDeclaration",
                "ClassDeclaration",
                "MethodDefinition",
                "ArrowFunctionExpression",
                "FunctionExpression",
                "VariableDeclaration",
                "ClassExpression",
                "MethodDefinition[kind='constructor']",
            ],
        }],
        "@typescript-eslint/semi": ["warn", "never"],
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/consistent-type-definitions": "warn",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-return-assign": "warn",
        "jsdoc/no-types": "off",
        "jsdoc/require-jsdoc": ["warn", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true,
                "ArrowFunctionExpression": true,
                "FunctionExpression": true
            },
            "contexts": [
                "ExportNamedDeclaration"
            ]
        }],
        "jsdoc/require-param": "warn",
        "jsdoc/require-param-type": "off", // This is redundant with TypeScript
        "jsdoc/require-param-description": "warn",
        "jsdoc/require-returns": "warn",
        "jsdoc/require-returns-type": "off", // This is redundant with TypeScript
        "jsdoc/require-returns-description": "warn",
        "@stylistic/function-paren-newline": ["error", "consistent"],
        "@stylistic/indent-binary-ops": "off",
        "@stylistic/indent": "off",
        "@stylistic/array-bracket-newline": ["error", "consistent"],
        "@stylistic/object-curly-newline": ["error", { "consistent": true }],
        "@stylistic/max-len": ["error", {
            "code": 80,
            "comments": 100,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignorePattern": "^\\s*\\*\\s*@\\w+\\s+.*$|^\\s*// TODO:", // Keeps the existing JSDoc ignore pattern or TODO: comments
            "ignoreRegExpLiterals": true,
            "ignoreTrailingComments": true,
        }],
    },
};
