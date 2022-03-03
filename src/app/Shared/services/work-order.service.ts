import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Miantenance } from '../Models/Miantenance';
import { RequestStatus } from '../Models/RequestStatus';
import { SparePart } from '../Models/SparePart';
import { WorkOrder } from '../Models/WorkOrder';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  constructor(private httpClient: HttpClient, private router: Router) { }
  AddWorkOrder(workorder:WorkOrder):Observable<WorkOrder>
  {
    return this.httpClient.post<WorkOrder>(`${environment.AddNewWorkOrder}`,workorder,this.httpHeader);
  }
  GetAllRequestStatus():Observable<RequestStatus[]>
  {
    return this.httpClient.get<RequestStatus[]>(`${environment.GetAllRequestStatus}`,this.httpHeader);
  }
  Delete(id:Number):Observable<any>
  {
    return this.httpClient.delete<any>(`${environment.deleteWorkOrder}${id}`,this.httpHeader);
  }
  createNewStatus():Observable<any>{
    return this.httpClient.get<any>(`${environment.createNewStatus}`,this.httpHeader)
  }
  getAllWorkOrders():Observable<WorkOrder[]>
  {
    return this.httpClient.get<WorkOrder[]>(`${environment.getAllOworkOrders}`,this.httpHeader) 
  }
  getMaintenance(id:Number):Observable<Miantenance>
  {
    return this.httpClient.get<Miantenance>(`${environment.GetMaintenance}${id}`,this.httpHeader) 
  }
  getsparepart(id:Number):Observable<SparePart>
  {
    return this.httpClient.get<SparePart>(`${environment.GetSparePart}${id}`,this.httpHeader)
  }
  getWorkOrder(id:Number):Observable<WorkOrder>
  {
    return this.httpClient.get<WorkOrder>(`${environment.getOneWorkOrder}${id}`,this.httpHeader) 
  }
  UpdateWorkOrder(id:Number,workorder:WorkOrder):Observable<any>
  {
    return this.httpClient.put<any> (`${environment.UpdateWorkOrder}${id}`,workorder,this.httpHeader) ;
  }
  updateMaintenance(id:Number,miantenance:Miantenance):Observable<any>
  {
    return this.httpClient.put<any> (`${environment.UpdateMaintenance}${id}`,miantenance,this.httpHeader) ;
  }
  updateSparePart(id:Number,sparePart:SparePart):Observable<any>
  {
    return this.httpClient.put<any> (`${environment.UpdateSparePart}${id}`,sparePart,this.httpHeader) ;
  }
  deleteWorkOrder(id:Number):Observable<any>
  {
    return this.httpClient.delete<any> (`${environment.DeleteWorkOrder}${id}`,this.httpHeader) ;
  }
  AddOrderWithoutRequest(workorder:WorkOrder):Observable<WorkOrder>
  {
    return this.httpClient.post<WorkOrder>(`${environment.AddWorkOrderWithoutRequest}`,workorder,this.httpHeader);
  }
  getAllOrdersWithoutRequest():Observable<WorkOrder[]>
  {
    return this.httpClient.get<WorkOrder[]>(`${environment.getOrdersWithoutRequest}`,this.httpHeader) 
  }
  closeorder(id:Number):Observable<any>
  {
    return this.httpClient.put<any> (`${environment.Closeorder}${id}`,this.httpHeader) ;
  }
}
