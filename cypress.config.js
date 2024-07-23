const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4002",
    baseUrlTimeout: 10000,
    supportFile: "cypress/support/e2e.ts",
    video: true
  }
})
