import { Component, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { SearchComponent } from "./search/search.component";
import { AddFriendComponent } from './add/add-friend.component';
import { FriendsViewModel } from "./FriendsViewModel";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"],
  imports: [NgFor, NgIf, SearchComponent, AddFriendComponent],
  standalone: true
})

export class FriendsComponent implements OnInit {

  constructor(protected friendsViewModel: FriendsViewModel){
  }

  async ngOnInit(): Promise<void> {
    await this.friendsViewModel.GetFriends();
  }
}