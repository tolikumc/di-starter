'use strict';

import aws from 'aws-serverless-express';
import app from './server';

const server = aws.createServer(app);
exports.handler = (event, context) => {
  aws.proxy(server, event, context);
};
//# sourceMappingURL=lambda.js.map
