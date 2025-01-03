import { forwardRef, Module } from "@nestjs/common"
import { AppModule } from "src/app.module";
import { CreateBetController } from "./features/create-bet/CreateBet.controller";
import { CreateBetPresenter } from './features/create-bet/CreateBetPresenter';
import { RetrieveBetsController } from "./features/retrieve-bets/RetrieveBets.controller";
import { IUserContext } from "../../../../modules/bets/src/application/Abstractions/IUserContext";
import { IDateTimeProvider } from "../../../../modules/shared/domain/IDateTimeProvider";
import { AnswerBetController } from './features/answer-bet/AnswerBet.controller';
import { AnswerBetPresenter } from './features/answer-bet/AnswerBetPresenter';
import { CompleteBetPresenter } from "./features/complete-bet/CompleteBetPresenter";
import { CompleteBetController } from './features/complete-bet/CompleteBet.controller';
import { BetCreatedListener } from "./listeners/betCreatedListener";
import { BetAnsweredListener } from "./listeners/betAnsweredListener";
import { BetCompletedListener } from "./listeners/betCompletedListener";
import { IEventBus } from "../../../../modules/shared/infrastructure/events/IEventBus";
import { BetsProcessOutboxJobs } from "./jobs/processOutboxJobs";
import { UserRegisteredListener } from "./listeners/userRegisteredListener";
import { BetModuleFactory } from '../../../../modules/bets/src/infrastructure/BetModuleFactory';
import { AddFriendPresenter } from "./features/add-friend/AddFriendPresenter";
import { AddFriendController } from "./features/add-friend/AddFriend.controller";



@Module({
    controllers: [CreateBetController, 
                RetrieveBetsController, 
                AnswerBetController, 
                CompleteBetController,
                AddFriendController],
    imports: [forwardRef(() => AppModule)],
    exports: ['IBetModule'],
    providers: [
        BetsProcessOutboxJobs,
        BetCreatedListener, 
        BetAnsweredListener, 
        BetCompletedListener,
        UserRegisteredListener,
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
            provide: AddFriendPresenter,
            useFactory: () => new AddFriendPresenter()
        },
        {
            provide: 'IBetModule',
            useFactory: (createBetPresenter: CreateBetPresenter,
                       answerBetPresenter: AnswerBetPresenter,
                       completeBetPresenter: CompleteBetPresenter,
                       addFriendPresenter: AddFriendPresenter,
                       eventBus: IEventBus,
                       userContext: IUserContext,
                       dateProvider: IDateTimeProvider
                ) => BetModuleFactory.Create(userContext,
                                            dateProvider,
                                            createBetPresenter,
                                            answerBetPresenter,
                                            completeBetPresenter,
                                            addFriendPresenter,
                                            eventBus),
            inject: [CreateBetPresenter,
                AnswerBetPresenter,
                CompleteBetPresenter,
                AddFriendPresenter,
                'IEventBus',
                'IUserContext',
                'IDateTimeProvider'
            ]
        }
    ]
})
export class BetsModule {}