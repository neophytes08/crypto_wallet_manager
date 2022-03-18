import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { ActivityCreateDto } from './dto/activity.create.dto';
import { format } from 'date-fns';
import { User } from '@user/user.entity';
import { ActivityListDto } from './dto/activity.list.dto';
import { ActivityDto } from './dto/activity.dto';

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
      createDate: format(Date.now(), 'yyyy/MM/dd hh:mm:ss aa'),
    });

    return await this.activityRepository.save(activity);
  }

  async getClientActivity(
    ownerId: number,
    skip: number,
    take: number,
    dateRange?: { from: string; to: string },
  ): Promise<ActivityListDto> {
    const transactions: ActivityDto[] = [];
    const dateWhere = dateRange
      ? 'DATE(activity.createDate) BETWEEN :start AND :end'
      : '1=1';

    const [data, count] = (await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.editor', 'editor')
      .leftJoinAndSelect('activity.owner', 'owner')
      .select(['activity', 'owner', 'editor'])
      .where(
        '( activity.ownerId = :ownerId OR activity.editorId = :ownerId )',
        {
          ownerId,
        },
      )
      .andWhere(
        dateWhere,
        dateRange ? { start: dateRange.from, end: dateRange.to } : {},
      )
      .orderBy('activity.createDate', 'DESC')
      .offset(skip)
      .limit(take)
      .getManyAndCount()) as unknown as [Array<Record<string, any>>, number];

    for (const trans of data) {
      const { editor, owner } = trans;

      transactions.push({
        id: trans.id,
        origin: trans.origin,
        details: trans.details,
        ownerId: owner?.id,
        editorId: editor?.id,
        ownerName: `${editor?.name}`,
        editorName: editor === null ? `${owner.name}` : `${editor?.name}`,
        createDate: trans.createDate,
        updateDate: trans.updateDate,
      });
    }

    return {
      count,
      data: transactions,
    };
  }
}
