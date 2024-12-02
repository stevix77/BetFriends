import { forwardRef, Module } from "@nestjs/common"
import { AppModule } from "src/app.module";
import { CreateBetCommandHandler } from "../../../../../application/features/create-bet/CreateBetHandler";
import { LoggingBehavior } from "../../../../behaviors/LoggingBehavior";
import { RequestBehavior } from "../../../../behaviors/RequestBehavior";
import { UnitOfWorkBehavior } from "../../../../behaviors/UnitOfWorkBehavior";
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
import { CompleteBetCommandHandler } from "../../../../../application/features/complete-bet/CompleteBetHandler";
import { CompleteBetPresenter } from "./features/complete-bet/CompleteBetPresenter";
import { IMediator } from "../../../../Mediator";
import { BetCompletedCommandHandler } from "../../../../handlers/commands/BetCompletedCommand";
import { UpdateBalanceGamblersHandler } from '../../../../../application/features/complete-bet/UpdateBalanceGamblersHandler';
import { UpdateBalanceBookieHandler } from '../../../../../application/features/complete-bet/UpdateBalanceBookieHandler';
import { CompleteBetController } from './features/complete-bet/CompleteBet.controller';
import { BetCreatedListener } from "./listeners/betCreatedListener";

const completeBetPresenter = new CompleteBetPresenter();
const createBetPresenter = new CreateBetPresenter();
const answerBetPresenter = new AnswerBetPresenter();

@Module({
    controllers: [CreateBetController, RetrieveBetsController, AnswerBetController, CompleteBetController],
    imports: [forwardRef(() => AppModule)],
    exports: [RequestBehavior],
    providers: [BetCreatedListener,
        {
            provide: CreateBetPresenter,
            useValue: createBetPresenter
        },
        {
            provide: AnswerBetPresenter,
            useValue: answerBetPresenter
        },
        {
            provide: CompleteBetPresenter,
            useValue: completeBetPresenter
        },
        {
            provide: CreateBetCommandHandler,
            useFactory: (dateTimeProvider: IDateTimeProvider,
                        memberRepository: InMemoryMemberRepository,
                        userContext: IUserContext,
                        betRepository: InMemoryBetRepository) => 
                        new CreateBetCommandHandler(betRepository, 
                                                    createBetPresenter,
                                                    memberRepository,
                                                    userContext,
                                                    dateTimeProvider),
                        
            inject: ['IDateTimeProvider', 
                    InMemoryMemberRepository,
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
            provide: CompleteBetCommandHandler,
            useFactory: (betRepository: IBetRepository,
                        userContext: IUserContext
            ) => new CompleteBetCommandHandler(betRepository, completeBetPresenter, userContext),
            inject: [InMemoryBetRepository,
                    'IUserContext'
            ]
        },
        {
            provide: BetCompletedCommandHandler,
            useFactory: (mediator: IMediator) => new BetCompletedCommandHandler(mediator),
            inject: ['IMediator']
        },
        {
            provide: UpdateBalanceGamblersHandler,
            useFactory: (betRepository: IBetRepository,
                        answerBetRepository: IAnswerBetRepository,
                        memberRepository: IMemberRepository) => new UpdateBalanceGamblersHandler(
                            betRepository,
                            memberRepository,
                            answerBetRepository
                        ),
            inject: [InMemoryBetRepository, 'IAnswerBetRepository', InMemoryMemberRepository]
        },
        {
            provide: UpdateBalanceBookieHandler,
            useFactory: (betRepository: IBetRepository,
                        answerBetRepository: IAnswerBetRepository,
                        memberRepository: IMemberRepository) => new UpdateBalanceBookieHandler(
                            betRepository,
                            memberRepository,
                            answerBetRepository
                        ),
            inject: [InMemoryBetRepository, 'IAnswerBetRepository', InMemoryMemberRepository]
        },
        {
            provide: RequestBehavior,
            useFactory: (createBetCommandHandler: CreateBetCommandHandler,
                        retrieveBetsQueryHandler: RetrieveBetsQueryHandler,
                        answerBetCommandHandler: AnswerBetCommandHandler,
                        completeBetCommandHandler: CompleteBetCommandHandler,
                        updateBalanceBookieHandler: UpdateBalanceBookieHandler,
                        updateBalanceGamblersHandler: UpdateBalanceGamblersHandler) => {
                return new RequestBehavior([
                    createBetCommandHandler, 
                    retrieveBetsQueryHandler,
                    answerBetCommandHandler,
                    completeBetCommandHandler
                ], [
                    updateBalanceGamblersHandler,
                    updateBalanceBookieHandler
                ])
            },
            inject: [CreateBetCommandHandler, 
                    RetrieveBetsQueryHandler,
                    AnswerBetCommandHandler,
                CompleteBetCommandHandler,
                UpdateBalanceBookieHandler,
                UpdateBalanceGamblersHandler]
        }
    ]
})
export class BetsModule {}