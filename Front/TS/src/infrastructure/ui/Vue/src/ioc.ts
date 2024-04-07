import type { App } from "vue";
import { InMemoryMemberRepository } from "../../../adapters/repository/InMemoryMemberRepository";
import { type IMemberRepository } from "../../../../domain/members/IMemberRepository";
import { InMemoryFriendRepository } from '../../../adapters/repository/InMemoryFriendRepository';
import { RetrieveFriendsHandler } from "../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { type IFriendRepository } from '../../../../domain/friends/IFriendRepository';
import { RetrieveMembersHandler } from '../../../../domain/features/retrieveMembers/RetrieveMembersHandler';
import { AddFriendHandler } from "../../../../domain/features/add-friend/AddFriendHandler";
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

const ioc = (app: App) => {
    const memberRepository: IMemberRepository = new InMemoryMemberRepository()
    const friendRepository: IFriendRepository = new InMemoryFriendRepository(memberRepository);
    const betRepository: IBetRepository = new InMemoryBetRepository();
    const friendsPresenter = new FriendsPresenter()
    const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, friendsPresenter);
    const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, friendsPresenter);
    const createBetPresenter = new CreateBetPresenter();
    const idGenerator = new IdGenerator();
    const dtProvider = new DateTimeProvider();
    const createBetHandler = new CreateBetHandler(betRepository, createBetPresenter, idGenerator, dtProvider)
    const betsController = new BetsController(createBetHandler);
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

    app.provide('friendsviewmodel', friendsviewmodel);
    app.provide('createbetviewmodel', createbetviewmodel);
}

export { ioc };