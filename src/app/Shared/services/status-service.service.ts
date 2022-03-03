import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../Models/Status';
@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};

  // getAllStatuses():Observable<Status[]>
  // {
  //   console.log("uuuuuu");
  //   // return this.httpClient.get<Status[]>(`${environment.GetAllStaus}`,this.httpHeader);
  // }

//   addNewEquipments(newEquipment: Status):Observable<Status>
//   {
//     return this.httpClient.post<Status>(`${environment.AddNewEquipments}`,newEquipment,this.httpHeader);
//   }
//   deleteEquipment(id: any): Observable <Status >{
//     return this.httpClient.delete<Status> (`${environment.DeleteEquipment}${id}`,this.httpHeader) ;
// }
//  updateEquipment(id:any,eq:Status){
//   return this.httpClient.put<Status> (`${environment.UpdateEquipment}${id}`,this.httpHeader) ;

//  }
  
}
