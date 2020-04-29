import * as express from 'express';
import * as swagger from 'swagger-express-ts';
import {SwaggerDefinitionConstant} from 'swagger-express-ts';
import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app: express.Application): void {
  const basePath = process.env.ENVIRONMENT ? '/' + process.env.ENVIRONMENT : '';

  app.use(
    swagger.express({
      definition: {
        basePath: basePath,
        schemes: ['https', 'http'],
        info: {
          title: 'OASIS CAIMAN API',
          version: '1.0'
        },
        securityDefinitions: {
          JWT: {
            type: SwaggerDefinitionConstant.Security.Type.API_KEY,
            in: SwaggerDefinitionConstant.Security.In.HEADER,
            name: 'Authorization'
          }
        }
      }
    })
  );

  const options = {
    swaggerOptions: {
      url: `${basePath}/api-docs/swagger.json`
    }
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options));
}
