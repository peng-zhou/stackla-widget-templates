const main = require('./src/functions/main');
const { serverlessConfig } = require('@stackla/base-serverless');

const testingHooks = {
  'before:package:initialize': 'npm run dev',
  'before:offline:start:init': 'npm run dev',
};

module.exports = serverlessConfig({
  service: 'widget-templates',
  offlinePort: process.env.APP_ENV == 'testing' ? 4002 : 80,
  functions: {
    main,
  },
  custom: {
    scriptable: {
      hooks:
        process.env.APP_ENV === 'testing' ? testingHooks : []
    },
    esbuild: {
      otherExternal: ['hbs'],
    },
  },
  package: {
    include: ['views/**/*', 'dist/**/*'],
  },
});
