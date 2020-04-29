import {ApiModel, ApiModelProperty} from 'swagger-express-ts';

@ApiModel({
  description: 'Auth login request',
  name: 'AuthRegisterRequest'
})
export class AuthRegisterRequest {
  @ApiModelProperty({required: true})
  email: string;

  @ApiModelProperty({required: true})
  password: string;

  @ApiModelProperty({required: true})
  firstName: string;

  @ApiModelProperty({required: true})
  lastName: string;
}
