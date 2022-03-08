import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@user/user.entity';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<User> => {
    const request = await ctx.switchToHttp().getRequest();
    // console.log(request.headers)
    return request.user;
  },
);
