import {injectable} from 'inversify';
import {getRepository} from 'typeorm';
import {User} from '../entity/user';
import {ensureConnection} from './connection';

@injectable()
export class UserRepository {
  public async getByEmail(email: string): Promise<User> {
    await ensureConnection();
    return getRepository(User).findOne({where: {email}});
  }

  public async getById(id: number): Promise<User> {
    await ensureConnection();
    return getRepository(User).findOne({where: {id}});
  }

  public async getAll(): Promise<User[]> {
    await ensureConnection();
    return getRepository(User).find();
  }

  public async save(user: User): Promise<User> {
    await ensureConnection();
    return getRepository(User).save(user);
  }
}
