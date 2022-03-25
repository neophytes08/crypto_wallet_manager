import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserNameColumn1648214796989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);

    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" varchar DEFAULT NULL
        `,
    );
  }

  public async down(): Promise<boolean> {
    return true;
  }
}
