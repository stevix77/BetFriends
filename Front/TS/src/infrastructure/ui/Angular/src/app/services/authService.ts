import { Injectable } from "@angular/core";
import { IAuthenticateService } from "../../../../../adapters/IAuthenticateService";
import { AuthToken } from "../../../../../../domain/features/LoginHandler";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements IAuthenticateService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
    LogOut() {
      localStorage.removeItem('auth_token')
      this.isAuthenticatedSubject.next(false);
    }

    IsLoggedIn(): boolean {
      const authToken = localStorage.getItem('auth_token')
      this.isAuthenticatedSubject.next(!!authToken);
      if(authToken) return true;
      return false;
    }
      
    constructor() {}
    LoggedIn(authToken: AuthToken): void {
      localStorage.setItem('auth_token', JSON.stringify(authToken));
      this.isAuthenticatedSubject.next(true);
    }
  }