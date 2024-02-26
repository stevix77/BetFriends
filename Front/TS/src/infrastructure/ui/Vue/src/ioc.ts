import type { App } from "vue";
import { FriendsViewModel } from "../../../adapters/viewmodels/FriendsViewModel"
import { InMemoryMemberRepository } from "../../../adapters/repository/InMemoryMemberRepository";
import { type IMemberRepository } from "../../../../domain/members/IMemberRepository";
import { InMemoryFriendRepository } from '../../../adapters/repository/InMemoryFriendRepository';
import { RetrieveFriendsHandler } from "../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { type IFriendRepository } from '../../../../domain/friends/IFriendRepository';
import { RetrieveMembersHandler } from '../../../../domain/features/retrieveMembers/RetrieveMembersHandler';
import { AddFriendHandler } from "../../../../domain/features/add-friend/AddFriendHandler";
import { AddFriendPresenter } from '../../../adapters/AddFriendPresenter';
const ioc = (app: App) => {
    const memberRepository: IMemberRepository = new InMemoryMemberRepository()
    const friendRepository: IFriendRepository = new InMemoryFriendRepository(memberRepository);
    const addFriendPresenter = new AddFriendPresenter();
    const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository);
    const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository);
    const addFriendHandler = new AddFriendHandler(friendRepository, addFriendPresenter)
    const friendsViewModel = new FriendsViewModel(retrieveFriendsHandler, 
                                                    retrieveMembersHandler,
                                                    addFriendHandler,
                                                    addFriendPresenter);

    app.provide('friendsViewModel', friendsViewModel);
    app.provide('addFriendPresenter', addFriendPresenter);
}

export { ioc };