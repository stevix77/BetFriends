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
import { IUserContext } from "../../../../../application/Abstractions/IUserContext";
import { IDateTimeProvider } from "../../../../../domain/IDateTimeProvider";
import { AnswerBetController } from './features/answer-bet/AnswerBet.controller';
import { AnswerBetPresenter } from './features/answer-bet/AnswerBetPresenter';
import { AnswerBetCommandHandler, IAnswerBetOutputPort } from '../../../../../application/features/answer-bet/AnswerBetHandler';
import { IBetRepository } from "../../../../../domain/bets/IBetRepository";
import { IAnswerBetRepository } from "../../../../../domain/answerBets/IAnswerBetRepository";
import { IMemberRepository } from "../../../../../domain/members/IMemberRepository";

@Module({
    controllers: [CreateBetController, RetrieveBetsController, AnswerBetController],
    imports: [forwardRef(() => AppModule)],
    providers: [
        {
            provide: CreateBetPresenter,
            useFactory: () => new CreateBetPresenter()
        },
        {
            provide: AnswerBetPresenter,
            useFactory: () => new AnswerBetPresenter()
        },
        {
            provide: CreateBetCommandHandler,
            useFactory: (dateTimeProvider: IDateTimeProvider,
                        memberRepository: InMemoryMemberRepository,
                        presenter: CreateBetPresenter,
                        userContext: IUserContext,
                        betRepository: InMemoryBetRepository) => 
                        new CreateBetCommandHandler(betRepository, 
                                                    presenter,
                                                    memberRepository,
                                                    userContext,
                                                    dateTimeProvider),
                        
            inject: ['IDateTimeProvider', 
                    InMemoryMemberRepository, 
                    CreateBetPresenter,
                    'IUserContext',
                    InMemoryBetRepository]
        },
        {
            provide: RetrieveBetsQueryHandler,
            useFactory:(userContext: IUserContext,
                retrieveBetsDataAccess: InMemoryRetrieveBetsDataAccess) => new RetrieveBetsQueryHandler(retrieveBetsDataAccess, userContext),
            inject: ['IUserContext', InMemoryRetrieveBetsDataAccess]
        },
        {
            provide: AnswerBetCommandHandler,
            useFactory: (betRepository: IBetRepository,
                        presenter: IAnswerBetOutputPort,
                        answerBetRepository: IAnswerBetRepository,
                        userContext: IUserContext,
                        memberRepository: IMemberRepository,
                        dateTimeProvider: IDateTimeProvider
                        ) => new AnswerBetCommandHandler(betRepository, 
                                                        presenter,
                                                        answerBetRepository,
                                                        userContext,
                                                        memberRepository,
                                                        dateTimeProvider),
            inject: [InMemoryBetRepository, 
                    AnswerBetPresenter,
                    'IAnswerBetRepository',
                    'IUserContext',
                    InMemoryMemberRepository,
                    'IDateTimeProvider'
                ]
        },
        {
            provide: "IBetModule",
            useFactory: (createBetCommandHandler: CreateBetCommandHandler,
                        retrieveBetsQueryHandler: RetrieveBetsQueryHandler,
                        answerBetCommandHandler: AnswerBetCommandHandler) => {
                const behavior = new LoggingBehavior()
                                    .SetNext(new RequestBehavior([
                                        createBetCommandHandler, 
                                        retrieveBetsQueryHandler,
                                        answerBetCommandHandler
                                    ]))
                return new BetModule(behavior)
            },
            inject: [CreateBetCommandHandler, 
                    RetrieveBetsQueryHandler,
                    AnswerBetCommandHandler]
        }
    ]
})
export class BetsModule {}