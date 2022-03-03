import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  // getAllWithPaging<T>():Observable<T[]>
  // {
  //   return this.httpClient.get<T[]>(`${environment.GetAllWithPaging}`, this.httpHeader);
  // }
}
