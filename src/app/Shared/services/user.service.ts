import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../Models/Role';
import { User } from '../Models/User';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../Models/Employee';


import { ResetPassword } from '../Models/ResetPassword';
import { Paging } from '../Models/Paging';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  register(newUser: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.Register}`, newUser, this.httpHeader);
  }
  login(existingUser: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.Login}`, existingUser, this.httpHeader)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetUsers}`, this.httpHeader);
  }
  getUserscount():Observable<number>
  {
    return this.httpClient.get<number>(`${environment.getUserscount}`);
  }
  getAllUserswithpaging(page:Paging):Observable<User[]>
  {
    return this.httpClient.put<User[]>(`${environment.getAllUserswithpaging}`,page,this.httpHeader);
  }

  getUsersByEquipmentId(id:number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetUsersByEquipmentId}${id}`, this.httpHeader);
  }
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${environment.DeleteUser}${id}`);
  }
  getUnRegisteredUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetUnregisteredUsers}`, this.httpHeader);
  }
  getUsersByHealthcareunitId(id:number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetAllUsersByHealthcareunitId}${id}`, this.httpHeader);
  }
  getUsersByhealthDirectoryId(id:number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetAllUsersByhealthDirectoryId}${id}`, this.httpHeader);
  }
  getUsersByhealthDistrictId(id:number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetAllUsersByhealthDistrictId}${id}`, this.httpHeader);
  }
  getUsersByOrganizationId(id:number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.GetAllUsersByOrganizationId}${id}`, this.httpHeader);
  } 
  getEquipmentEmployees(equipId:number)
{
  return this.httpClient.get<User[]>(`${environment.GetEquipmentEmployee}${equipId}`, this.httpHeader);
}
  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${environment.GetAllRoles}`, this.httpHeader);
  }
  updateRole(user: User) {
    return this.httpClient.put<User[]>(`${environment.UpdateRole}`, user, this.httpHeader);

  }
  // updateUser(id:string,user: User) {
  //   return this.httpClient.put<User[]>(`${environment.UpdateUser}${id}`, user, this.httpHeader);

  // }
  getById(id: string) {
    return this.httpClient.get<User>(`${environment.getUserById}${id}`);
  }
  getRoleById(id: string) {
    return this.httpClient.get<String>(`${environment.getRoleById}${id}`);
  }
  createRoles()
  {
    return this.httpClient.get<any>(`${environment.CreateRoles}`);
  }

  forgetPassword(email:string):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.forgetPassword}${email}`, this.httpHeader);
  }
  resetPassword(Resetpassword:ResetPassword):Observable<ResetPassword>
  {
    return this.httpClient.post<ResetPassword>(`${environment.resetpassword}`, Resetpassword, this.httpHeader);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
