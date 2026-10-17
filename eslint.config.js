// @ts-check
const nextConfig = require("eslint-config-next/core-web-vitals");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];

module.exports = config;
