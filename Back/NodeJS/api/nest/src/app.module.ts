import { forwardRef, Module, Scope } from '@nestjs/common';
import { Member } from '../../../modules/bets/src/domain/members/Member';
import { MemberId } from '../../../modules/bets/src/domain/members/MemberId';
import { InMemoryFriendshipRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryFriendshipRepository';
import { InMemoryMemberRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryMemberRepository';
import { DateTimeProvider } from './DateTimeProvider';
import { StubUserContext } from './userContext/StubUserContext';
import { FriendModule } from './friend/friend.module';
import { InMemoryBetRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryBetRepository';
import { BetsModule } from './bet/bets.module';
import { InMemoryRetrieveBetsDataAccess } from '../../../modules/bets/src/infrastructure/repositories/InMemoryRetrieveBetsDataAccess';
import { InMemoryBetAnswerRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryBetAnswerRepository';
import { CommandFactory } from '../../../modules/bets/src/infrastructure/factories/CommandFactory';
import { DomainEventAccessor } from '../../../modules/shared/infrastructure/events/DomainEventAccessor';
import { BetModule } from '../../../modules/bets/src/infrastructure/BetModule';
import { IMediator, Mediator } from '../../../modules/shared/infrastructure/Mediator';
import { RequestBehavior } from '../../../modules/shared/infrastructure/behaviors/RequestBehavior';
import { LoggingBehavior } from '../../../modules/shared/infrastructure/behaviors/LoggingBehavior';
import { UnitOfWorkBehavior } from '../../../modules/shared/infrastructure/behaviors/UnitOfWorkBehavior';
import { DomainEventDispatcher } from '../../../modules/bets/src/infrastructure/events/DomainEventDispatcher';
import { IDateTimeProvider } from '../../../modules/shared/domain/IDateTimeProvider';
import { IDomainEventDispatcher } from '../../../modules/shared/infrastructure/events/IDomainEventDispatcher';
import { InMemoryUnitOfWork } from '../../../modules/shared/infrastructure/uow/InMemoryUnitOfWork';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ProcessOutboxJobs } from './jobs/processOutboxJobs';
import { AnswerBetCommandHandler } from '../../../modules/bets/src/application/features/answer-bet/AnswerBetHandler';
import { UpdateBalanceGamblerHandler } from '../../../modules/bets/src/application/features/answer-bet/UpdateBalanceGamblerHandler';
import { CompleteBetCommandHandler } from '../../../modules/bets/src/application/features/complete-bet/CompleteBetHandler';
import { UpdateBalanceBookieHandler } from '../../../modules/bets/src/application/features/complete-bet/UpdateBalanceBookieHandler';
import { UpdateBalanceGamblersHandler } from '../../../modules/bets/src/application/features/complete-bet/UpdateBalanceGamblersHandler';
import { CreateBetCommandHandler } from '../../../modules/bets/src/application/features/create-bet/CreateBetHandler';
import { DecreaseBalanceMemberHandler } from '../../../modules/bets/src/application/features/create-bet/DecreaseBalanceMemberHandler';
import { RetrieveBetsQueryHandler } from '../../../modules/bets/src/application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { ProcessOutboxCommandHandler } from '../../../modules/bets/src/infrastructure/Outbox/ProcessOutboxCommand';
import { AddFriendCommandHandler } from '../../../modules/bets/src/application/features/add-friend/AddFriendHandler';
import { FakeUserContext } from './userContext/FakeUserContext';
import { EventBus } from './events/eventBus';
import { IEventBus } from '../../../modules/shared/infrastructure/events/IEventBus';
import { NotifyGamblersBetCompletedHandler } from '../../../modules/bets/src/application/features/complete-bet/NotifyGamblersBetCompletedHandler';
import { INotificationFactory, NotificationFactory } from '../../../modules/bets/src/infrastructure/factories/NotificationFactory';
import { NotifyRequestersHandler } from '../../../modules/bets/src/application/features/create-bet/NotifyRequestersHandler';
import { UserModule } from './user/user.module';
import { IOutboxAccessor } from '../../../modules/shared/infrastructure/outbox/IOutboxAccessor';
import { IBetModule } from '../../../modules/bets/src/application/Abstractions/IBetModule';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot(), UserModule, FriendModule, BetsModule],
  controllers: [],
  exports: ['IEventBus', 'IDateTimeProvider', 'IUserContext'],
  providers: [
    ProcessOutboxJobs,
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
