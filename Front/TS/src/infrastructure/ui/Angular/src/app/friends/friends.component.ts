import { Component, OnInit } from "@angular/core";
import { FriendsViewModel } from "./FriendsViewModel";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"]
})

export class FriendsComponent implements OnInit {

  constructor(protected friendsViewModel: FriendsViewModel){
  }

  async ngOnInit(): Promise<void> {
    await this.friendsViewModel.GetFriends();
  }
}