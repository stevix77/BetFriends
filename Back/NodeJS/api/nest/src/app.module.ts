import { forwardRef, Module, Scope } from '@nestjs/common';
import { Member } from '../../../modules/bets/src/domain/members/Member';
import { MemberId } from '../../../modules/bets/src/domain/members/MemberId';
import { InMemoryFriendshipRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryFriendshipRepository';
import { InMemoryMemberRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryMemberRepository';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateTimeProvider } from './DateTimeProvider';
import { StubUserContext } from './userContext/StubUserContext';
import { FriendModule } from './friend/friend.module';
import { InMemoryBetRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryBetRepository';
import { BetsModule } from './bet/bets.module';
import { InMemoryRetrieveBetsDataAccess } from '../../../modules/bets/src/infrastructure/repositories/InMemoryRetrieveBetsDataAccess';
import { InMemoryBetAnswerRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryBetAnswerRepository';
import { InMemoryOutboxRepository } from '../../../modules/bets/src/infrastructure/repositories/InMemoryOutboxRepository';
import { CommandFactory } from '../../../modules/bets/src/infrastructure/factories/CommandFactory';
import { DomainEventAccessor } from '../../../modules/shared/infrastructure/events/DomainEventAccessor';
import { BetModule } from '../../../modules/bets/src/infrastructure/BetModule';
import { IMediator, Mediator } from '../../../modules/bets/src/infrastructure/Mediator';
import { RequestBehavior } from '../../../modules/shared/infrastructure/behaviors/RequestBehavior';
import { LoggingBehavior } from '../../../modules/shared/infrastructure/behaviors/LoggingBehavior';
import { UnitOfWorkBehavior } from '../../../modules/shared/infrastructure/behaviors/UnitOfWorkBehavior';
import { DomainEventDispatcher } from '../../../modules/bets/src/infrastructure/events/DomainEventDispatcher';
import { IDateTimeProvider } from '../../../modules/shared/domain/IDateTimeProvider';
import { IOutboxRepository } from '../../../modules/bets/src/infrastructure/Outbox/IOutboxRepository';
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
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot(), FriendModule, BetsModule, UserModule],
  controllers: [AppController],
  exports: [InMemoryFriendshipRepository,
            InMemoryMemberRepository,
            InMemoryBetRepository,
            InMemoryRetrieveBetsDataAccess,
            'IUserContext',
            'IDateTimeProvider',
            'IAnswerBetRepository',
            'IOutboxRepository',
            'ICommandFactory',
            DomainEventAccessor,
            'IBetModule',
            'IMediator'
        ],
  providers: [
    AppService,
    ProcessOutboxJobs,
    {
      provide: InMemoryMemberRepository,
      useFactory: () => new InMemoryMemberRepository([
        new Member(new MemberId("11111111-1111-1111-1111-111111111111"), "member1", 1000, 5),
        new Member(new MemberId("adadadad-1111-6666-4444-edededededed"), "member2", 1000, 5)
      ]),
    },
    {
        provide: InMemoryFriendshipRepository,
        useFactory: () => new InMemoryFriendshipRepository()
    },
    {
      provide: InMemoryBetRepository,
      useFactory: (domainEventAccessor: DomainEventAccessor) => new InMemoryBetRepository(domainEventAccessor),
      inject: [DomainEventAccessor]
    },
    {
      provide: InMemoryRetrieveBetsDataAccess,
      useFactory: (betRepository: InMemoryBetRepository,
                    memberRepository: InMemoryMemberRepository,
                    answerBetRpository: InMemoryBetAnswerRepository) => new InMemoryRetrieveBetsDataAccess(betRepository, memberRepository, answerBetRpository),
      inject: [InMemoryBetRepository, InMemoryMemberRepository, 'IAnswerBetRepository'] 
    },
    {
      provide: 'IAnswerBetRepository',
      useClass: InMemoryBetAnswerRepository
    },
    {
        provide: 'IUserContext',
        useClass: FakeUserContext,
        scope: Scope.REQUEST
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
    {
      provide: 'IOutboxRepository',
      useClass: InMemoryOutboxRepository
    },
    {
      provide: 'ICommandFactory',
      useClass: CommandFactory
    },
    {
      provide: DomainEventAccessor,
      useClass: DomainEventAccessor
    },
    {
      provide: 'IMediator',
      useFactory: (loggingBehavior: LoggingBehavior) => new Mediator(loggingBehavior),
      inject: [LoggingBehavior]
    },
    {
      provide: LoggingBehavior,
      useFactory: (unitOfWorkBehavior: UnitOfWorkBehavior,
                  requestBehavior: RequestBehavior) => {
        const loggingBehavior = new LoggingBehavior();
        loggingBehavior.SetNext(unitOfWorkBehavior).SetNext(requestBehavior)
        return loggingBehavior
      },
      inject: [UnitOfWorkBehavior, RequestBehavior]
    },
    {
        provide: "IDomainEventDispatcher",
        useFactory: (domainEventAccessor: DomainEventAccessor,
                    outboxRepository: IOutboxRepository,
                    dtProvider: IDateTimeProvider,
                    eventBus: IEventBus) => 
                    new DomainEventDispatcher(domainEventAccessor,
                                              outboxRepository,
                                              dtProvider,
                                              eventBus),
        inject: [DomainEventAccessor, 'IOutboxRepository', 'IDateTimeProvider', 'IEventBus']
    },
    {
      provide: UnitOfWorkBehavior,
      useFactory: (domainEventDispatcher: IDomainEventDispatcher) => new UnitOfWorkBehavior(new InMemoryUnitOfWork(), domainEventDispatcher),
      inject: ["IDomainEventDispatcher"]
    },
    {
      provide: 'IBetModule',
      useFactory: (mediator: IMediator) => new BetModule(mediator),
      inject:['IMediator']
    },
    {
      provide: 'INotificationFactory',
      useClass: NotificationFactory
    },
    {
        provide: ProcessOutboxCommandHandler,
        useFactory: (outboxRepository: IOutboxRepository,
                    dateTimeProvider: IDateTimeProvider,
                    notificationFactory: INotificationFactory,
                    notifyGamblersBetCompletedHandler: NotifyGamblersBetCompletedHandler,
                    notifyRequestersHandler: NotifyRequestersHandler
        ) => new ProcessOutboxCommandHandler(outboxRepository, 
                                              dateTimeProvider, 
                                              notificationFactory, [
          notifyGamblersBetCompletedHandler,
          notifyRequestersHandler
        ]),
        inject: ['IOutboxRepository', 
              'IDateTimeProvider', 
              'INotificationFactory', 
              NotifyGamblersBetCompletedHandler,
              NotifyRequestersHandler]
    },
    {
        provide: RequestBehavior,
        useFactory: (createBetCommandHandler: CreateBetCommandHandler,
                    retrieveBetsQueryHandler: RetrieveBetsQueryHandler,
                    answerBetCommandHandler: AnswerBetCommandHandler,
                    completeBetCommandHandler: CompleteBetCommandHandler,
                    updateBalanceBookieHandler: UpdateBalanceBookieHandler,
                    updateBalanceGamblersHandler: UpdateBalanceGamblersHandler,
                    decreaseBalanceMemberHandler: DecreaseBalanceMemberHandler,
                    updateBalanceGamblerHandler: UpdateBalanceGamblerHandler,
                    processOutboxCommandHandler: ProcessOutboxCommandHandler,
                    addFriendCommandHandler: AddFriendCommandHandler) => {
            return new RequestBehavior([
                createBetCommandHandler, 
                retrieveBetsQueryHandler,
                answerBetCommandHandler,
                completeBetCommandHandler,
                processOutboxCommandHandler,
                addFriendCommandHandler
            ], [
                updateBalanceGamblersHandler,
                updateBalanceBookieHandler,
                decreaseBalanceMemberHandler,
                updateBalanceGamblerHandler
            ])
        },
        inject: [CreateBetCommandHandler, 
                RetrieveBetsQueryHandler,
                AnswerBetCommandHandler,
            CompleteBetCommandHandler,
            UpdateBalanceBookieHandler,
            UpdateBalanceGamblersHandler,
            DecreaseBalanceMemberHandler,
            UpdateBalanceGamblerHandler,
            ProcessOutboxCommandHandler,
            AddFriendCommandHandler
          ]
    }
  ],
})
export class AppModule {}
