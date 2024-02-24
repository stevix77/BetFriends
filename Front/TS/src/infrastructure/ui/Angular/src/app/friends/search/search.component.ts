import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FriendsViewModel } from "../../../../../../adapters/viewmodels/FriendsViewModel";

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

  InputChange(event: any) {
    this.searchEvent.emit(event.target.value)
  }
}
