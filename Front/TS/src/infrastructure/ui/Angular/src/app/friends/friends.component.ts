import { Component, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { SearchComponent } from "./search/search.component";
import { AddFriendComponent } from './add/add-friend.component';
import { RetrieveFriendsPresenter } from "../../presenters/RetrieveFriendsPresenter";
import { FriendsController } from "../../../../../adapters/controllers/FriendsController";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"],
  imports: [NgFor, NgIf, SearchComponent, AddFriendComponent],
  standalone: true
})

export class FriendsComponent implements OnInit {

  constructor(private friendsController: FriendsController,
              private retrieveFriendsPresenter: RetrieveFriendsPresenter){
    this.retrieveFriendsPresenter.Subscribe(this.friendsController)
  }

  protected viewModel: any = this.friendsController.vm;

  async ngOnInit(): Promise<void> {
    await this.friendsController.GetFriends();
  }
}