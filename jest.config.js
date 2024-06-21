const baseConfig = require("@stackla/jest-config");

module.exports = baseConfig({ tsConfig: require("./tsconfig.json") });
