const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`
}
module.exports = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 30,
  url: {
    authorizer: "aws_iam"
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
