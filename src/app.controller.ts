import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {
    //
  }
  @Get()
  @ApiExcludeEndpoint()
  init(): boolean {
    return true;
  }
}
