import { UserType } from '@core/enum';
import * as bcrypt from 'bcrypt';

const SALT = bcrypt.genSaltSync(10);

const user = {
  mobileNumber: process.env.ADMIN_MOBILE_NUMBER,
  username: process.env.ADMIN_USERNAME,
  email: process.env.ADMIN_EMAIL,
  password: bcrypt.hashSync(
    process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : '',
    SALT,
  ),
  type: UserType.EMPLOYEE,
  deviceId: null,
  salt: SALT,
};

const employee = {
  lastName: 'admin',
  firstName: 'admin',
  middleName: 'admin',
  dateOfBirth: '1994-12-30',
  gender: 'MALE',
  mobileNumber: process.env.ADMIN_MOBILE_NUMBER,
  username: process.env.ADMIN_USERNAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  presentAddress: {
    street: 'string',
    barangay: 'string',
    city: 'string',
    province: 'string',
    country: 'string',
  },
  permanentAddress: {
    street: 'string',
    barangay: 'string',
    city: 'string',
    province: 'string',
    country: 'string',
  },
};

export const admin = {
  user,
  employee,
};
