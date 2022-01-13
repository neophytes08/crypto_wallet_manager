import { UserStatus } from '@core/enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    //
  }

  async getCanLoginEmployeeByUserId(userId: number) {
    return await this.employeeRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
        status: Not(UserStatus.DELETED),
      },
    });
  }
}
