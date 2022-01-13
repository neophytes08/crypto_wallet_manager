import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '@user/user.entity';
import { Employee } from '@employee/employee.entity';
import { admin } from './data';

export class addEmployeeAdmin1637675576352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await this._seedUser(queryRunner);
    await this._seedEmployee(queryRunner, user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE`);
    await queryRunner.query('TRUNCATE TABLE employee CASCADE');
  }

  private async _seedUser(queryRunner: QueryRunner) {
    const { identifiers } = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(admin.user)
      .execute();

    return identifiers[0] as User;
  }

  private async _seedEmployee(queryRunner: QueryRunner, user: User) {
    return await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Employee)
      .values({
        ...admin.employee,
        user,
      })
      .execute();
  }
}
