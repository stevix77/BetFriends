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
import { AddFriendPresenter } from '../../presenters/AddFriendPresenter';
import { RetrieveFriendsPresenter } from "../../presenters/RetrieveFriendsPresenter";
import { RetrieveMembersPresenter } from "../../presenters/RetrieveMembersPresenter";
import { FriendsController } from "../../../../../adapters/controllers/FriendsController";


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
            provide: FriendsController,
            useFactory: () => friendsController
        },
        {
            provide: AddFriendPresenter,
            useFactory: () => addFriendPresenter
        },
        {
            provide: RetrieveFriendsPresenter,
            useFactory: () => retrieveFriendsPresenter
        },
        {
            provide: RetrieveMembersPresenter,
            useFactory: () => retrieveMembersPresenter
        }
    ]
})
export class FriendsModule {}