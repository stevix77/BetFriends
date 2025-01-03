import { DomainEventAccessor } from '../../../shared/infrastructure/events/DomainEventAccessor';
import { InMemoryMemberRepository } from './repositories/InMemoryMemberRepository';
import { InMemoryBetRepository } from './repositories/InMemoryBetRepository';
import { InMemoryBetAnswerRepository } from './repositories/InMemoryBetAnswerRepository';
import { InMemoryOutboxAccessor } from './Outbox/InMemoryOutboxAccessor';
import { InMemoryRetrieveBetsDataAccess } from './repositories/InMemoryRetrieveBetsDataAccess';
import { CreateBetCommandHandler } from '../application/features/create-bet/CreateBetHandler';
import { IUserContext } from '../application/Abstractions/IUserContext';
import { IDateTimeProvider } from '../../../shared/domain/IDateTimeProvider';
import { RetrieveBetsQueryHandler } from '../application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { AnswerBetCommandHandler } from '../application/features/answer-bet/AnswerBetHandler';
import { CompleteBetCommandHandler } from '../application/features/complete-bet/CompleteBetHandler';
import { UpdateBalanceBookieHandler } from '../application/features/complete-bet/UpdateBalanceBookieHandler';
import { NotifyRequestersHandler } from '../application/features/create-bet/NotifyRequestersHandler';
import { UpdateBalanceGamblersHandler } from '../application/features/complete-bet/UpdateBalanceGamblersHandler';
import { DecreaseBalanceMemberHandler } from '../application/features/create-bet/DecreaseBalanceMemberHandler';
import { NotifyGamblersBetCompletedHandler } from '../application/features/complete-bet/NotifyGamblersBetCompletedHandler';
import { NotifyBetCompleted } from './notifiers/NotifyBetCompleted';
import { CreateMemberHandler } from '../application/features/userRegistered/CreateMemberHandler';
import { DomainEventDispatcher } from '../../../bets/src/infrastructure/events/DomainEventDispatcher';
import { DomainEventNotificationFactory } from './events/DomainEventNotificationFactory';
import { UpdateBalanceGamblerHandler } from '../application/features/answer-bet/UpdateBalanceGamblerHandler';
import { Mediator } from '../../../shared/infrastructure/Mediator';
import { UnitOfWorkBehavior } from '../../../shared/infrastructure/behaviors/UnitOfWorkBehavior';
import { InMemoryUnitOfWork } from '../../../shared/infrastructure/uow/InMemoryUnitOfWork';
import { RequestBehavior } from '../../../shared/infrastructure/behaviors/RequestBehavior';
import { LoggingBehavior } from '../../../shared/infrastructure/behaviors/LoggingBehavior';
import { BetModule } from './BetModule';
import { ProcessOutboxCommandHandler } from '../../../bets/src/infrastructure/outbox/ProcessOutboxCommand';
import { IntegrationEventFactory } from './integrationEvents/IntegrationEventFactory';
import { ICreateBetOutputPort } from '../../../bets/src/application/features/create-bet/CreateBetHandler';
import { IAnswerBetOutputPort } from '../../../bets/src/application/features/answer-bet/AnswerBetHandler';
import { ICompleteBetOutputPort } from '../../../bets/src/application/features/complete-bet/CompleteBetHandler';
import { IEventBus } from '../../../shared/infrastructure/events/IEventBus';
import { AddFriendCommandHandler, IAddFriendOutputPort } from '../application/features/add-friend/AddFriendHandler';
import { InMemoryFriendshipRepository } from './repositories/InMemoryFriendshipRepository';
import { IBetModule } from '../application/Abstractions/IBetModule';
export class BetModuleFactory {
    static Create(userContext: IUserContext,
                dateProvider: IDateTimeProvider,
                createBetPresenter: ICreateBetOutputPort,
                       answerBetPresenter: IAnswerBetOutputPort,
                       completeBetPresenter: ICompleteBetOutputPort,
                       addFriendPresenter: IAddFriendOutputPort,
                       eventBus: IEventBus): IBetModule {
        const domainEventAccessor = new DomainEventAccessor();
        const memberRepository = new InMemoryMemberRepository();
        const friendshipRepository = new InMemoryFriendshipRepository();
        const betRepository = new InMemoryBetRepository(domainEventAccessor);
        const answerBetRepository = new InMemoryBetAnswerRepository();
        const outboxAccessor = new InMemoryOutboxAccessor();
        const retrieveBetsDataAccess = new InMemoryRetrieveBetsDataAccess(betRepository, memberRepository, answerBetRepository)
        const createBetHandler = new CreateBetCommandHandler(betRepository, 
                                                            createBetPresenter,
                                                            memberRepository,
                                                            userContext,
                                                            dateProvider);
        const retrieveBetsHandler = new RetrieveBetsQueryHandler(retrieveBetsDataAccess, userContext);
        const answerBetHandler = new AnswerBetCommandHandler(betRepository, 
                                                            answerBetPresenter,
                                                            answerBetRepository,
                                                            userContext,
                                                            memberRepository,
                                                            dateProvider)
        const completeBetHandler = new CompleteBetCommandHandler(betRepository, 
                                                                completeBetPresenter, 
                                                                userContext)
        const updateBalanceBookieHandler = new UpdateBalanceBookieHandler(betRepository,
                                                                          memberRepository,
                                                                          answerBetRepository)
        const notifyRequesterHandler = new NotifyRequestersHandler();
        const addFriendHandler = new AddFriendCommandHandler(friendshipRepository, 
                                                            memberRepository, 
                                                            userContext, 
                                                            addFriendPresenter)
        const processOutboxHandler = new ProcessOutboxCommandHandler(outboxAccessor, 
                                                                    dateProvider, 
                                                                    new IntegrationEventFactory(), 
                                                                    eventBus)
        const updateBalanceGamblersHandler = new UpdateBalanceGamblersHandler(betRepository,
                                                                            memberRepository,
                                                                            answerBetRepository)
        const updateBalanceGamblerHandler = new UpdateBalanceGamblerHandler(memberRepository, betRepository)
        const decreaseBalanceMemberHandler = new DecreaseBalanceMemberHandler(memberRepository)
        const notifyGamblersBetCompletedHandler = new NotifyGamblersBetCompletedHandler(answerBetRepository, 
                                                                                    new NotifyBetCompleted(), 
                                                                                    memberRepository, 
                                                                                    betRepository)
        const createMemberHandler = new CreateMemberHandler(memberRepository)
        const domainEventDispatcher = new DomainEventDispatcher(domainEventAccessor, 
                                                                outboxAccessor,
                                                                dateProvider,
                                                                new DomainEventNotificationFactory(),
                                                                [
                                                                    updateBalanceGamblerHandler,
                                                                    updateBalanceBookieHandler,
                                                                    decreaseBalanceMemberHandler,
                                                                    updateBalanceGamblersHandler
                                                                ])
        const mediator = new Mediator([
            createBetHandler,
            completeBetHandler,
            answerBetHandler,
            retrieveBetsHandler,
            addFriendHandler,
            processOutboxHandler
        ], [
            notifyRequesterHandler,
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
    }
}