import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartmemtByHospitalCodeViewModels } from '../Models/DepartmemtByHospitalCodeViewModels';
import { HealthCareDevicesViewModels } from '../Models/HealthCareDevicesViewModels';
import { modelIDsViewModel } from '../Models/modelIDsViewModel';

@Injectable({
  providedIn: 'root'
})
export class GetStaticApiService {
  public expropriationRequestUrl = environment.APIUrl + 'HealthInfo/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    // withCredentials: false,
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    }),
  };
  constructor(private http: HttpClient) { }
  GetOrginisations( model:modelIDsViewModel) {
    return this.http
      .post(
        this.expropriationRequestUrl +
        'GetOrginisations' , model
      )
      .pipe();
  }
  GetDepartmantsData( model:modelIDsViewModel) {
    return this.http
      .post(
        this.expropriationRequestUrl +
        'GetDepartmantsData' , model
      )
      .pipe();
  }
  GetHealthData(
    hospitalId: number,
    departmantId: number
  ): Observable<HealthCareDevicesViewModels> {
    return this.http
      .get<HealthCareDevicesViewModels>(
        this.expropriationRequestUrl +
          'GetHealthData?hospitalId=' +
          hospitalId +
          '&departmantId=' +
          departmantId
      )
      .pipe();
  }
  GetDepartmantData( id) {
    return this.http
      .get(
        this.expropriationRequestUrl +
        'GetDepartmantData?id='+id
      )
      .pipe();
  }
  GetSubOrginisations( model:modelIDsViewModel) {
    
    return this.http
      .post(
        this.expropriationRequestUrl +
        'GetSubOrginisations' , model
        
      )
      .pipe();
  }
  GetBrands( model:number[]) {
    return this.http
      .post(
        this.expropriationRequestUrl +
        'GetBrands' , model
      )
      .pipe();
  }
  GetSuppliers( model:modelIDsViewModel) {
    return this.http
      .post(
        this.expropriationRequestUrl +
        'GetSuppliers' , model
      )
      .pipe();
  }
  GetDevice(id: number): Observable<DepartmemtByHospitalCodeViewModels> {
    return this.http
      .get<DepartmemtByHospitalCodeViewModels>(
        this.expropriationRequestUrl + 'GetDevice?id=' + id
      )
      .pipe();
  }
}
