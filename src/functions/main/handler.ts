import serverless from "serverless-http"
import expressApp from '../../libs/express';

const main = serverless(expressApp)
export { main }
