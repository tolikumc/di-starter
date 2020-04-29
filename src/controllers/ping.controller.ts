import {Request, Response} from 'express';
import HttpStatus from 'http-status-codes';
import {controller, httpGet, interfaces} from 'inversify-express-utils';
import {ApiOperationGet, ApiPath} from 'swagger-express-ts';

@ApiPath({
  path: '/ping',
  name: 'Ping'
})
@controller('/ping')
export class PingController implements interfaces.Controller {
  @ApiOperationGet({
    description: 'Ping me',
    path: '/',
    responses: {
      [HttpStatus.OK]: {description: 'Success'},
      [HttpStatus.INTERNAL_SERVER_ERROR]: {description: 'Unhandled message'}
    }
  })
  @httpGet('/')
  ping(req: Request, res: Response) {
    return res
      .json({message: `I'm live at ${new Date()}!!!!`})
      .status(HttpStatus.OK)
      .send();
  }
}
