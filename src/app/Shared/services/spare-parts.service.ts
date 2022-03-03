import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SparePart } from '../Models/SparePart';

@Injectable({
  providedIn: 'root'
})
export class SparePartsService {

  constructor(private httpClient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};
  getAllSpareParts():Observable<SparePart[]>
  {
    return this.httpClient.get<SparePart[]>(`${environment.GetAllSpareParts}`,this.httpHeader);
  }

  addSparePart(newSparePart: SparePart):Observable<SparePart>
  {
    return this.httpClient.post<SparePart>(`${environment.AddSparePart}`,newSparePart,this.httpHeader);
  }
  deleteSparePart(id: any): Observable <SparePart>{
    return this.httpClient.delete<SparePart> (`${environment.DeleteSparePart}${id}`,this.httpHeader) ;
}
 updateSparePart(id:Number,sparePart:SparePart):Observable<any>{
  return this.httpClient.put<any> (`${environment.UpdateSparePart}${id}`,sparePart,this.httpHeader) ;
 }


}
