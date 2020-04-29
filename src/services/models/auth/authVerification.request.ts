import {ApiModel, ApiModelProperty} from 'swagger-express-ts';

@ApiModel({
  description: 'Auth verification request',
  name: 'AuthVerificationRequest'
})
export class AuthVerificationRequest {
  @ApiModelProperty({required: true})
  email: string;

  @ApiModelProperty({required: true})
  code: string;
}
