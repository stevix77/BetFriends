import { BehaviorSubject, Observable } from "rxjs";
import type { AuthToken } from "../../../../../domain/features/LoginHandler";
import type { IAuthenticateService } from "../../../../adapters/IAuthenticateService";

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
    
    LoggedIn(authToken: AuthToken): void {
        localStorage.setItem('auth_token', JSON.stringify(authToken));
        this.isAuthenticatedSubject.next(true);
    }

}