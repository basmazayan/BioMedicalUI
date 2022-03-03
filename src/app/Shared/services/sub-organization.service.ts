import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paging } from '../Models/Paging';
import { SubOrganization } from '../Models/subOrganization';

@Injectable({
  providedIn: 'root'
})
export class SubSubOrganizationService {

  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};
  constructor(private httpClient: HttpClient) { }
  getAllSubOrganization():Observable<SubOrganization[]>
  {
    return this.httpClient.get<SubOrganization[]>(`${environment.GetALLSubOrganization}`,this.httpHeader);
  }
  addNewSubOrganization(newSubOrganization: SubOrganization):Observable<SubOrganization>
  {
    return this.httpClient.post<SubOrganization>(`${environment.AddNewSubOrganization}`,newSubOrganization,this.httpHeader);
  }
  deleteSubOrganization(id: any): Observable <SubOrganization>{
    return this.httpClient.delete<SubOrganization> (`${environment.deleteSubOrganization}${id}`,this.httpHeader) ;
}
 updateSubOrganization(id:Number,organization:SubOrganization):Observable<any>{
  return this.httpClient.put<any> (`${environment.updateSubOrganization}${id}`,organization,this.httpHeader) ;
 }
 getSubOrganization(suborgId:number):Observable<SubOrganization>
 {
  return this.httpClient.get<SubOrganization> (`${environment.GetSubOrganization}${suborgId}`,this.httpHeader) ;
 }
 getSubOrgscount()
 {
  return this.httpClient.get<number>(`${environment.getSubOrgscount}`);
 }
 getAllSubOrgswithpaging(page:Paging):Observable<SubOrganization[]>
 {
  return this.httpClient.put<SubOrganization[]>(`${environment.GetAllSubOrgsWithPaging}`,page,this.httpHeader);
 }
}
