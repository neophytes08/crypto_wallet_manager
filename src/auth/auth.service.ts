import { Injectable } from '@nestjs/common';
import { Employee } from '@employee/employee.entity';
import { UserStatus } from '@core/enum';
import { EmployeeService } from '@employee/employee.service';
@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeeService) {
    //
  }

  async getCanLoginUser(userId: number) {
    let user: Employee = null;

    user = await this.employeeService.getCanLoginEmployeeByUserId(userId);

    const isActiveUser =
      user && [UserStatus.PENDING, UserStatus.ACTIVE].includes(user.status)
        ? true
        : false;

    return {
      isActiveUser,
      message:
        !user || user.status === UserStatus.DELETED
          ? 'Invalid Credentials'
          : user.status === UserStatus.DEACTIVATED
          ? 'Your account is deactivated. Please contact your administrator'
          : 'Invalid Credentials',
    };
  }
}
