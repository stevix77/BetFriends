import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { InMemoryMemberRepository } from '../../../../../adapters/repository/InMemoryMemberRepository';
import { IMemberRepository } from "../../../../../../domain/members/IMemberRepository";
import { InMemoryFriendRepository } from '../../../../../adapters/repository/InMemoryFriendRepository';
import { RetrieveFriendsHandler } from "../../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { IFriendRepository } from '../../../../../../domain/friends/IFriendRepository';
import { RetrieveMembersHandler } from '../../../../../../domain/features/retrieveMembers/RetrieveMembersHandler';
import { AddFriendHandler } from "../../../../../../domain/features/add-friend/AddFriendHandler";
import { FriendsController } from "../../../../../adapters/controllers/FriendsController";
import { FriendsPresenter } from "../../../../../adapters/presenters/FriendsPresenter";
import { FriendsViewModel } from "./FriendsViewModel";
import { FriendsComponent } from "./friends.component";
import { AddFriendComponent } from "./add/add-friend.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
    declarations: [
        FriendsComponent,
        AddFriendComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot([
            {
                path: 'friends', component: FriendsComponent
            }
        ])
    ],
    exports: [RouterModule],
    providers: [
        {
            provide: FriendsViewModel,
            useFactory: (memberRepository: IMemberRepository, 
                        friendRepository: IFriendRepository,
                        friendsPresenter: FriendsPresenter) => {
                const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, friendsPresenter);
                const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, friendsPresenter);
                const addFriendHandler = new AddFriendHandler(friendRepository, friendsPresenter)
                const friendsController = new FriendsController(retrieveFriendsHandler, 
                                                                retrieveMembersHandler,
                                                                addFriendHandler)
                return new FriendsViewModel(friendsPresenter, friendsController)
            },
            deps: ['IMemberRepository', 'IFriendRepository', FriendsPresenter]
        }
    ]
})
export class FriendsModule {}