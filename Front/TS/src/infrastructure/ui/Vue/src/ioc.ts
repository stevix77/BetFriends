import type { App } from "vue";
import { InMemoryMemberRepository } from "../../../adapters/repository/InMemoryMemberRepository";
import { type IMemberRepository } from "../../../../domain/members/IMemberRepository";
import { InMemoryFriendRepository } from '../../../adapters/repository/InMemoryFriendRepository';
import { RetrieveFriendsHandler } from "../../../../domain/features/RetrieveFriendsHandler";
import { type IFriendRepository } from '../../../../domain/friends/IFriendRepository';
import { RetrieveMembersHandler } from '../../../../domain/features/RetrieveMembersHandler';
import { AddFriendHandler } from "../../../../domain/features/AddFriendHandler";
import { FriendsPresenter } from "../../../adapters/presenters/FriendsPresenter";
import { FriendsController } from "../../../../infrastructure/adapters/controllers/FriendsController";
import { CreateBetPresenter } from "../../../adapters/presenters/CreateBetPresenter";
import { BetsController } from '../../../adapters/controllers/BetsController';
import { CreateBetHandler } from "../../../../domain/features/CreateBetHandler";
import { type IBetRepository } from "../../../../domain/bets/IBetRepository";
import { InMemoryBetRepository } from '../../../adapters/repository/InMemoryBetRepository';
import { IdGenerator } from '../../../adapters/IdGenerator';
import { DateTimeProvider } from '../../../adapters/DateTimeProvider';
import { CreateBetViewModel } from "./viewmodels/CreateBetViewModel";
import { FriendsViewModel } from "./viewmodels/FriendsViewModel";

import router from './router'
import { RetrieveBetsHandler } from "../../../../domain/features/RetrieveBetsHandler";
import { BetsViewModel } from './viewmodels/BetsViewModel';
import { AnswerBetHandler } from "../../../../domain/features/AnswerBetHandler";
import { AnswerBetPresenter } from '../../../adapters/presenters/AnswerBetPresenter';
import { UserContext } from "./services/userContext";
import { Bet } from "../../../../domain/bets/Bet";
import { CompleteBetViewModel } from "./viewmodels/CompleteBetViewModel";
import { CompleteBetHandler } from "../../../../domain/features/CompleteBetHandler";
import { CompleteBetPresenter } from "../../../adapters/presenters/CompleteBetPresenter";
import { GetProofHandler } from "../../../../domain/features/GetProofHandler";

const ioc = (app: App) => {
    const userContext = new UserContext('aeaeaeae-aeae-aeae-aeae-aeaeaeaeaeae');
    const memberRepository = new InMemoryMemberRepository()
    memberRepository.members.push({
        Id: userContext.UserId,
        Name: userContext.UserId.substring(0, 8),
        IsFriend: false
    })
    const friendRepository: IFriendRepository = new InMemoryFriendRepository(memberRepository);
    const members = memberRepository.members.map(x => x.Id);
    members.push(userContext.UserId)
    const betRepository: IBetRepository = new InMemoryBetRepository(memberRepository, userContext, [new Bet("id", "description", new Date("2025-02-02"), 200, members)]);
    const friendsPresenter = new FriendsPresenter()
    const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, friendsPresenter);
    const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, friendsPresenter);
    const createBetPresenter = new CreateBetPresenter();
    const answerBetPresenter = new AnswerBetPresenter();
    const completeBetPresenter = new CompleteBetPresenter();
    const idGenerator = new IdGenerator();
    const dtProvider = new DateTimeProvider();
    const createBetHandler = new CreateBetHandler(betRepository, createBetPresenter, idGenerator, dtProvider)
    const retrieveBetsHandler = new RetrieveBetsHandler(betRepository)
    const answerBetHandler = new AnswerBetHandler(betRepository, dtProvider, answerBetPresenter, userContext);
    const completeBetHandler = new CompleteBetHandler(betRepository, completeBetPresenter)
    const getProofHandler = new GetProofHandler(betRepository)
    const betsController = new BetsController(createBetHandler, retrieveBetsHandler, answerBetHandler, completeBetHandler, getProofHandler);
    const addFriendHandler = new AddFriendHandler(friendRepository, friendsPresenter)
    const friendsController = new FriendsController(retrieveFriendsHandler, 
                                                    retrieveMembersHandler,
                                                    addFriendHandler);
    const createbetviewmodel = new CreateBetViewModel(friendsPresenter, 
                                                    createBetPresenter,
                                                    friendsController,
                                                    betsController,
                                                    router);
    const friendsviewmodel = new FriendsViewModel(friendsPresenter, friendsController);
    const betsviewmodel = new BetsViewModel(betsController, answerBetPresenter, userContext, dtProvider, router)
    const completeBetViewModel = new CompleteBetViewModel(betsController, router, completeBetPresenter)
    app.provide('friendsviewmodel', friendsviewmodel);
    app.provide('createbetviewmodel', createbetviewmodel);
    app.provide('betsviewmodel', betsviewmodel);
    app.provide('completebetviewmodel', completeBetViewModel);
}

export { ioc };