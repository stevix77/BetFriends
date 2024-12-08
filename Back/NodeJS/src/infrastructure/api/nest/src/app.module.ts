import { forwardRef, Module, Scope } from '@nestjs/common';
import { Member } from '../../../../domain/members/Member';
import { MemberId } from '../../../../domain/members/MemberId';
import { InMemoryFriendshipRepository } from '../../../repositories/InMemoryFriendshipRepository';
import { InMemoryMemberRepository } from '../../../repositories/InMemoryMemberRepository';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateTimeProvider } from './DateTimeProvider';
import { StubUserContext } from './userContext/StubUserContext';
import { FriendModule } from './friend/friend.module';
import { InMemoryBetRepository } from '../../../repositories/InMemoryBetRepository';
import { BetsModule } from './bet/bets.module';
import { InMemoryRetrieveBetsDataAccess } from '../../../repositories/InMemoryRetrieveBetsDataAccess';
import { InMemoryBetAnswerRepository } from '../../../repositories/InMemoryBetAnswerRepository';
import { InMemoryOutboxRepository } from '../../../repositories/InMemoryOutboxRepository';
import { CommandFactory } from '../../../factories/CommandFactory';
import { DomainEventAccessor } from '../../../events/DomainEventAccessor';
import { BetModule } from '../../../BetModule';
import { IMediator, Mediator } from '../../../Mediator';
import { RequestBehavior } from '../../../behaviors/RequestBehavior';
import { LoggingBehavior } from '../../../behaviors/LoggingBehavior';
import { UnitOfWorkBehavior } from '../../../behaviors/UnitOfWorkBehavior';
import { DomainEventDispatcher } from '../../../events/DomainEventDispatcher';
import { IDateTimeProvider } from '../../../../domain/IDateTimeProvider';
import { IOutboxRepository } from '../../../Outbox/IOutboxRepository';
import { IDomainEventDispatcher } from '../../../events/IDomainEventDispatcher';
import { InMemoryUnitOfWork } from '../../../uow/InMemoryUnitOfWork';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ProcessOutboxJobs } from './jobs/processOutboxJobs';
import { AnswerBetCommandHandler } from '../../../../application/features/answer-bet/AnswerBetHandler';
import { UpdateBalanceGamblerHandler } from '../../../../application/features/answer-bet/UpdateBalanceGamblerHandler';
import { CompleteBetCommandHandler } from '../../../../application/features/complete-bet/CompleteBetHandler';
import { UpdateBalanceBookieHandler } from '../../../../application/features/complete-bet/UpdateBalanceBookieHandler';
import { UpdateBalanceGamblersHandler } from '../../../../application/features/complete-bet/UpdateBalanceGamblersHandler';
import { CreateBetCommandHandler } from '../../../../application/features/create-bet/CreateBetHandler';
import { DecreaseBalanceMemberHandler } from '../../../../application/features/create-bet/DecreaseBalanceMemberHandler';
import { RetrieveBetsQueryHandler } from '../../../../application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { ProcessOutboxCommandHandler } from '../../../Outbox/ProcessOutboxCommand';
import { AddFriendCommandHandler } from '../../../../application/features/add-friend/AddFriendHandler';
import { FakeUserContext } from './userContext/FakeUserContext';
import { EventBus } from './events/eventBus';
import { IEventBus } from '../../../events/IEventBus';
import { NotifyGamblersBetCompletedHandler } from '../../../../application/features/complete-bet/NotifyGamblersBetCompletedHandler';
import { INotificationFactory, NotificationFactory } from '../../../factories/NotificationFactory';
import { NotifyRequestersHandler } from '../../../../application/features/create-bet/NotifyRequestersHandler';

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot(), FriendModule, BetsModule],
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
