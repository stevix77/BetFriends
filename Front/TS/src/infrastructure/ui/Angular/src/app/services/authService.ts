import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    
  
    constructor() {}
  
    // login(credentials: { email: string; password: string }) {
    //   return this.http.post<{ token: string }>('/api/login', credentials).pipe(
    //     tap(response => {
    //       localStorage.setItem('auth_token', response.token);
    //       this.isAuthenticatedSubject.next(true);
    //     })
    //   );
    // }
  
    // logout() {
    //   localStorage.removeItem('auth_token');
    //   this.isAuthenticatedSubject.next(false);
    // }
  
    // isLoggedIn(): boolean {
    //   const token = localStorage.getItem('auth_token');
    //   return !!token; // Check if token exists
    // }
  }