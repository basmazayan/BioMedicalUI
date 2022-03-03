import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrganizationRequests } from '../Models/ContractRequest';
import { Organization } from '../Models/Organization';
import { Paging } from '../Models/Paging';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};
  constructor(private httpClient: HttpClient) { }
  getAllOrganization():Observable<Organization[]>
  {
    return this.httpClient.get<Organization[]>(`${environment.GetAllOrganization}`,this.httpHeader);
  }
  
  getOrganizationscount():Observable<number>
  {
    return this.httpClient.get<number>(`${environment.getOrganizationscount}`);
  }
  getAllwithpaging(page:Paging):Observable<Organization[]>
  {
    return this.httpClient.put<Organization[]>(`${environment.GetAllOrganizationWithPaging}`,page,this.httpHeader);
  }
  addNewOrganization(newOrganization: Organization):Observable<Organization>
  {
    return this.httpClient.post<Organization>(`${environment.AddOrganization}`,newOrganization,this.httpHeader);
  }
  deleteOrganization(id: any): Observable <Organization>{
    return this.httpClient.delete<Organization> (`${environment.DeleteOrganization}${id}`,this.httpHeader) ;
}
 updateOrganization(id:Number,organization:Organization):Observable<any>{
  return this.httpClient.put<any> (`${environment.UpdateOrganization}${id}`,organization,this.httpHeader) ;
 }
 getOrganization(orgId:number):Observable<Organization>
 {
  return this.httpClient.get<Organization> (`${environment.GetOrganization}${orgId}`,this.httpHeader) ;
 }
}
