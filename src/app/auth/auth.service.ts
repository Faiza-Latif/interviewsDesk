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
    
    signup(email: string, password: string) {
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }).subscribe(data => console.log(data));
    }

    login(email: string, password: string) {
      this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`,
      {
        email,
        password,
        returnSecureToken: true
      })
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }



  }