import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Shared/Models/User';
import { UserService } from '../Shared/services/user.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: User;
 
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  constructor(private http: HttpClient,
    private userService: UserService) {
    this.currentUser = this.userService.currentUserValue;
   }
  // isAuthenticated() {
    
  //     return this.http.get(`${'http://localhost:51368/api/user/'}`);
  // }
   public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshToken');
    // try {
    //   decode(token);
    //   const exp  = decode(refreshToken);
    //   // Date.now().valueOf() / 1000
    //   if (Date.now().valueOf() >= exp * 1000) {
    //     return false;
    //   }
    // } catch (err) {
    //   return false;
    // }
    // return !this.jwtHelper.isTokenExpired(this.currentUser.token);

    if(!this.currentUser){
      return false
    }
    return true;
    // Check whether the token is expired and return
    // true or false

  }


}
   



