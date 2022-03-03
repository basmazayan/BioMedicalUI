import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentCoverage } from '../Models/Equipment-Coverage';

@Injectable({
  providedIn: 'root'
})
export class EquipmentCoverageService {
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};
  constructor(private httpClient: HttpClient) { }
  getAllEquipmentCoverage():Observable<EquipmentCoverage[]>
  {
    return this.httpClient.get<EquipmentCoverage[]>(`${environment.GetAllEquipmentCoverages}`,this.httpHeader);
  }

  addNewEquipmentCoverage(newEquipmentCoverage: EquipmentCoverage):Observable<EquipmentCoverage>
  {
    return this.httpClient.post<EquipmentCoverage>(`${environment.AddEquipmentCoverage}`,newEquipmentCoverage,this.httpHeader);
  }
  deleteEquipmentCoverage(id: any): Observable <EquipmentCoverage>{
    return this.httpClient.delete<EquipmentCoverage> (`${environment.DeleteEquipmentCoverage}${id}`,this.httpHeader) ;
}
 updateEquipmentCoverage(id:Number,equipmentCoverage:EquipmentCoverage):Observable<any>{
  return this.httpClient.put<any> (`${environment.UpdateEquipmentCoverage}${id}`,equipmentCoverage,this.httpHeader) ;
 }


}
