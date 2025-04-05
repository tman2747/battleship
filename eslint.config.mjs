import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended, // Add this override for test files
	{
		files: ["**/*.test.js"],
		languageOptions: {
			globals: {
				...globals.jest, // adds describe, test, expect, etc.
			},
		},
		plugins: {
			jest: eslintPluginJest,
		},
		rules: {
			// optional: enable some recommended Jest rules
			...eslintPluginJest.configs.recommended.rules,
		},
	},
];
