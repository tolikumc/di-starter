import {Response} from 'express';
import HttpStatus from 'http-status-codes';
import {injectable} from 'inversify';
import {interfaces} from 'inversify-express-utils';

@injectable()
export abstract class BaseController implements interfaces.Controller {
  protected send<T>(response: Response, data?: T, message?: string): void {
    response.status(HttpStatus.OK).json({data, message});
  }
}
