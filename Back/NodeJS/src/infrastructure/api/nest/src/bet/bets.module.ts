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
import { IMediator, Mediator } from "../../../../Mediator";
import { DomainEventDispatcher } from "../../../../events/DomainEventDispatcher";

const completeBetPresenter = new CompleteBetPresenter();
const domainEventsDispatcher = new DomainEventDispatcher()

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
            provide: CompleteBetPresenter,
            useValue: completeBetPresenter
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
            provide: CompleteBetCommandHandler,
            useFactory: (betRepository: IBetRepository,
                        userContext: IUserContext
            ) => new CompleteBetCommandHandler(betRepository, completeBetPresenter, userContext),
            inject: [InMemoryBetRepository,
                    'IUserContext'
            ]
        },
        // {

        // },
        {
            provide: "IBetModule",
            useFactory: (mediator: IMediator) => new BetModule(mediator),
            inject: ['IMediator']
        },
        {
            provide: "IMediator",
            useFactory: (createBetCommandHandler: CreateBetCommandHandler,
                        retrieveBetsQueryHandler: RetrieveBetsQueryHandler,
                        answerBetCommandHandler: AnswerBetCommandHandler,
                        completeBetCommandHandler: CompleteBetCommandHandler) => {
                const behavior = new LoggingBehavior()
                                    .SetNext(new UnitOfWorkBehavior(undefined!, new DomainEventsDispatcher()))
                                    .SetNext(new RequestBehavior([
                                        createBetCommandHandler, 
                                        retrieveBetsQueryHandler,
                                        answerBetCommandHandler,
                                        completeBetCommandHandler
                                    ], [

                                    ]))
                return new Mediator(behavior)
            },
            inject: [CreateBetCommandHandler, 
                    RetrieveBetsQueryHandler,
                    AnswerBetCommandHandler,
                CompleteBetCommandHandler]
        }
    ]
})
export class BetsModule {}