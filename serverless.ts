const { serverlessConfig } = require("@stackla/base-serverless")

const testingHooks = {
  "before:package:initialize": "npm run dev",
  "before:offline:start:init": "npm run dev",
  "before:webpack:compile:compile": "npm run dev"
}

const productionHooks = {
  "before:package:initialize": "npm run build",
  "before:webpack:compile:compile": "npm run build"
}

const plugins : string[] = [
  'serverless-api-gateway-caching',
  'serverless-webpack',
  'serverless-offline'
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
      ttlInSeconds: 300,
      cacheKeyParameters: ['method.request.querystring.*']
    }
  },
  package: {
    include: ["views/**/*", "dist/**/*"],
    exclude: ["node_modules/**/*"],
  }
  }),
  functions: {
    main: {
      handler: 'src/functions/main/handler.main',
      provisionedConcurrency: 10,
      timeout: 30,
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