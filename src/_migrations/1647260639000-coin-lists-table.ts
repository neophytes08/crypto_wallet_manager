import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class coinListsTable1647260639000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'coin_list',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                  isNullable: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'symbol',
                    type: 'varchar',
                    isNullable: true
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE if exists coin_list cascade`);
    }

}
