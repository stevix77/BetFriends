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
import { AnswerBetCommandHandler, IAnswerBetOutputPort } from '../../../../modules/bets/src/application/features/answer-bet/AnswerBetHandler';
import { IBetRepository } from "../../../../modules/bets/src/domain/bets/IBetRepository";
import { IAnswerBetRepository } from "../../../../modules/bets/src/domain/answerBets/IAnswerBetRepository";
import { IMemberRepository } from "../../../../modules/bets/src/domain/members/IMemberRepository";
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

const completeBetPresenter = new CompleteBetPresenter();
const createBetPresenter = new CreateBetPresenter();
const answerBetPresenter = new AnswerBetPresenter();

@Module({
    controllers: [CreateBetController, RetrieveBetsController, AnswerBetController, CompleteBetController],
    exports: [CreateBetCommandHandler, 
        RetrieveBetsQueryHandler,
        AnswerBetCommandHandler,
    CompleteBetCommandHandler,
    UpdateBalanceBookieHandler,
    UpdateBalanceGamblersHandler,
    DecreaseBalanceMemberHandler,
    UpdateBalanceGamblerHandler,
    NotifyGamblersBetCompletedHandler,
    NotifyRequestersHandler
    ],
    imports: [forwardRef(() => AppModule)],
    providers: [BetCreatedListener, 
        BetAnsweredListener, 
        BetCompletedListener,
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
            provide: DecreaseBalanceMemberHandler,
            useFactory: (memberRepository: IMemberRepository) => new DecreaseBalanceMemberHandler(
                            memberRepository
                        ),
            inject: [InMemoryMemberRepository]
        },
        {
            provide: UpdateBalanceGamblerHandler,
            useFactory: (memberRepository: IMemberRepository,
                        betRepository: IBetRepository
            ) => new UpdateBalanceGamblerHandler(memberRepository, betRepository),
            inject: [InMemoryMemberRepository, InMemoryBetRepository]
        },
        {
            provide: "INotifyCompletBet",
            useClass: NotifyBetCompleted
        },
        {
            provide: NotifyGamblersBetCompletedHandler,
            useFactory: (notifyCompletBet: INotifyBetCompleted,
                        answerBetRepository: IAnswerBetRepository,
                        betRepository: IBetRepository,
                        memberRepository: IMemberRepository
            ) => new NotifyGamblersBetCompletedHandler(answerBetRepository, notifyCompletBet, memberRepository, betRepository),
            inject: ["INotifyCompletBet", "IAnswerBetRepository", InMemoryBetRepository, InMemoryMemberRepository]
        },
        {
            provide: NotifyRequestersHandler,
            useClass: NotifyRequestersHandler
        }
    ]
})
export class BetsModule {}