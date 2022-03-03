import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../Models/Contract';
import { ContractRequest, ContractRequestVM, ContractVM, OrganizationRequests } from '../Models/ContractRequest';
import { dateVM } from '../Models/dateVM';
import { Equipment } from '../Models/Equipment';
import { HealthCareUnit } from '../Models/HealthCareUnit';
import { OrganizationContractRequest } from '../Models/OrganizationContractRequest';
import { Paging } from '../Models/Paging';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  // from:Date;
  // to:Date;
  // dates={
  //   from:new Date(),
  //   to:new Date()
  // }

  getAllContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(`${environment.GetAllContracts}`, this.httpHeader);
  }

  addNewContract(newContract: Contract): Observable<Contract> {
    return this.httpClient.post<Contract>(`${environment.AddContract}`, newContract, this.httpHeader);
  }
  deleteContract(id: any): Observable<Contract> {
    return this.httpClient.delete<Contract>(`${environment.DeleteContract}${id}`, this.httpHeader);
  }
  updateContract(id: Number, contract: Contract): Observable<any> {
    return this.httpClient.put<any>(`${environment.UpdateContract}${id}`, contract, this.httpHeader);
  }
  AddContractRequest(contractRequest: ContractRequestVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.AddContractRequest}`, contractRequest, this.httpHeader);
  }
  AddOrganizationContractRequest(orgRequest: OrganizationContractRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.AddOrganizationContractRequest}`, orgRequest, this.httpHeader);
  }
getHosForOrg(orgId:number):Observable<ContractVM[]>
{
  return this.httpClient.get<ContractVM[]>(`${environment.getHosForOrganization}${orgId}`, this.httpHeader);
}

getRequestbetweenDates(orgid:number,dates:dateVM):Observable<any>
{ 
  return this.httpClient.put<any>(`${environment.getRequestbetweenDates}${orgid}`,dates);
}
getRequestForUPA():Observable<OrganizationRequests[]>
{
  return this.httpClient.get<OrganizationRequests[]>(`${environment.getRequestForUPA}`, this.httpHeader);
}
getEquipmentInContract(Ids:number[]):Observable<Equipment[]>
{
  return this.httpClient.put<Equipment[]>(`${environment.getEquipmentInContract}`,Ids, this.httpHeader);
}
getOneContract(cId:number):Observable<Contract>
{
  return this.httpClient.get<Contract>(`${environment.getOneContract}${cId}`, this.httpHeader);
}
EquipmentInContract(cId:number):Observable<Equipment[]>
{
  return this.httpClient.get<Equipment[]>(`${environment.EquipmentInContract}${cId}`, this.httpHeader);
}
InformHospital(contractId:number):Observable<Equipment[]>{
  return this.httpClient.get<Equipment[]>(`${environment.getEquipmentsInContract}${contractId}`, this.httpHeader);
}
getRequestInHospitals(pagingParameter:Paging,hosId:number ):Observable<ContractRequestVM[]>
{
  return this.httpClient.put<ContractRequestVM[]>(`${environment.getRequestInHospitals}${hosId}`,pagingParameter, this.httpHeader);
}
getcount():Observable<number>
{
  return this.httpClient.get<number>(`${environment.getCountOfRequestInHospital}`);
}
updateStatus(id: number):Observable<any>
{
  return this.httpClient.get<any>(`${environment.updateRequestStatus}${id}`);
}
getRequest(id: number):Observable<ContractRequestVM>
{
  return this.httpClient.get<ContractRequestVM>(`${environment.getRequest}${id}`);
}
getRequestToEdit(id:number):Observable<ContractRequestVM>
{
  return this.httpClient.get<ContractRequestVM>(`${environment.getRequest}${id}`);
}
updateContractRequest(contractRequest:ContractRequestVM):Observable<any>
{
  return this.httpClient.put<any>(`${environment.updateContractRequest}`,contractRequest);
}
delete(id:number):Observable<any>
{
  return this.httpClient.delete<any>(`${environment.delete}${id}`);
}
// AddContract(contract:Contract):Observable<any>
// {
//   return this.httpClient.post<Contract>(`${environment.AddNewContract}`,this.httpHeader);
// }
}
