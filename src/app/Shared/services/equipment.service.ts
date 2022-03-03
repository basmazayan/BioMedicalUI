import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { scanningDateVm, scanningequipmentVM } from '../Models/Equipment';
import { CityVM, Equipment, EquipmentVM, filterDto, GovernorateVM, HospitalVM, OrganizationVM, SupplierVM } from '../Models/Equipment';
import { EquipmentRecall } from '../Models/equipment-recall';
import { EquipmentAttachments } from '../Models/EquipmentAttachments';
import { MasterEquipment } from '../Models/MasterEquipment';
import { Organization } from '../Models/Organization';
import { Paging } from '../Models/Paging';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  getAllEquipments(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(`${environment.GetAllEquipments}`, this.httpHeader);
  }
  GetAllEquipmentsforinventory(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(`${environment.GetAllEquipmentsforinventory}`, this.httpHeader);
  }
  getAllEquipmentswithscanningDate(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(`${environment.GetAllEquipmentswithscanningDate}`, this.httpHeader);

  }
  getcount():Observable<number>
  {
    return this.httpClient.get<number>(`${environment.getEquipmentcount}`);
  }
  getAllwithpaging(page:Paging):Observable<Equipment[]>
  {
    return this.httpClient.put<Equipment[]>(`${environment.GetAllEquipmentWithPaging}`,page,this.httpHeader);
  }
  addNewEquipments(newEquipment: Equipment): Observable<Equipment> {
    return this.httpClient.post<Equipment>(`${environment.AddNewEquipments}`, newEquipment, this.httpHeader);
  }
  deleteEquipment(id: any): Observable<Equipment> {
    return this.httpClient.delete<Equipment>(`${environment.DeleteEquipment}${id}`, this.httpHeader);
  }
  updateEquipment(id: number, equipment: Equipment): Observable<any> {
    return this.httpClient.put<any>(`${environment.UpdateEquipment}${id}`, equipment, this.httpHeader);
  }
  // getEquipmentsByemp(email:string):Observable<Equipment[]>{
  //   return this.httpClient.get<Equipment[]>(`${environment.GetAllEquimentsByEmp}${email}`,this.httpHeader);
  // }
  getEquipmentById(id: number): Observable<Equipment> {
    return this.httpClient.get<Equipment>(`${environment.GetOneEquipment}${id}`, this.httpHeader);
  }
  getEquipmentAttachmentIDs(event: string[]): Observable<number[]> {
    return this.httpClient.post<number[]>(`${environment.GetEquipmentAttachmentIDs}${event}`, this.httpHeader);
  }
  getAllAttachWithNoEquipment(): Observable<EquipmentAttachments[]> {
    return this.httpClient.get<EquipmentAttachments[]>(`${environment.GetEquipmentAttachments}`, this.httpHeader);
  }
  getAllAttachForEquipment(equipId: number): Observable<EquipmentAttachments[]> {
    return this.httpClient.get<EquipmentAttachments[]>(`${environment.GetAttachmentsForEquipment}${equipId}`, this.httpHeader);
  }
  getImagePath(Img: string): Observable<string> {
    return this.httpClient.get<string>(`${environment.GetImagePath}${Img}`, this.httpHeader);
  }
  DeleteAttachment(id: number): Observable<EquipmentAttachments> {
    return this.httpClient.delete<EquipmentAttachments>(`${environment.DeleteAttach}${id}`, this.httpHeader);
  }
  GetAllBymaster(brandId: number): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(`${environment.GetEquipmentBymaster}${brandId}`, this.httpHeader);
  }
  /*getAllMasterEquipment()
  {
    return this.httpClient.get<MasterEquipment[]>(`${environment.GetAllMasterEquipment}`);
  }*/
  GetAllByHospital(data: Equipment[]): Observable<HospitalVM[]> {
    return this.httpClient.post<HospitalVM[]>(`${environment.GetAllByHospital}`, data, this.httpHeader);
  }
  getScannedDateWithequipmentsgroups(): Observable<scanningDateVm[]> {
    return this.httpClient.get<scanningDateVm[]>(`${environment.GetAllscannedequipments}`, this.httpHeader);
  }

  GetEquipmentsOnGovernorate(data: Equipment[]): Observable<GovernorateVM[]> {
    return this.httpClient.post<GovernorateVM[]>(`${environment.GetEquipmentsOnGovernorate}`, data, this.httpHeader);
  }
  GetEquipmentsOnDistrict(data: Equipment[]): Observable<CityVM[]> {
    return this.httpClient.post<CityVM[]>(`${environment.GetEquipmentsOnCity}`, data, this.httpHeader);
  }
  GetEquipmentsOnOrganization(data: Equipment[]): Observable<OrganizationVM[]> {
    return this.httpClient.post<OrganizationVM[]>(`${environment.GetEquipmentsOnOrganization}`, data, this.httpHeader);
  }
  GetEquipmentsOnSupplier(data: Equipment[]): Observable<SupplierVM[]> {
    return this.httpClient.post<SupplierVM[]>(`${environment.GetEquipmentsOnSupplier}`, data, this.httpHeader);
  }
  FilterData(data: filterDto): Observable<Equipment[]> {
    return this.httpClient.post<Equipment[]>(`${environment.FilterData}`, data, this.httpHeader);
  }
  addEquipmentRecall(recallRequest: EquipmentRecall): Observable<EquipmentRecall> {
    return this.httpClient.post<EquipmentRecall>(`${environment.addEquipmentRecall}`, recallRequest, this.httpHeader)

  }
  GetAllRecalledEquipments(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(`${environment.GetAllRecalledEquipments}`, this.httpHeader)
  }
  getEquipmentInHospital(hosId: number): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(`${environment.getEquipmentInHospital}${hosId}`, this.httpHeader);
  }
  getEquipmentInHospitalToEdit(equipment: Equipment[],hosId:number): Observable<Equipment[]>
  {
    return this.httpClient.put<Equipment[]>(`${environment.getEquipmentInHospitalToEdit}${hosId}`,equipment, this.httpHeader);
  }
  // upload(id:number):Observable<any>
  // {
  //   return this.httpClient.post<any>(`${environment.upload}${id}`, this.httpHeader)
  // }
}

