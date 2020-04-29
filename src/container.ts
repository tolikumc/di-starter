import {Container} from 'inversify';
import {AuthController} from './controllers/auth.controller';

import {AuthService} from './services/auth.service';
import {TYPES} from './types';
import {PingController} from './controllers/ping.controller';
import {UserRepository} from './repositories/user.repository';

const container = new Container();

// Controllers
container.bind<PingController>('PingController').to(PingController);
container.bind<AuthController>('AuthController').to(AuthController);

// Services
container.bind<AuthService>(TYPES.AuthService).to(AuthService);

// Repositories
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

export default container;
