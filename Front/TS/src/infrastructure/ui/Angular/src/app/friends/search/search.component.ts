import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FriendsController } from '../../../../../../adapters/controllers/FriendsController';
import { RetrieveMembersPresenter } from '../../../presenters/RetrieveMembersPresenter';

@Component({
  selector: "search-friends",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  standalone: true
})

export class SearchComponent implements OnInit {

  constructor(private friendsController: FriendsController,
              private retrieveMembersPresenter: RetrieveMembersPresenter) { 
      this.retrieveMembersPresenter.Subscribe(this.friendsController)
  }

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {

  }

  async InputChange(event: any) {
    await this.friendsController.SearchMembers(event.value)
  }
}
