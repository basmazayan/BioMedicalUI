import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrandVM, Equipment } from '../Models/Equipment';
import { MasterEquipment } from '../Models/MasterEquipment';
import { MasterEquipmentAttachments } from '../Models/MasterEquipmentAttachments';
import { Paging } from '../Models/Paging';

@Injectable({
  providedIn: 'root'
})
export class MasterequipmentService {

  constructor(private httpClient:HttpClient,
              ) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};
addNewEquipments(newEquipment: MasterEquipment):Observable<MasterEquipment>
{
  return this.httpClient.post<MasterEquipment>(`${environment.AddNewMasterEquipments}`,newEquipment,this.httpHeader);
}
getAll():Observable<MasterEquipment[]>
{
  return this.httpClient.get<MasterEquipment[]>(`${environment.GetAllMasterEquipment}`);
}
getAllwithpaging(page:Paging):Observable<MasterEquipment[]>
{
  return this.httpClient.put<MasterEquipment[]>(`${environment.GetAllMasterEquipmentWithPaging}`,page,this.httpHeader);
}
getcount():Observable<number>
{
  return this.httpClient.get<number>(`${environment.getcount}`);
}
update(Id:Number,masterEquipment:MasterEquipment):Observable<any>
{
  return this.httpClient.put<any>(`${environment.UpdateMasterEquipment}${Id}`,masterEquipment,this.httpHeader)
}
Delete(Id:Number):Observable<any>
{
  return this.httpClient.delete<any>(`${environment.DeleteMasterEquipment}${Id}`);
}
getAllAttachWithNoMasterEquipment():Observable<MasterEquipmentAttachments[]>
{
  return this.httpClient.get<MasterEquipmentAttachments[]>(`${environment.GetAttachmentsForMasterEquipment}`,this.httpHeader);
}
getAllAttachForEquipment(equipId:number):Observable<MasterEquipmentAttachments[]>
{
  return this.httpClient.get<MasterEquipmentAttachments[]>(`${environment.GetAttachmentsForMEquipment}${equipId}`,this.httpHeader);
}
DeleteAttachment(id:number):Observable<MasterEquipmentAttachments>
{
  return this.httpClient.delete<MasterEquipmentAttachments> (`${environment.DeleteMasterAttach}${id}`,this.httpHeader) ;
}
getMasterByBrand(data:Equipment[]):Observable<BrandVM[]>
{
  return this.httpClient.post<BrandVM[]> (`${environment.getMasterByBrand}`,data,this.httpHeader) ;
}
}
