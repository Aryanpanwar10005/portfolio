import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Vendored shadcn/ui primitives. These are upstream files that get replaced
    // wholesale on re-vendoring, so local edits would be lost. They stay linted
    // (a genuine error like an undefined variable still fails the build) but the
    // React 19 strictness rules they predate are turned off for this path only.
    files: [
      "components/ui/**/*.{ts,tsx}",
      "hooks/use-mobile.tsx",
      "hooks/use-toast.ts",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Node maintenance scripts are CommonJS: package.json has no "type":"module".
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
