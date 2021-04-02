import { AuthService } from '../services/auth.service';
import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _Injector:Injector, private _Router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let _AuthService = this._Injector.get(AuthService);
    return  _AuthService.isLoggedIn().pipe(map(item => {
      let isUser = !!item?.uid;
      if (isUser) return true;
      this._Router.navigate(["/login"]);
      return false;
    }));


  }

}
