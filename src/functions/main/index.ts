const { handlerPath } = require('@stackla/lambda-api-bootstrap');
module.exports = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 30,
  url: {
    authorizer: 'aws_iam',
  },
  ...(process.env.NODE_ENV === 'development' && {
    events: [
      {
        http: {
          method: 'any',
          path: '/{proxy+}',
        },
      },
    ],
  }),
};
