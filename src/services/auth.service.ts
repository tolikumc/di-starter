import {inject, injectable} from 'inversify';
import {UserRepository} from '../repositories/user.repository';
import {TYPES} from '../types';
import {LogFactory} from '../utils/logger';
import {AuthRegisterRequest, MessageModel} from './models';

@injectable()
export class AuthService {
  private readonly log = LogFactory.createLogger('auth.service');

  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {}

  public async register(request: AuthRegisterRequest): Promise<MessageModel> {
    try {
      this.log.info(`Requesting authentication for email ${request.email}`);
      await this.userRepository.getAll();
      this.log.info(`Requested authentication for email ${request.email}`);
      return {message: 'tt'};
    } catch (e) {
      this.log.error(`Error while requesting authentication for email ${request.email}. Error: ${e}`);
      throw e;
    }
  }
}
