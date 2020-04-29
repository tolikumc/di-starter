require('dotenv').config();
require('reflect-metadata');
require('./services/models');
import bodyParser from 'body-parser';
import {Application} from 'express';
import cors from 'cors';
import {InversifyExpressServer} from 'inversify-express-utils';
import {createConnection} from 'typeorm';
import container from './container';
import {HandleServerError} from './middleware/errorHandlers';

import {LogFactory} from './utils/logger';
import {setupSwagger} from './utils/swagger';

const log = LogFactory.createLogger('global');

process.on('uncaughtException', err => {
  log.error(`Unhandled exception: ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  log.error(`Unhandled rejection: ${err}`, err);
  process.exit(1);
});

const server = new InversifyExpressServer(container);

server.setErrorConfig((app: Application) => {
  app.use(HandleServerError);
});

server.setConfig((app: Application) => {
  app.use(cors());
  app.use(bodyParser.json({limit: process.env.HTTP_REQUEST_LIMIT}));
  app.use(bodyParser.urlencoded({extended: false, limit: process.env.HTTP_REQUEST_LIMIT}));
  setupSwagger(app);
});

const {PORT = 3000} = process.env;
const app = server.build();

// Setup TypeOR<M connection
createConnection()
  .then(() => {
    app.listen(PORT, () => {
      log.info(`Api listen http://localhost:${PORT}...`);
    });
  })
  .catch(err => {
    log.error(`Unable to connect to database: ${err}`, err);
  });

export default app;
