import { Component, Input, input, OnInit } from "@angular/core";
import { MemberDto } from "../../../../../../../domain/members/IMemberRepository";
import { NgIf } from "@angular/common";
import { FriendsViewModel } from "../FriendsViewModel";

@Component({
  selector: "add-friend",
  templateUrl: "./add-friend.component.html",
  styleUrls: ["./add-friend.component.scss"],
  standalone: true,
  imports: [NgIf]
})

export class AddFriendComponent {
  
  @Input() member: MemberDto|undefined = undefined
  constructor(protected friendsViewModel: FriendsViewModel) { 
  }

  async AddFriend(memberId: string|undefined) {
    if(memberId != undefined){
      await this.friendsViewModel.AddFriend(memberId);
      this.member!.IsFriend = true;
    }
  }
}
