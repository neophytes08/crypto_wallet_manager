import { Module } from '@nestjs/common';
import { EventListenerService } from './event-listener.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EventListenerService],
  exports: [],
})
export class EventListenerModule {}
