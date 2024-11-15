// eslint-disable-next-line import/no-extraneous-dependencies
const { configureVisualRegression } = require('cypress-visual-regression')
import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    env: {
      visualRegressionType: 'regression',
      visualRegressionGenerateDiff: 'always',
      visualRegressionFailSilently: false
    },
    baseUrl: "http://localhost:4002",
    supportFile: "cypress/support/e2e.ts",
    video: true,
    setupNodeEvents(on, config) {
      
        configureVisualRegression(on, config)
        return config;
    },
    projectId: "2ns45q",
  }
})
