import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from 'swagger-express-ts';

@ApiModel({
  description: 'Auth verification API response',
  name: 'AuthLoginApiResponse'
})
export class AuthLoginApiResponse {
  @ApiModelProperty({type: SwaggerDefinitionConstant.STRING, description: 'JWT token'})
  data: string;
}
