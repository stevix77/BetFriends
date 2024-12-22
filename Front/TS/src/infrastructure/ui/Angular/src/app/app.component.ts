import { Component, Inject, inject, OnInit } from '@angular/core';
import { AuthService } from './services/authService';
import { IRouter, Route } from '../../../../adapters/IRouter';
import { Router } from './services/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private readonly authService: AuthService,
              @Inject(Router) private readonly router: IRouter
  ) {
    this.authService.isAuthenticated$.subscribe(
      async (status): Promise<void> => {
        if(this.isConnected != status) {
          this.isConnected = status
          if(!status) {
            this.router.Navigate(Route.Signin)
          }
          if(this.isConnected) {
            await authService.GetMemberInfo();
          }
        }
      }
    );
  }
  title = 'BetFriends';
  isConnected: boolean = this.authService.IsLoggedIn();

  
}
