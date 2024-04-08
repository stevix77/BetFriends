import { NgModule } from "@angular/core";
import { AddFriendComponent } from './add/add-friend.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
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


const memberRepository: IMemberRepository = new InMemoryMemberRepository()
const friendRepository: IFriendRepository = new InMemoryFriendRepository(memberRepository);
const friendsPresenter: FriendsPresenter = new FriendsPresenter();
const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, friendsPresenter);
const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, friendsPresenter);
const addFriendHandler = new AddFriendHandler(friendRepository, friendsPresenter)
const friendsController = new FriendsController(retrieveFriendsHandler, 
                                                retrieveMembersHandler,
                                                addFriendHandler)

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '', redirectTo: 'add-friend', pathMatch: 'full',
            },
            {
                path: 'add-friend', component: AddFriendComponent
            }
        ])
    ],
    exports: [RouterModule],
    providers: [
        {
            provide: FriendsViewModel,
            useFactory: () => new FriendsViewModel(friendsPresenter, friendsController)
        }
    ]
})
export class FriendsModule {}