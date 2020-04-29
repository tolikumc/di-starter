import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from 'swagger-express-ts';

@ApiModel({
  description: 'Auth verification API response',
  name: 'AuthVerificationApiResponse'
})
export class AuthVerificationApiResponse {
  @ApiModelProperty({type: SwaggerDefinitionConstant.STRING, description: 'JWT token'})
  data: string;
}
