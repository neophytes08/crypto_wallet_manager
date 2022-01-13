import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class initialSetup1637674782586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUserTable(queryRunner);
    await this.createEmployeeTable(queryRunner);
    await this.createPasswordResetTable(queryRunner);
    await this.createPasswordResetIndex(queryRunner);
    await this.createActivityLogTable(queryRunner);
    await this.createUserSettingTable(queryRunner);
    await this.createRefreshTokenTable(queryRunner);
    await this.createDeviceTable(queryRunner);
    await this.createEmployeeFK(queryRunner);
    await this.createActivityLogFK(queryRunner);
    await this.createUserSettingFK(queryRunner);
    await this.createDeviceFK(queryRunner);
    await this.createRefreshTokenFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE if exists activity cascade`);
    await queryRunner.query(`DROP TABLE if exists password_reset cascade`);
    await queryRunner.query(`DROP TABLE if exists refresh_token cascade`);
    await queryRunner.query(`DROP TABLE if exists device cascade`);
    await queryRunner.query(`DROP TABLE if exists user_setting cascade`);
    await queryRunner.query(`DROP TABLE if exists employee cascade`);
    await queryRunner.query(`DROP TABLE if exists user cascade`);
  }

  async createUserTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'mobileNumber',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'smsAccessToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'salt',
            type: 'varchar',
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createEmployeeTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'employee',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'middleName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nameSuffix',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dateOfBirth',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'presentAddress',
            type: 'json',
          },
          {
            name: 'permanentAddress',
            type: 'json',
          },
          {
            name: 'mobileNumber',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'ACTIVE'",
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createPasswordResetTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'password_reset',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'expiration',
            type: 'varchar',
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createPasswordResetIndex(queryRunner: QueryRunner) {
    await queryRunner.createIndex(
      'password_reset',
      new TableIndex({
        name: 'IDX_PASSWORD_RESET_EMAIL',
        columnNames: ['email'],
      }),
    );
  }

  async createActivityLogTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'activity',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'ownerId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'editorId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'origin',
            type: 'varchar',
          },
          {
            name: 'details',
            type: 'varchar',
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createUserSettingTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user_setting',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'options',
            type: 'json',
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createRefreshTokenTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'deviceId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'rsaPublicKey',
            type: 'varchar',
          },
          {
            name: 'rsaPrivateKey',
            type: 'varchar',
          },
          {
            name: 'from',
            type: 'varchar',
          },
          {
            name: 'expiration',
            type: 'varchar',
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createDeviceTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'device',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'deviceType',
            type: 'varchar',
          },
          {
            name: 'registrationToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'os',
            type: 'varchar',
          },
          {
            name: 'osVersion',
            type: 'varchar',
          },
          {
            name: 'manufacturer',
            type: 'varchar',
          },
          {
            name: 'model',
            type: 'varchar',
          },
          {
            name: 'modelVersion',
            type: 'varchar',
          },
          {
            name: 'uuid',
            type: 'varchar',
          },
          {
            name: 'ipAddress',
            type: 'varchar',
          },
          {
            name: 'source',
            type: 'varchar',
          },
          {
            name: 'browser',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'removed'],
            default: "'active'",
          },
          {
            name: 'createDate',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updateDate',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  async createEmployeeFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'employee',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  async createActivityLogFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'activity',
      new TableForeignKey({
        columnNames: ['ownerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'activity',
      new TableForeignKey({
        columnNames: ['editorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  async createUserSettingFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'user_setting',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  async createDeviceFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'device',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }
  async createRefreshTokenFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'refresh_token',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'refresh_token',
      new TableForeignKey({
        columnNames: ['deviceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'device',
        onDelete: 'CASCADE',
      }),
    );
  }
}
