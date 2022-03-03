import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendor } from '../Models/Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  constructor(private httpClient: HttpClient, private router: Router) { }
  getAllVendors():Observable<Vendor[]>
  {
    return this.httpClient.get<Vendor[]>(`${environment.GetVendors}`, this.httpHeader);
  }
}
