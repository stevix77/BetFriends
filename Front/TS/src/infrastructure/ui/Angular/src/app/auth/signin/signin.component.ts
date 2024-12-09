import { Component } from '@angular/core';
import { SignInViewModel } from '../../../../../../adapters/viewmodels/SignInViewModel';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(public vm: SignInViewModel) {}
}
