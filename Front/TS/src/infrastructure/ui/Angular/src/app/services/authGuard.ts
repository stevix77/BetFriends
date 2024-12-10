import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./authService";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.IsLoggedIn()) {
        return true;
      }
      this.router.navigate(['/signin']);
      return false;
    }
  }