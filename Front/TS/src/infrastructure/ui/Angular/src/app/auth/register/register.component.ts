import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RegisterViewModel } from '../../../../../../adapters/viewmodels/RegisterViewModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private readonly location: Location, protected vm: RegisterViewModel) {}

  SignIn() {
    this.location.back();
  }
}
