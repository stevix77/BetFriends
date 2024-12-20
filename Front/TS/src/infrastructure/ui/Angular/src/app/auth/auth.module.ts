import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { SignInViewModel } from '../../../../../adapters/viewmodels/SignInViewModel';
import { FormsModule } from '@angular/forms';
import { InMemoryAuthRepository } from "../../../../../adapters/repository/InMemoryAuthRepository"
import { IAuthRepository, LoginHandler } from '../../../../../../domain/features/LoginHandler';
import { LoginPresenter } from "../../../../../adapters/presenters/LoginPresenter";
import { Router } from '../services/router';
import { AuthService } from '../services/authService';
import { IAuthenticateService } from '../../../../../adapters/IAuthenticateService';
import { GuestGuard } from '../guards/guestGuard';
import { InMemoryUserRepository } from '../../../../../adapters/repository/InMemoryUserRepository';
import { RegisterHandler } from '../../../../../../domain/features/RegisterHandler';
import { RegisterPresenter } from '../../../../../adapters/presenters/RegisterPresenter';
import { IdGenerator } from '../../../../../adapters/IdGenerator';
import { Sha256Hash } from '../../../../../adapters/Sha256Hash';
import { RegisterViewModel } from '../../../../../adapters/viewmodels/RegisterViewModel';
const loginPresenter = new LoginPresenter();
const userGateway = new InMemoryUserRepository();
const registerPresenter = new RegisterPresenter();
const authRepository = new InMemoryAuthRepository(userGateway);
const idGenerator = new IdGenerator();
const passwordHasher = new Sha256Hash();
const registerHandler = new RegisterHandler(userGateway, 
                                            registerPresenter, 
                                            idGenerator, 
                                            passwordHasher)
const loginHandler = new LoginHandler(authRepository, loginPresenter, passwordHasher)

@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'signin', component: SigninComponent, canActivate: [() => inject(GuestGuard).canActivate()]
      },
      {
        path: 'register', component: RegisterComponent, canActivate: [() => inject(GuestGuard).canActivate()]
      },
    ])
  ],
  providers: [
    Router,
    AuthService,
    {
      provide: SignInViewModel,
      useFactory: (router: Router,
                  authService: IAuthenticateService
      ) => new SignInViewModel(loginHandler, 
                                loginPresenter, 
                                router,
                                authService),
      deps: [Router, AuthService]
    },
    {
      provide: RegisterViewModel,
      useFactory: (router: Router,
                  authService: IAuthenticateService) => 
            new RegisterViewModel(loginHandler, 
                                registerPresenter, 
                                registerHandler,
                                loginPresenter ,
                                router,
                                authService),
      deps: [Router, AuthService]
    }
  ]
})
export class AuthModule { }
