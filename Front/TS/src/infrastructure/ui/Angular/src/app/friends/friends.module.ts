import { NgModule } from "@angular/core";
import { FriendsComponent } from "./friends.component";
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
import { FriendsViewModel } from "../../../../../adapters/viewmodels/FriendsViewModel";
import { AddFriendHandler } from "../../../../../../domain/features/add-friend/AddFriendHandler";
import { AddFriendPresenter } from '../../../../../adapters/AddFriendPresenter';

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
            provide: "IMemberRepository",
            useFactory: () => new InMemoryMemberRepository()
        },
        {
            provide: "IFriendRepository",
            useFactory: (memberRepository: IMemberRepository) => new InMemoryFriendRepository(memberRepository),
            deps: ["IMemberRepository"]
        },
        {
            provide: RetrieveFriendsHandler,
            useFactory: (friendRepository: IFriendRepository) => new RetrieveFriendsHandler(friendRepository),
            deps: ["IFriendRepository"]
        },
        {
            provide: RetrieveMembersHandler,
            useFactory: (memberRepository: IMemberRepository) => new RetrieveMembersHandler(memberRepository),
            deps: ["IMemberRepository"]
        },
        {
            provide: AddFriendPresenter,
            useFactory: () => new AddFriendPresenter()
        },
        {
            provide: "IAddFriendOutputPort",
            useFactory: (presenter: AddFriendPresenter) => presenter,
            deps: [AddFriendPresenter]
        },
        {
            provide: AddFriendHandler,
            useFactory: (friendRepository: IFriendRepository, addFriendPresenter: AddFriendPresenter) => new AddFriendHandler(friendRepository, addFriendPresenter),
            deps: ["IFriendRepository", AddFriendPresenter]
        }
    ]
})
export class FriendsModule {}