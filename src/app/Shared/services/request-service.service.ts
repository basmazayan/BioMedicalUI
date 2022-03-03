import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestService } from '../Models/RequstService';
@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};

  getAllserviceRequests():Observable<RequestService[]>
  {
    return this.httpClient.get<RequestService[]>(`${environment.GetAllServiceRequests}`,this.httpHeader);
  }
  // getAllserviceRequestsbyempId(email:string):Observable<RequestService[]>
  // {
  //   return this.httpClient.get<RequestService[]>(`${environment.GetAllServiceRequestsByEmpEmail}${email}`,this.httpHeader);
  // }
  makeRequest(newRequest: RequestService):Observable<RequestService>{
    console.log("pppp")
    return this.httpClient.post<RequestService>(`${environment.MakeRequest}`,newRequest,this.httpHeader);

  }
  updateRequest(id:number,request:RequestService):Observable<any>{
    return this.httpClient.put<any> (`${environment.UpdateRequest}${id}`,request,this.httpHeader) ;
   }
   deleteRequest(id:Number){
    return this.httpClient.delete<any> (`${environment.DeleteRequest}${id}`,this.httpHeader) ;

   }
  
   getAllRequestsByDirectoryId(dirId:Number):Observable<RequestService[]>{
    return this.httpClient.get<RequestService[]>(`${environment.GetAllRequestsByDirectory}${dirId}`,this.httpHeader);

   }
}
