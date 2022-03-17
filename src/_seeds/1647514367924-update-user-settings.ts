import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserSetting } from '@user/user-setting.entity';
import { User } from '@user/user.entity';

export class updateUserSettings1647514367924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();

    for (const user of users) {
      // check if already have
      const check = await this._checkUserSetting(queryRunner, user);
      if (!check) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(UserSetting)
          .values({
            user,
            options: {
              isBiometricEnabled: false,
              isDarkModeEnabled: false,
              defaultCurrency: 'PHP',
            },
          })
          .execute();
      }
    }
  }

  public async down(): Promise<boolean> {
    return true;
  }

  async _checkUserSetting(queryRunner: QueryRunner, user: any) {
    return queryRunner.manager
      .getRepository(UserSetting)
      .createQueryBuilder('user_setting')
      .where({ user })
      .getOne();
  }
}
