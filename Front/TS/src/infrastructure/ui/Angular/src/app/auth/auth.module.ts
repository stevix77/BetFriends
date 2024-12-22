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
import { IUserContext } from '../../../../../../domain/abstractions/IUserContext';
const loginPresenter = new LoginPresenter();
const registerPresenter = new RegisterPresenter();
const idGenerator = new IdGenerator();
const passwordHasher = new Sha256Hash();

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
      provide: InMemoryUserRepository,
      useFactory: (userContext: IUserContext) => new InMemoryUserRepository(userContext),
      deps: ['IUserContext']
    },
    {
      provide: 'IMemberGateway',
      useFactory: (userRepository: InMemoryUserRepository) => userRepository,
      deps: [InMemoryUserRepository]
    },
    {
      provide: LoginHandler,
      useFactory: (userRepository: InMemoryUserRepository,
                  userContext: IUserContext
      ) => 
          new LoginHandler(new InMemoryAuthRepository(userRepository, userContext), 
                          loginPresenter, 
                          passwordHasher),
      deps: [InMemoryUserRepository, 'IUserContext']
    },
    {
      provide: RegisterHandler,
      useFactory: (userRepository: InMemoryUserRepository) => 
          new RegisterHandler(userRepository, 
                          registerPresenter,
                          idGenerator, 
                          passwordHasher),
      deps: [InMemoryUserRepository]
    },
    {
      provide: SignInViewModel,
      useFactory: (router: Router,
                  authService: IAuthenticateService,
                  loginHandler: LoginHandler
      ) => new SignInViewModel(loginHandler, 
                                loginPresenter, 
                                router,
                                authService),
      deps: [Router, AuthService, LoginHandler]
    },
    {
      provide: RegisterViewModel,
      useFactory: (router: Router,
                  authService: IAuthenticateService,
                registerHandler: RegisterHandler,
              loginHandler: LoginHandler) => 
            new RegisterViewModel(loginHandler, 
                                registerPresenter, 
                                registerHandler,
                                loginPresenter ,
                                router,
                                authService),
      deps: [Router, AuthService, RegisterHandler, LoginHandler]
    }
  ]
})
export class AuthModule { }
