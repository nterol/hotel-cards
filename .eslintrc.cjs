/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier", "plugin:prettier/recommended",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
  overrides: [{
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          "groups": [
            "builtin", // Built-in types are first
            "external",
            "internal",
            "parent",
            "sibling"
          ],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": false
          },
          "warnOnUnassignedImports": false
        }
      ]
    }
  }]
};

module.exports = config;
