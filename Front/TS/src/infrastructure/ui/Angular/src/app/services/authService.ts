import { Inject, Injectable } from "@angular/core";
import { IAuthenticateService } from "../../../../../adapters/IAuthenticateService";
import { AuthToken } from "../../../../../../domain/features/LoginHandler";
import { BehaviorSubject, Observable } from "rxjs";
import { IMemberGateway } from "../../../../../../domain/abstractions/IMemberGateway";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements IAuthenticateService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private memberInfoSubject = new BehaviorSubject<{username: string, coins:number}>(undefined!);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
    public memberInfo$: Observable<{username: string, coins:number}> = this.memberInfoSubject.asObservable();
    constructor(@Inject('IMemberGateway') private readonly memberGateway: IMemberGateway) {}
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
      
    LoggedIn(authToken: AuthToken): void {
      localStorage.setItem('auth_token', JSON.stringify(authToken));
      this.isAuthenticatedSubject.next(true);
    }

    async GetMemberInfo(): Promise<void> {
      const member = await this.memberGateway.RetrieveInfo();
      if(member != undefined) {
        this.memberInfoSubject.next(member);
      }
    }
  }