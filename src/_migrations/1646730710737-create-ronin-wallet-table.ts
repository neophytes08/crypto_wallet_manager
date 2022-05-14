import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRoninWalletTable1646730710737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner);
    await this.createRoninWalletFK(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE if exists wallet cascade`);
  }

  async createTable(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'wallet',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'type',
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

  async createRoninWalletFK(queryRunner: QueryRunner) {
    await queryRunner.createForeignKey(
      'wallet',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }
}
