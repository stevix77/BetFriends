import type { App } from "vue";
import { InMemoryMemberRepository } from "../../../adapters/repository/InMemoryMemberRepository";
import { type IMemberRepository } from "../../../../domain/members/IMemberRepository";
import { InMemoryFriendRepository } from '../../../adapters/repository/InMemoryFriendRepository';
import { RetrieveFriendsHandler } from "../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { type IFriendRepository } from '../../../../domain/friends/IFriendRepository';
import { RetrieveMembersHandler } from '../../../../domain/features/retrieveMembers/RetrieveMembersHandler';
import { AddFriendHandler } from "../../../../domain/features/add-friend/AddFriendHandler";
import { AddFriendPresenter } from './presenters/AddFriendPresenter';
import { RetrieveFriendsPresenter } from "./presenters/RetrieveFriendsPresenter";
import { FriendsController } from "../../../../infrastructure/adapters/controllers/FriendsController";
import { RetrieveMembersPresenter } from "./presenters/RetrieveMembersPresenter";
const ioc = (app: App) => {
    const memberRepository: IMemberRepository = new InMemoryMemberRepository()
    const friendRepository: IFriendRepository = new InMemoryFriendRepository(memberRepository);
    const addFriendPresenter = new AddFriendPresenter();
    const retrieveFriendsPresenter = new RetrieveFriendsPresenter()
    const retrieveMembersPresenter = new RetrieveMembersPresenter()
    const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, retrieveFriendsPresenter);
    const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, retrieveMembersPresenter);
    const addFriendHandler = new AddFriendHandler(friendRepository, addFriendPresenter)
    const friendsController = new FriendsController(retrieveFriendsHandler, 
                                                    retrieveMembersHandler,
                                                    addFriendHandler)

    app.provide('addFriendPresenter', addFriendPresenter);
    app.provide('retrieveFriendsPresenter', retrieveFriendsPresenter)
    app.provide('retrieveMembersPresenter', retrieveMembersPresenter)
    app.provide('friendsController', friendsController)
}

export { ioc };