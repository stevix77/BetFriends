import { Component, OnInit } from '@angular/core';
import { BetsViewModel } from '../BetsViewModel';

@Component({
  selector: 'app-retrieve-bets',
  templateUrl: './retrieve-bets.component.html',
  styleUrl: './retrieve-bets.component.css'
})
export class RetrieveBetsComponent implements OnInit {
  constructor(protected bvm: BetsViewModel){}
  
  async ngOnInit(): Promise<void> {
    await this.bvm.LoadBetsAsync();
  }
  
}
