import expressApp from '../../libs/express';
import serverless from 'serverless-http';

const main = serverless(expressApp);
export { main };
