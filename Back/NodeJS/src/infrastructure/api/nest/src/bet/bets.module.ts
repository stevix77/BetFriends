import { forwardRef, Module } from "@nestjs/common"
import { AppModule } from "src/app.module";
import { DateTimeProvider } from "src/DateTimeProvider";
import { FakeUserContext } from "src/FakeUserContext";
import { CreateBetCommandHandler } from "../../../../../application/features/create-bet/CreateBetHandler";
import { LoggingBehavior } from "../../../../behaviors/LoggingBehavior";
import { RequestBehavior } from "../../../../behaviors/RequestBehavior";
import { BetModule } from "../../../../BetModule";
import { InMemoryBetRepository } from "../../../../repositories/InMemoryBetRepository";
import { InMemoryMemberRepository } from "../../../../repositories/InMemoryMemberRepository";
import { CreateBetController } from "./features/create-bet/CreateBet.controller";
import { CreateBetPresenter } from './features/create-bet/CreateBetPresenter';
import { RetrieveBetsQueryHandler } from '../../../../../application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { InMemoryRetrieveBetsDataAccess } from "../../../../repositories/InMemoryRetrieveBetsDataAccess";
import { RetrieveBetsController } from "./features/retrieve-bets/RetrieveBets.controller";

@Module({
    controllers: [CreateBetController, RetrieveBetsController],
    imports: [forwardRef(() => AppModule)],
    providers: [
        {
            provide: CreateBetPresenter,
            useFactory: () => new CreateBetPresenter()
        },
        {
            provide: CreateBetCommandHandler,
            useFactory: (dateTimeProvider: DateTimeProvider,
                        memberRepository: InMemoryMemberRepository,
                        presenter: CreateBetPresenter,
                        userContext: FakeUserContext,
                        betRepository: InMemoryBetRepository) => 
                        new CreateBetCommandHandler(betRepository, 
                                                    presenter,
                                                    memberRepository,
                                                    userContext,
                                                    dateTimeProvider),
                        
            inject: [DateTimeProvider, 
                    InMemoryMemberRepository, 
                    CreateBetPresenter,
                    FakeUserContext,
                    InMemoryBetRepository]
        },
        {
            provide: RetrieveBetsQueryHandler,
            useFactory:(userContext: FakeUserContext,
                retrieveBetsDataAccess: InMemoryRetrieveBetsDataAccess) => new RetrieveBetsQueryHandler(retrieveBetsDataAccess, userContext),
            inject: [FakeUserContext, InMemoryRetrieveBetsDataAccess]
        },
        {
            provide: "IBetModule",
            useFactory: (createBetCommandHandler: CreateBetCommandHandler,
                        retrieveBetsQueryHandler: RetrieveBetsQueryHandler) => {
                const behavior = new LoggingBehavior().SetNext(new RequestBehavior([createBetCommandHandler, retrieveBetsQueryHandler]))
                return new BetModule(behavior)
            },
            inject: [CreateBetCommandHandler, RetrieveBetsQueryHandler]
        }
    ]
})
export class BetsModule {}