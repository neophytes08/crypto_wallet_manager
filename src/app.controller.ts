import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {
    //
  }
  @Get()
  init(): boolean {
    return true;
  }
}
