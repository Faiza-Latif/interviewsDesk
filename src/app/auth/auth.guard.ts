import { AuthService } from './auth.service';
import { take, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {  CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private route: Router) {}
    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
      if (!this.authService.userIsAuthenticated) {
        this.route.navigate(['/' , 'auth']);
      }
        return this.authService.userIsAuthenticated;
    }


}

/**
 *  can activate: code for the lazyloading gets downloaded before the guard executes
 *  
 */