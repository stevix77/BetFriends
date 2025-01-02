import { Module, forwardRef } from '@nestjs/common';
import { AddFriendController } from './features/add-friend/AddFriend.controller';
import { AppModule } from 'src/app.module';
import { InMemoryFriendshipRepository } from '../../../../modules/bets/src/infrastructure/repositories/InMemoryFriendshipRepository'
import { AddFriendPresenter } from './features/add-friend/AddFriendPresenter';
import { AddFriendCommandHandler } from '../../../../modules/bets/src/application/features/add-friend/AddFriendHandler';
import { StubUserContext } from 'src/userContext/StubUserContext';
import { DomainEventDispatcher } from '../../../../modules/bets/src/infrastructure/events/DomainEventDispatcher';
import { IEventBus } from '../../../../modules/shared/infrastructure/events/IEventBus';
import { IDateTimeProvider } from '../../../../modules/shared/domain/IDateTimeProvider';
import { DomainEventAccessor } from '../../../../modules/shared/infrastructure/events/DomainEventAccessor';
import { BetModule } from '../../../../modules/bets/src/infrastructure/BetModule';
import { LoggingBehavior } from '../../../../modules/shared/infrastructure/behaviors/LoggingBehavior';
import { RequestBehavior } from '../../../../modules/shared/infrastructure/behaviors/RequestBehavior';
import { UnitOfWorkBehavior } from '../../../../modules/shared/infrastructure/behaviors/UnitOfWorkBehavior';
import { InMemoryUnitOfWork } from '../../../../modules/shared/infrastructure/uow/InMemoryUnitOfWork';
import { Mediator } from '../../../../modules/shared/infrastructure/Mediator';
import { IMemberRepository } from '../../../../modules/bets/src/domain/members/IMemberRepository';
import { BetsModule } from 'src/bet/bets.module';
import { IOutboxAccessor } from '../../../../modules/shared/infrastructure/outbox/IOutboxAccessor';

const domainEventAccessor = new DomainEventAccessor();
const friendshipRepository = new InMemoryFriendshipRepository();

@Module({
    controllers: [AddFriendController],
    imports: [forwardRef(() => AppModule), BetsModule],
    providers: [
        {
            provide: AddFriendPresenter,
            useFactory: () => new AddFriendPresenter()
        },
        {
            provide: DomainEventDispatcher,
            useFactory: (eventBus: IEventBus, 
                        dateTimeProvider: IDateTimeProvider,
                    outboxAccessor: IOutboxAccessor) => 
                new DomainEventDispatcher(domainEventAccessor, 
                                        outboxAccessor,
                                        dateTimeProvider,
                                        eventBus),
            inject: ['IEventBus', 'IDateTimeProvider', 'IOutboxAccessor']
        },
        {
            provide: 'IBetModule',
            useFactory: (domainEventDispatcher: DomainEventDispatcher,
                        addFriendPresenter: AddFriendPresenter,
                        userContext: StubUserContext,
                        memberRepository: IMemberRepository
            ) => {
                const addFriendHandler = new AddFriendCommandHandler(friendshipRepository, 
                                                                    memberRepository, 
                                                                    userContext, 
                                                                    addFriendPresenter)
                const mediator = new Mediator([addFriendHandler], [])
                const unitOfWorkBehavior = new UnitOfWorkBehavior(new InMemoryUnitOfWork(), domainEventDispatcher)
                const requestBehavior = new RequestBehavior(mediator)
                const loggingBehavior = new LoggingBehavior();
                loggingBehavior.SetNext(unitOfWorkBehavior).SetNext(requestBehavior)
                return new BetModule(loggingBehavior);
            },
            inject: [DomainEventDispatcher, 
                    AddFriendPresenter,
                    'IUserContext',
                    'IMemberRepository']
        }
    ]
})
export class FriendModule {}
