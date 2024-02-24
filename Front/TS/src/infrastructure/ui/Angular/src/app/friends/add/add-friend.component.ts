import { Component, Input, input, OnInit } from "@angular/core";
import { FriendsViewModel } from '../../../../../../adapters/viewmodels/FriendsViewModel';
import { MemberDto } from "../../../../../../../domain/members/IMemberRepository";
import { NgIf } from "@angular/common";

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
}
