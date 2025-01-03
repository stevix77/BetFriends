import { Module } from '@nestjs/common';
import { DateTimeProvider } from './DateTimeProvider';
import { FriendModule } from './friend/friend.module';
import { BetsModule } from './bet/bets.module';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { FakeUserContext } from './userContext/FakeUserContext';
import { EventBus } from './events/eventBus';
import { UserModule } from './user/user.module';

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot(), UserModule, FriendModule, BetsModule],
  controllers: [],
  exports: ['IEventBus', 'IDateTimeProvider', 'IUserContext'],
  providers: [
    {
        provide: 'IUserContext',
        useClass: FakeUserContext,
    },
    {
      provide: 'IEventBus',
      useFactory: (eventEmitter: EventEmitter2) => new EventBus(eventEmitter),
      inject: [EventEmitter2] 
    },
    {
      provide: 'IDateTimeProvider',
      useClass: DateTimeProvider
    },
  ],
})
export class AppModule {}
