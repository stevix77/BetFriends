import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FriendsViewModel } from "../FriendsViewModel";

@Component({
  selector: "search-friends",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  standalone: true
})

export class SearchComponent implements OnInit {

  constructor(protected friendsViewModel: FriendsViewModel) { 
  }

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {

  }

  async InputChange(event: any) {
    await this.friendsViewModel.SearchMembers(event.value)
  }
}
