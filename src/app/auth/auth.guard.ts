import { take, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {  CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}

/**
 *  can activate: code for the lazyloading gets downloaded before the guard executes
 *  
 */