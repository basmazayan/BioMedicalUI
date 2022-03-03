import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      //console.log("authenticated");
      // this.router.navigate(['/']);
      return true;
    }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.authService.isAuthenticated().pipe(map((response: { authenticated: boolean }) => {
  //     if (response.authenticated) {

  //       console.log("true", response.authenticated)
  //       return true;
  //     }
  //     this.router.navigate(['login']);
  //     console.log("false", response.authenticated)
  //     return false;
  //   })
  //     // , catchError((error) => {
  //     //     this.router.navigate(['/']);
  //     //     return of(false);
  //     // }
  //     // )
  //   );
  // }

    // console.log("auth")
    // return false;
  }

}


