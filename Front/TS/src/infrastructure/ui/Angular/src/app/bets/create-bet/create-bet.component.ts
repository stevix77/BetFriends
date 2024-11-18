import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateBetViewModel } from '../CreateBetViewModel';

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrl: './create-bet.component.css'
})
export class CreateBetComponent implements OnInit {
  constructor(protected vm: CreateBetViewModel){}

  async ngOnInit(): Promise<void> {
    await this.vm.GetFriends();
  }
}
