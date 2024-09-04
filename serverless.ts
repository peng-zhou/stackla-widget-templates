const { serverlessConfig } = require("@stackla/base-serverless")
const { handlerPath } = require("@stackla/lambda-api-bootstrap")

const testingHooks = {
  "before:package:initialize": "npm run dev",
  "before:offline:start:init": "npm run dev",
  "before:webpack:compile:compile": "npm run dev"
}

const productionHooks = {
  "before:package:initialize": "npm run build",
  "before:webpack:compile:compile": "npm run build"
}

const plugins: string[] = ["serverless-webpack", "serverless-offline"]

const config = {
  ...serverlessConfig({
  plugins: plugins,
  service: "widget-templates",
  offlinePort: process.env.APP_ENV == "testing" ? 4002 : 80,
  custom: {
    esbuild: {
      otherExternal: ["hbs"]
    }
  }),
  functions: {
    main: {
      handler: `./src/functions/main/handler.main`,
      timeout: 30,
      provisionedConcurrency: 10,
      url: {
        authorizer: "aws_iam" as const
      },
      ...(process.env.NODE_ENV === "development" && {
        events: [
          {
            http: {
              method: "any",
              path: "/{proxy+}"
            }
          }
        ]
      })
    }
  }
}

if (process.env.APP_ENV == "testing") {
  config.hooks = testingHooks
} else if (process.env.APP_ENV == "production") {
  config.hooks = productionHooks
}

module.exports = config
