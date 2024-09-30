import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    rules: {
      
      semi: ["error", "never"],
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  },
  {
    ignores: [
        "build/**/*",     // ignore all contents in and under `build/` directory but not the `build/` directory itself
    ]
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]