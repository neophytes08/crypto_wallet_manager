import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Activity } from "./activity.entity";
import { ActivityCreateDto } from "./dto/activity.create.dto";
import { format } from "date-fns";
import { User } from "@user/user.entity";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //
  }

  async createActivity(data: ActivityCreateDto) {
    const { owner, editor, origin, details } = data;
    const activity = Object.assign(new Activity(), {
      owner,
      editor,
      origin,
      details,
      createDate: format(Date.now(), "yyyy/MM/dd hh:mm:ss aa"),
    });

    return await this.activityRepository.save(activity);
  }
}
