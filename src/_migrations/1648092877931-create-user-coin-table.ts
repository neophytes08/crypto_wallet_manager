import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUserCoinTable1648092877931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner);
    await this.createUserCoinFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE if exists user_coin cascade`);
  }

  async createTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user_coin',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'coin_id',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'int',
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

  async createUserCoinFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'user_coin',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }
}
