import {ApiModel, ApiModelProperty} from 'swagger-express-ts';

@ApiModel({
  description: 'Auth login request',
  name: 'AuthLoginRequest'
})
export class AuthLoginRequest {
  @ApiModelProperty({required: true})
  email: string;

  @ApiModelProperty({required: true})
  password: string;
}
