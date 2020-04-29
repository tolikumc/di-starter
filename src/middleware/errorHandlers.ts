import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import HttpStatus from 'http-status-codes';
import {BadRequestError, DomainError, UnAuthorizedError} from '../services/error';
import {LogFactory} from '../utils/logger';

const log = LogFactory.createLogger('error-middleware');

export const HandleModelError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    log.error(`Model errors: ${JSON.stringify(errors)}`);
    return res.status(HttpStatus.BAD_REQUEST).send({message: 'Bad request', ...errors});
  }
  next();
};

export const HandleServerError = (err: Error, req: Request, res: Response) => {
  // NOTE: If Error type is known rely on it message
  if (err instanceof DomainError) {
    return res.status(HttpStatus.BAD_REQUEST).send({message: err.message, data: {}});
  }

  if (err instanceof BadRequestError) {
    return res.status(HttpStatus.BAD_REQUEST).send({message: err.message, data: {}});
  }

  if (err instanceof UnAuthorizedError) {
    return res.status(HttpStatus.UNAUTHORIZED).send({message: err.message, data: {}});
  }

  log.error(`Unhandled server error: ${err}`);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Unhandled server error', data: {}});
  throw err;
};
