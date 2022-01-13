import { Global, Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { UserModule } from '@user/user.module';

@Global()
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService, TypeOrmModule],
})
export class EmployeeModule {}
