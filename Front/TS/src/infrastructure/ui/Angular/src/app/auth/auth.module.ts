import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { SignInViewModel } from '../../../../../adapters/viewmodels/SignInViewModel';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'signin', component: SigninComponent,
      },
      {
        path: 'register', component: RegisterComponent
      },
    ])
  ],
  providers: [
    {
      provide: SignInViewModel,
      useFactory: () => new SignInViewModel()
    }
  ]
})
export class AuthModule { }
