import {ApiModel, ApiModelProperty} from 'swagger-express-ts';

@ApiModel({
  description: 'Response which contains only message',
  name: 'MessageModel'
})
export class MessageModel {
  @ApiModelProperty({description: 'Response message or error'})
  message: string;
}
