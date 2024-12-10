import { inject, Inject, NgModule } from '@angular/core';
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
import { Route } from '../../../../../adapters/IRouter';
import { UserGuard } from '../services/userGuard';
const loginPresenter = new LoginPresenter();

@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'signin', component: SigninComponent, canActivate: [() => inject(UserGuard).canActivate()]
      },
      {
        path: 'register', component: RegisterComponent, canActivate: [() => inject(UserGuard).canActivate()]
      },
    ])
  ],
  providers: [
    Router,
    AuthService,
    {
      provide: LoginHandler,
      useFactory: (authRepository: IAuthRepository) => new LoginHandler(authRepository, loginPresenter, {
        Hash(password) {
          return `hashed${password}`
        },
      }),
      deps: ["IAuthRepository"]
    },
    {
      provide: "IAuthRepository",
      useClass: InMemoryAuthRepository
    },
    {
      provide: SignInViewModel,
      useFactory: (loginHandler: LoginHandler,
                  router: Router,
                  authService: IAuthenticateService
      ) => new SignInViewModel(loginHandler, 
                                loginPresenter, 
                                router,
                                authService),
      deps: [LoginHandler, Router, AuthService]
    }
  ]
})
export class AuthModule { }
