import { Component, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { RetrieveFriendsHandler, FriendDto } from '../../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
import { SearchComponent } from "./search/search.component";
import { MemberDto } from '../../../../../../domain/members/IMemberRepository';
import { RetrieveMembersHandler } from '../../../../../../domain/features/retrieveMembers/RetrieveMembersHandler';
import { FriendsViewModel } from '../../../../../adapters/viewmodels/FriendsViewModel';
import { AddFriendHandler } from "../../../../../../domain/features/add-friend/AddFriendHandler";
import { AddFriendPresenter } from "../../../../../adapters/AddFriendPresenter";
import { AddFriendComponent } from './add/add-friend.component';

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"],
  imports: [NgFor, NgIf, SearchComponent, AddFriendComponent],
  standalone: true,
  providers: [
    {
      provide: FriendsViewModel,
      useFactory: (retrieveFriendsHandler: RetrieveFriendsHandler,
                  retrieveMembersHandler: RetrieveMembersHandler,
                  addFriendHandler: AddFriendHandler,
                  presenter: AddFriendPresenter) => new FriendsViewModel(retrieveFriendsHandler, retrieveMembersHandler, addFriendHandler, presenter),
      deps: [RetrieveFriendsHandler, RetrieveMembersHandler, AddFriendHandler, AddFriendPresenter]
    }
  ]
})

export class FriendsComponent implements OnInit {

  constructor(protected friendsViewModel: FriendsViewModel){

  }

  async ngOnInit(): Promise<void> {
    await this.friendsViewModel.LoadFriendsAsync();
  }
}
