import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                URL: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                setImmediate: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly",
                clearImmediate: "readonly"
            }
        },
        rules: {
            "indent": ["error", 2, {"SwitchCase": 1}],
            "linebreak-style": ["error", "unix"],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "no-console": "off",
            "prefer-const": "error",
            "no-var": "error",
            "no-undef": "error",
            "object-shorthand": "error",
            "prefer-arrow-callback": "error"
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                describe: "readonly",
                it: "readonly",
                expect: "readonly", 
                beforeEach: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                jest: "readonly",
            }
        }
    },
    {
        ignores: ["node_modules/**", "coverage/**", "logs/**",  "dist/", "drizzle/**"]
    }
]