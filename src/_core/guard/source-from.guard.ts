import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { LoginFrom } from "@core/enum";

@Injectable()
export class SourceFromGuard implements CanActivate {
  constructor() {
    //
  }

  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();
    const { from, "device-id": deviceId } = headers;

    if (![LoginFrom.CMS, LoginFrom.MOBILE].includes(from)) {
      throw new ForbiddenException("Unknown source");
    }

    return true;
  }
}
