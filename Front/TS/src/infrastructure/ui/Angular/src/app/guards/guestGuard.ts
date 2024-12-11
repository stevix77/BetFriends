import { Inject, Injectable } from "@angular/core";
import { AuthService } from "../services/authService";
import { IRouter, Route } from "../../../../../adapters/IRouter";
import { Router } from "../services/router";

@Injectable({
    providedIn: 'root'
  })
  export class GuestGuard {
    constructor(private authService: AuthService, @Inject(Router) private readonly router: IRouter) {}
  
    canActivate(): boolean {
      if (!this.authService.IsLoggedIn()) {
        return true;
      }
      this.router.Navigate(Route.Home);
      return false;
    }
  }