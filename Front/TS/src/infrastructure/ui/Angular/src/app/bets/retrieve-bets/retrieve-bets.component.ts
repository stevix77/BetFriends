import { Component, OnInit } from '@angular/core';
import { BetsViewModel } from '../BetsViewModel';

@Component({
  selector: 'app-retrieve-bets',
  templateUrl: './retrieve-bets.component.html',
  styleUrl: './retrieve-bets.component.css'
})
export class RetrieveBetsComponent implements OnInit {
  constructor(protected bvm: BetsViewModel){}
  Proof: any;
  async ngOnInit(): Promise<void> {
    await this.bvm.LoadBetsAsync();
  }
  
  async getProof(betId: string, dialog: any): Promise<void> {
    this.Proof = await this.bvm.GetProof(betId);
    dialog.showModal();
  }

}
