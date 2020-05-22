import { Auth } from './auth.model';
import { OnDestroy, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor(private http: HttpClient) {}
  private _token = new BehaviorSubject<Auth>(null);

  get userIsAuthenticated(): any {
    return this._token.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get token() {
    return this._token.asObservable().pipe(
      take(1),
      map((authData) => (authData ? authData.token : null))
    );
  }

  signup(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  private setUserData(userData) {
    // responseData.expiresIn number of seconds in which the id expires 3600
    const expirationToken = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const newUser = new Auth(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationToken
    );
    this._token.next(newUser);
    // this.autoLogout(newUser.tokenDuration);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationToken.toISOString(),
      userData.email
    );
  }
  logout() {
    this._token.next(null);
    // clear data from storage
    Plugins.Storage.remove({ key: 'authData' });
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationData: string,
    email: string
  ) {
    const data = JSON.stringify({ userId, token, tokenExpirationData, email });
    Plugins.Storage.set({ key: 'authData', value: data });
  }

  autoLogin() {
    // Plugins.Storage.get({key: 'authData'}) returns a promise --> to transform to observable wrap with from()
    let parsedData;
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      take(1),
      map((storedData) => {
        if (!storedData || storedData.value == null) {
          return;
        }
        if (storedData) {
          parsedData = JSON.parse(storedData.value) as {
            userId: string;
            token: string;
            tokenExpirationData: string;
            email: string;
          };
          console.log(parsedData);
          const expirationTime = new Date(parsedData.tokenExpirationData);
          if (expirationTime <= new Date()) {
            return null;
          }
          const auth = new Auth(
            parsedData.userId,
            parsedData.email,
            parsedData.token,
            expirationTime
          );
          return auth;
        }
      }),
      tap((auth) => {
        if (auth) {
          this._token.next(auth);
          // this.autoLogout(auth.tokenDuration);
        }
      }),
      map((auth) => {
        return !!auth;
      })
    );
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
