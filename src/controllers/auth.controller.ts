import {Request, Response} from 'express';
import {body} from 'express-validator';
import HttpStatus from 'http-status-codes';
import {inject} from 'inversify';
import {controller, httpPost} from 'inversify-express-utils';
import {ApiOperationPost, ApiPath, SwaggerDefinitionConstant} from 'swagger-express-ts';
import {HandleModelError} from '../middleware/errorHandlers';
import {AuthService} from '../services/auth.service';
import {TYPES} from '../types';
import {BaseController} from './base.controller';

@ApiPath({
  path: '/auth',
  name: 'Authentication'
})
@controller('/auth')
export class AuthController extends BaseController {
  constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {
    super();
  }

  @ApiOperationPost({
    description: 'Registration new user',
    path: '/register',
    parameters: {
      body: {
        properties: {
          email: {type: SwaggerDefinitionConstant.STRING, required: true},
          lastName: {type: SwaggerDefinitionConstant.STRING, required: true},
          firstName: {type: SwaggerDefinitionConstant.STRING, required: true},
          password: {type: SwaggerDefinitionConstant.STRING, required: true}
        }
      }
    },
    responses: {
      [HttpStatus.OK]: {description: 'Success', model: 'MessageModel'},
      [HttpStatus.INTERNAL_SERVER_ERROR]: {description: 'Internal server error', model: 'MessageModel'}
    }
  })
  @httpPost(
    '/register',
    body('email', 'Email is required')
      .isEmail()
      .exists(),
    body('firstName', 'First name is required').exists(),
    body('lastName', 'Surname is required').exists(),
    body('password', 'Password is required').exists(),
    HandleModelError
  )
  async code(request: Request, response: Response) {
    const result = await this.authService.register(request.body);
    this.send(response, result);
  }

  @ApiOperationPost({
    description: 'Verify email with code',
    path: '/verification',
    parameters: {
      body: {
        properties: {
          email: {type: SwaggerDefinitionConstant.STRING, required: true},
          code: {type: SwaggerDefinitionConstant.STRING, required: true}
        }
      }
    },
    responses: {
      [HttpStatus.OK]: {description: 'Success', model: 'AuthVerificationApiResponse'},
      [HttpStatus.INTERNAL_SERVER_ERROR]: {description: 'Internal server error', model: 'MessageModel'}
    }
  })
  @httpPost(
    '/verification',
    body('code', 'Code is required').exists(),
    body('email', 'Email is required')
      .isEmail()
      .exists(),
    HandleModelError
  )
  async verify(request: Request, response: Response) {
    const verificationResponse = await this.authService.confirmationAuthentication(request.body);
    this.send(response, verificationResponse);
  }

  @ApiOperationPost({
    description: 'Login user with email and password',
    path: '/login',
    parameters: {
      body: {
        properties: {
          email: {type: SwaggerDefinitionConstant.STRING, required: true},
          password: {type: SwaggerDefinitionConstant.STRING, required: true}
        }
      }
    },
    responses: {
      [HttpStatus.OK]: {description: 'Success', model: 'AuthLoginApiResponse'},
      [HttpStatus.INTERNAL_SERVER_ERROR]: {description: 'Internal server error', model: 'MessageModel'}
    }
  })
  @httpPost(
    '/login',
    body('password', 'Password is required').exists(),
    body('email', 'Email is required')
      .isEmail()
      .exists(),
    HandleModelError
  )
  async login(request: Request, response: Response) {
    const loginResponse = await this.authService.login(request.body);
    this.send(response, loginResponse);
  }
}
