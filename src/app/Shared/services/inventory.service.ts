import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventory } from '../Models/Inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient,
  ) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  AddInInventory(newInventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${environment.AddInInventory}`, newInventory, this.httpHeader)
  }
  getAllInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${environment.getAllInventories}`, this.httpHeader)
  }



}
