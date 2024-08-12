const main = require("./src/functions/main")
const { serverlessConfig } = require("@stackla/base-serverless")

const testingHooks = {
  "before:package:initialize": "npm run dev",
  "before:offline:start:init": "npm run dev"
}

const productionHooks = {
  "before:package:initialize": "npm run build"
}

const plugins : string[] = [
  'serverless-api-gateway-caching'
];

module.exports = {
  ...serverlessConfig({
  plugins: plugins,
  service: "widget-templates",
  offlinePort: process.env.APP_ENV == "testing" ? 4002 : 80,
  custom: {
    scriptable: {
      hooks: process.env.APP_ENV === "testing" ? testingHooks : productionHooks
    },
    esbuild: {
      otherExternal: ["hbs"]
    },
    apiGatewayCaching: {
      enabled: true,
      ttlInSeconds: 300
    }
  },
  package: {
    include: ["views/**/*", "dist/**/*"]
  }
}),
  functions: {
    main: {
      handler: 'src/functions/main/handler.main',
      events: [
        {
          http: {
            method: 'options',
            path: '/{proxy+}',
            caching: {
              enabled: true
            }
          }
        },
        {
          http: {
            method: 'get',
            path: '/{proxy+}',
            caching: {
              enabled: true
            }
          },
        },
      ],
    },
  }
}