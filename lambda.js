'use strict';
const aws = require('aws-serverless-express');
const app = require('./server');
const server = aws.createServer(app);
exports.handler = (event, context) => {
    aws.proxy(server, event, context);
};
//# sourceMappingURL=lambda.js.map