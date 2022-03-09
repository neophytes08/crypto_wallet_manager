import { UserActivity } from "@core/enum";
import { User } from "@user/user.entity";

export interface ActivityLog {
  owner: User;
  editor: User;
  origin: string;
  details: UserActivity;
}