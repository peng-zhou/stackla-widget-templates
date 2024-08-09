const main = require("./src/functions/main")
const { serverlessConfig } = require("@stackla/base-serverless")

const testingHooks = {
  "before:package:initialize": "npm run dev",
  "before:offline:start:init": "npm run dev"
}

const productionHooks = {
  "before:package:initialize": "npm run build"
}

const isStaging = process.env.AWS_REGION === 'us-west-1';
const isProd = process.env.AWS_REGION === 'ap-southeast-2';

module.exports = {
  ...serverlessConfig({
  plugins: [
    process.env.AWS_REGION === 'us-west-1' || 
    process.env.AWS_REGION === 'ap-southeast-2' ?
    'serverless-domain-manager' : ''
  ],
  service: "widget-templates",
  offlinePort: process.env.APP_ENV == "testing" ? 4002 : 80,
  custom: {
    scriptable: {
      hooks: process.env.APP_ENV === "testing" ? testingHooks : productionHooks
    },
    esbuild: {
      otherExternal: ["hbs"]
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
            path: '/{proxy+}'
          }
        },
        {
          http: {
            method: 'get',
            path: '/{proxy+}',
          },
        },
      ],
    },
  },
  custom: {
    customDomain: isStaging || isProd ? {
      domainName: isStaging ? 'templates.teaser.stackla.com' : 'templates.stackla.com',
      basePath: '',
      stage: '${self:provider.stage}',
      createRoute53Record: false
    } : {}
  }
}