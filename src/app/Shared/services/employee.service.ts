import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 

  constructor(private httpClient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};
//   getAllEmployees():Observable<Employee[]>
//   {
//     return this.httpClient.get<Employee[]>(`${environment.GetAllEmployees}`,this.httpHeader);
//   }

//   addNewEmployee(newEmployee: Employee):Observable<Employee>
//   {
//     return this.httpClient.post<Employee>(`${environment.AddEmployee}`,newEmployee,this.httpHeader);
//   }
//   deleteEmployee(id: any): Observable <Employee >{
//     return this.httpClient.delete<Employee> (`${environment.DeleteEmployee}${id}`,this.httpHeader) ;
// }
//  updateEmployee(id:Number,employee:Employee):Observable<any>{
//   return this.httpClient.put<any> (`${environment.UpdateEmployee}${id}`,employee,this.httpHeader) ;
//  }
// getEquipmentEmployees(equipId:Number)
// {
//   return this.httpClient.get<Employee[]>(`${environment.GetEquipmentEmployee}${equipId}`, this.httpHeader);
// }
// getUserByEmail(email:string):Observable<Employee>
// {
//   return this.httpClient.get<Employee>(`${environment.getEmployeeByMail}${email}`,this.httpHeader);
// }
}
