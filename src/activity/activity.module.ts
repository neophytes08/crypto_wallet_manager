import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "./activity.entity";
import { ActivityService } from "./activity.service";
import { ActivityController } from "./activity.controller";
import { User } from "@user/user.entity";
import { UserModule } from "@user/user.module";

@Global()
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Activity, User]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService, TypeOrmModule],
})
export class ActivityModule {}
