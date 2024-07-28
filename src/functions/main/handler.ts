import expressApp from "../../libs/express"
// eslint-disable-next-line import/no-extraneous-dependencies
import serverless from "serverless-http"

const main = serverless(expressApp)
export { main }
