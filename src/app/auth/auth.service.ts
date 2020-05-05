import { OnDestroy, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService implements OnDestroy {
    constructor(private http: HttpClient) { }
    private _userIsAuthenticated = false;

    get userIsAuthenticated() {
      return this._userIsAuthenticated;
    }
    
    set userIsAuthenticated(value: boolean) {
       this._userIsAuthenticated = value;
    }
    signup(email: string, password: string) {
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      });
    }

    login(email: string, password: string) {
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      });
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }



  }