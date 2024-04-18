import { Component } from '@angular/core';
import { CreateBetViewModel } from '../CreateBetViewModel';

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrl: './create-bet.component.css'
})
export class CreateBetComponent {
  constructor(protected createBetViewModel: CreateBetViewModel){}
}
