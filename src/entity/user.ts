import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Index('UQ_cace4a159ff9f2512dd42373760', ['id'], {unique: true})
@Index('UQ_e12875dfb3b1d92d7d7c5377e22', ['email'], {unique: true})
@Entity('user', {schema: 'oasis-dev-stage'})
export class User {
  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number;

  @Column('varchar', {name: 'firstName', length: 255})
  firstName: string;

  @Column('varchar', {name: 'lastName', length: 255})
  lastName: string;

  @Column('varchar', {name: 'email', unique: true, length: 255})
  email: string;

  @Column('varchar', {name: 'password', length: 255})
  password: string;

  @Column('datetime', {name: 'createdAt'})
  createdAt: Date;

  @Column('datetime', {name: 'updatedAt'})
  updatedAt: Date;
}
