import { forwardRef, Module } from '@nestjs/common';
import { Member } from '../../../../domain/members/Member';
import { MemberId } from '../../../../domain/members/MemberId';
import { InMemoryFriendshipRepository } from '../../../repositories/InMemoryFriendshipRepository';
import { InMemoryMemberRepository } from '../../../repositories/InMemoryMemberRepository';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateTimeProvider } from './DateTimeProvider';
import { FakeUserContext } from './FakeUserContext';
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
import { ICommandFactory } from '../../../factories/ICommandFactory';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot(), FriendModule, BetsModule],
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
        useClass: FakeUserContext
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
                    eventEmitter: EventEmitter2,
                    commandFactory: ICommandFactory) => 
                    new DomainEventDispatcher(domainEventAccessor,
                                              commandFactory,
                                              outboxRepository,
                                              dtProvider,
                                              eventEmitter),
        inject: [DomainEventAccessor, 'IOutboxRepository', 'IDateTimeProvider', EventEmitter2, 'ICommandFactory']
    },
    {
      provide: UnitOfWorkBehavior,
      useFactory: (domainEventDispatcher: IDomainEventDispatcher) => new UnitOfWorkBehavior(undefined, domainEventDispatcher),
      inject: ["IDomainEventDispatcher"]
    },
    {
      provide: 'IBetModule',
      useFactory: (mediator: IMediator) => new BetModule(mediator),
      inject:['IMediator']
    }
  ],
})
export class AppModule {}
