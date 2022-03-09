import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ActivityService } from "@activity/activity.service";
import {
  LoginSuccess, RoninCreateWalletSuccess,
} from "./interface";

@Injectable()
export class EventListenerService {
  constructor(
    private activityService: ActivityService,
  ) {
    //
  }

  /**
   * AUTH LOGIN
   */
  @OnEvent("login.success")
  async onLoginSuccessLogActivity(payload: LoginSuccess) {
    await this.activityService.createActivity(payload.activity);
  }

  /**
   * RONIN
   */
   @OnEvent("ronin-create-wallet.success")
   async onRoninCreateWalletSuccessLogActivity(payload: RoninCreateWalletSuccess) {
     await this.activityService.createActivity(payload.activity);
   }
}
