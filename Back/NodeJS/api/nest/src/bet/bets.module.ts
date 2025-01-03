import { forwardRef, Module } from "@nestjs/common"
import { AppModule } from "src/app.module";
import { CreateBetCommandHandler } from "../../../../modules/bets/src/application/features/create-bet/CreateBetHandler";
import { DecreaseBalanceMemberHandler } from "../../../../modules/bets/src/application/features/create-bet/DecreaseBalanceMemberHandler";
import { InMemoryBetRepository } from "../../../../modules/bets/src/infrastructure/repositories/InMemoryBetRepository";
import { InMemoryMemberRepository } from "../../../../modules/bets/src/infrastructure/repositories/InMemoryMemberRepository";
import { CreateBetController } from "./features/create-bet/CreateBet.controller";
import { CreateBetPresenter } from './features/create-bet/CreateBetPresenter';
import { RetrieveBetsQueryHandler } from '../../../../modules/bets/src/application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { InMemoryRetrieveBetsDataAccess } from "../../../../modules/bets/src/infrastructure/repositories/InMemoryRetrieveBetsDataAccess";
import { RetrieveBetsController } from "./features/retrieve-bets/RetrieveBets.controller";
import { IUserContext } from "../../../../modules/bets/src/application/Abstractions/IUserContext";
import { IDateTimeProvider } from "../../../../modules/shared/domain/IDateTimeProvider";
import { AnswerBetController } from './features/answer-bet/AnswerBet.controller';
import { AnswerBetPresenter } from './features/answer-bet/AnswerBetPresenter';
import { AnswerBetCommandHandler } from '../../../../modules/bets/src/application/features/answer-bet/AnswerBetHandler';
import { CompleteBetCommandHandler } from "../../../../modules/bets/src/application/features/complete-bet/CompleteBetHandler";
import { CompleteBetPresenter } from "./features/complete-bet/CompleteBetPresenter";
import { UpdateBalanceGamblersHandler } from '../../../../modules/bets/src/application/features/complete-bet/UpdateBalanceGamblersHandler';
import { UpdateBalanceBookieHandler } from '../../../../modules/bets/src/application/features/complete-bet/UpdateBalanceBookieHandler';
import { UpdateBalanceGamblerHandler } from '../../../../modules/bets/src/application/features/answer-bet/UpdateBalanceGamblerHandler';
import { CompleteBetController } from './features/complete-bet/CompleteBet.controller';
import { BetCreatedListener } from "./listeners/betCreatedListener";
import { BetAnsweredListener } from "./listeners/betAnsweredListener";
import { BetCompletedListener } from "./listeners/betCompletedListener";
import { NotifyBetCompleted } from "../../../../modules/bets/src/infrastructure/notifiers/NotifyBetCompleted"
import { NotifyGamblersBetCompletedHandler } from "../../../../modules/bets/src/application/features/complete-bet/NotifyGamblersBetCompletedHandler";
import { NotifyRequestersHandler } from "../../../../modules/bets/src/application/features/create-bet/NotifyRequestersHandler";
import { INotifyBetCompleted } from "../../../../modules/bets/src/application/features/complete-bet/NotifyGamblersBetCompletedHandler"
import { Mediator } from "../../../../modules/shared/infrastructure/Mediator";
import { ProcessOutboxCommandHandler } from "../../../../modules/bets/src/infrastructure/Outbox/ProcessOutboxCommand";
import { DomainEventDispatcher } from "../../../../modules/bets/src/infrastructure/events/DomainEventDispatcher";
import { BetModule } from "../../../../modules/bets/src/infrastructure/BetModule";
import { UnitOfWorkBehavior } from "../../../../modules/shared/infrastructure/behaviors/UnitOfWorkBehavior";
import { InMemoryUnitOfWork } from "../../../../modules/shared/infrastructure/uow/InMemoryUnitOfWork";
import { LoggingBehavior } from "../../../../modules/shared/infrastructure/behaviors/LoggingBehavior";
import { RequestBehavior } from "../../../../modules/shared/infrastructure/behaviors/RequestBehavior";
import { DomainEventAccessor } from "../../../../modules/shared/infrastructure/events/DomainEventAccessor";
import { IEventBus } from "../../../../modules/shared/infrastructure/events/IEventBus";
import { InMemoryOutboxAccessor } from "../../../../modules/users/src/infrastructure/outbox/InMemoryOutboxAccessor";
import { InMemoryBetAnswerRepository } from "../../../../modules/bets/src/infrastructure/repositories/InMemoryBetAnswerRepository";
import { DomainEventNotificationFactory } from "../../../../modules/bets/src/infrastructure/events/DomainEventNotificationFactory";
import { IntegrationEventFactory } from "../../../../modules/bets/src/infrastructure/integrationEvents/IntegrationEventFactory";
import { BetsProcessOutboxJobs } from "./jobs/processOutboxJobs";
import { CreateMemberHandler } from '../../../../modules/bets/src/application/features/userRegistered/CreateMemberHandler';
import { UserRegisteredListener } from "./listeners/userRegisteredListener";

const domainEventAccessor = new DomainEventAccessor();
const memberRepository = new InMemoryMemberRepository();
const betRepository = new InMemoryBetRepository(domainEventAccessor);
const answerBetRepository = new InMemoryBetAnswerRepository();
const outboxAccessor = new InMemoryOutboxAccessor();
const retrieveBetsDataAccess = new InMemoryRetrieveBetsDataAccess(betRepository, memberRepository, answerBetRepository)

@Module({
    controllers: [CreateBetController, RetrieveBetsController, AnswerBetController, CompleteBetController],
    imports: [forwardRef(() => AppModule)],
    exports: ['IMemberRepository', 'IOutboxAccessor', 'BetsProcessOutboxCommandHandler'],
    providers: [
        BetsProcessOutboxJobs,
        BetCreatedListener, 
        BetAnsweredListener, 
        BetCompletedListener,
        UserRegisteredListener,
        {
            provide: 'IMemberRepository',
            useValue: memberRepository
        },
        {
            provide: 'IOutboxAccessor',
            useValue: outboxAccessor
        },
        {
            provide: CreateBetPresenter,
            useFactory: () => new CreateBetPresenter()
        },
        {
            provide: AnswerBetPresenter,
            useFactory: () => new AnswerBetPresenter()
        },
        {
            provide: CompleteBetPresenter,
            useFactory: () => new CompleteBetPresenter()
        },
        {
            provide: CreateBetCommandHandler,
            useFactory: (dateTimeProvider: IDateTimeProvider,
                        userContext: IUserContext,
                        createBetPresenter: CreateBetPresenter) => 
                        new CreateBetCommandHandler(betRepository, 
                                                    createBetPresenter,
                                                    memberRepository,
                                                    userContext,
                                                    dateTimeProvider),
                        
            inject: ['IDateTimeProvider', 
                    CreateBetPresenter,
                     'IUserContext'
                ]
        },
        {
            provide: RetrieveBetsQueryHandler,
            useFactory:(userContext: IUserContext) => 
                new RetrieveBetsQueryHandler(retrieveBetsDataAccess, userContext),
            inject: ['IUserContext']
        },
        {
            provide: AnswerBetCommandHandler,
            useFactory: (presenter: AnswerBetPresenter,
                        userContext: IUserContext,
                        dateTimeProvider: IDateTimeProvider
                        ) => new AnswerBetCommandHandler(betRepository, 
                                                        presenter,
                                                        answerBetRepository,
                                                        userContext,
                                                        memberRepository,
                                                        dateTimeProvider),
            inject: [AnswerBetPresenter,
                    'IUserContext',
                    'IDateTimeProvider'
                ]
        },
        {
            provide: CompleteBetCommandHandler,
            useFactory: (completeBetPresenter: CompleteBetPresenter, userContext: IUserContext) => 
                new CompleteBetCommandHandler(betRepository, completeBetPresenter, userContext),
            inject: [CompleteBetPresenter,
                    'IUserContext'
            ]
        },
        {
            provide: UpdateBalanceBookieHandler,
            useFactory: () => new UpdateBalanceBookieHandler(
                            betRepository,
                            memberRepository,
                            answerBetRepository)
        },
        {
            provide: NotifyRequestersHandler,
            useClass: NotifyRequestersHandler
        },
        {
            provide: UpdateBalanceGamblersHandler,
            useFactory: () => new UpdateBalanceGamblersHandler(
                            betRepository,
                            memberRepository,
                            answerBetRepository
                        ),
        },
        {
            provide: DecreaseBalanceMemberHandler,
            useFactory: () => new DecreaseBalanceMemberHandler(
                            memberRepository)
        },
        {
            provide: UpdateBalanceGamblerHandler,
            useFactory: () => 
                new UpdateBalanceGamblerHandler(memberRepository, betRepository)
        },
        {
            provide: NotifyGamblersBetCompletedHandler,
            useFactory: (notifyCompletBet: INotifyBetCompleted) => 
                new NotifyGamblersBetCompletedHandler(answerBetRepository, notifyCompletBet, memberRepository, betRepository),
            inject: [NotifyBetCompleted]
        },
        {
            provide: NotifyBetCompleted,
            useClass: NotifyBetCompleted
        },
        {
            provide: CreateMemberHandler,
            useClass: CreateMemberHandler
        },
        {
            provide: DomainEventDispatcher,
            useFactory: (dateTimeProvider: IDateTimeProvider,
                        updateBalanceGamblersHandler: UpdateBalanceGamblersHandler,
                        updateBalanceBookieHandler: UpdateBalanceBookieHandler,
                        decreaseBalanceMemberHandler: DecreaseBalanceMemberHandler,
                        updateBalanceGamblerHandler: UpdateBalanceGamblerHandler) => 
                new DomainEventDispatcher(domainEventAccessor, 
                                        outboxAccessor,
                                        dateTimeProvider,
                                        new DomainEventNotificationFactory(),
                                        [
                                            updateBalanceGamblersHandler,
                                            updateBalanceBookieHandler,
                                            decreaseBalanceMemberHandler,
                                            updateBalanceGamblerHandler
                                        ]),
            inject: ['IDateTimeProvider',
                    UpdateBalanceGamblersHandler,
                    UpdateBalanceBookieHandler,
                    DecreaseBalanceMemberHandler,
                    UpdateBalanceGamblerHandler
                ]
        },
        {
            provide: 'IBetModule',
            useFactory: (domainEventDispatcher: DomainEventDispatcher,
                        createBetCommandHandler: CreateBetCommandHandler,
                        completeBetCommandHandler: CompleteBetCommandHandler,
                        answerBetCommandHandler: AnswerBetCommandHandler,
                        retrieveBetsQueryHandler: RetrieveBetsQueryHandler,
                        notifyRequestersHandler: NotifyRequestersHandler,
                        updateBalanceGamblersHandler: UpdateBalanceGamblersHandler,
                        updateBalanceBookieHandler: UpdateBalanceBookieHandler,
                        decreaseBalanceMemberHandler: DecreaseBalanceMemberHandler,
                        updateBalanceGamblerHandler: UpdateBalanceGamblerHandler,
                        notifyGamblersBetCompletedHandler: NotifyGamblersBetCompletedHandler,
                        createMemberHandler: CreateMemberHandler
            ) => {
                const mediator = new Mediator([
                    createBetCommandHandler,
                    completeBetCommandHandler,
                    answerBetCommandHandler,
                    retrieveBetsQueryHandler
                ], [
                    notifyRequestersHandler,
                    updateBalanceGamblersHandler,
                    updateBalanceBookieHandler,
                    decreaseBalanceMemberHandler,
                    updateBalanceGamblerHandler,
                    notifyGamblersBetCompletedHandler,
                    createMemberHandler
                ])
                const unitOfWorkBehavior = new UnitOfWorkBehavior(new InMemoryUnitOfWork(), domainEventDispatcher)
                const requestBehavior = new RequestBehavior(mediator)
                const loggingBehavior = new LoggingBehavior();
                loggingBehavior.SetNext(unitOfWorkBehavior).SetNext(requestBehavior)
                return new BetModule(loggingBehavior);
            },
            inject: [
                DomainEventDispatcher,
                    CreateBetCommandHandler,
                    CompleteBetCommandHandler,
                    AnswerBetCommandHandler,
                    RetrieveBetsQueryHandler,
                    NotifyRequestersHandler,
                    UpdateBalanceGamblersHandler,
                    UpdateBalanceBookieHandler,
                    DecreaseBalanceMemberHandler,
                    UpdateBalanceGamblerHandler,
                    NotifyGamblersBetCompletedHandler,
                    CreateMemberHandler
                ]
        },
        {
            provide: 'BetsProcessOutboxCommandHandler',
            useFactory: (dateTimeProvider: IDateTimeProvider, 
                eventBus: IEventBus) => {
                const integrationEventFactory = new IntegrationEventFactory();
                return new ProcessOutboxCommandHandler(outboxAccessor, 
                                                        dateTimeProvider, 
                                                        integrationEventFactory, 
                                                        eventBus)
            },
            inject: ['IDateTimeProvider', 'IEventBus']
        }
    ]
})
export class BetsModule {}