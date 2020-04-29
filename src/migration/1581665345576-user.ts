import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Users1581665345576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
            width: 255
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
            width: 255
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            width: 255
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            width: 255
          },
          {
            name: 'createdAt',
            type: 'DateTime',
            isNullable: false
          },
          {
            name: 'updatedAt',
            type: 'DateTime',
            isNullable: false
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('user');
  }
}
