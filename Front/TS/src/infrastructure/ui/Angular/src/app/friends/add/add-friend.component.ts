import { Component, Input, input, OnInit } from "@angular/core";
import { MemberDto } from "../../../../../../../domain/members/IMemberRepository";
import { NgIf } from "@angular/common";
import { FriendsController } from '../../../../../../adapters/controllers/FriendsController';
import { AddFriendPresenter } from '../../../presenters/AddFriendPresenter';

@Component({
  selector: "add-friend",
  templateUrl: "./add-friend.component.html",
  styleUrls: ["./add-friend.component.scss"],
  standalone: true,
  imports: [NgIf]
})

export class AddFriendComponent {
  
  @Input() member: MemberDto|undefined = undefined
  constructor(private friendsController: FriendsController,
              private addFriendPresenter: AddFriendPresenter) { 
    this.addFriendPresenter.Subscribe(this.friendsController)
  }

  async AddFriend(memberId: string|undefined) {
    if(memberId != undefined){
      await this.friendsController.AddFriend(memberId);
    }
  }
}
