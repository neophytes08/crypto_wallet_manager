import { ActivityLog } from './_activity-log.interface';

export interface LoginSuccess {
  activity: ActivityLog;
}

export interface LogoutSuccess {
  activity: ActivityLog;
}

export interface PasswordVerificationSuccess {
  activity: ActivityLog;
}
