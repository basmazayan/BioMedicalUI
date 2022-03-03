import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { RequestService } from 'src/app/Shared/Models/RequstService';
import { User } from 'src/app/Shared/Models/User';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { RequestServiceService } from 'src/app/Shared/services/request-service.service';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { VendorService } from 'src/app/Shared/services/vendor.service';
import {WorkOrderService} from 'src/app/Shared/services/work-order.service';
import { UserService } from 'src/app/Shared/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddWorkOrderComponent } from 'src/app/Components/work-order-list/add-WorkOrder/add-work-order/add-work-order.component';
import { WorkOrder } from 'src/app/Shared/Models/WorkOrder';
import { Vendor } from 'src/app/Shared/Models/Vendor';

import { Miantenance } from 'src/app/Shared/Models/Miantenance';
import { SparePart } from 'src/app/Shared/Models/SparePart';
import { Priority } from 'src/app/Shared/Models/Priority';
import { RequestStatus } from 'src/app/Shared/Models/RequestStatus';
import { SharedService } from 'src/app/Shared/services/shared.service';
import {ConfirmationService,Message} from 'primeng/api';
@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.scss']
})
export class WorkOrderListComponent implements OnInit {
  workOrderDialog: boolean;
  workOrderDialogWithoutRequest:boolean;
  // roleName:string=''
  //AllRequests: RequestService[];
  equipments: Equipment[];
  requestObj: RequestService;
  selectedProducts: RequestService[];
  submitted: boolean;
  currentUser: User;
  userFromApi: User;
  WorkOrderList:WorkOrder[];
  WorkOrder:WorkOrder;
  Equipment:Equipment;
  vendor:Vendor[];
  users:User[];
  maintenance: Miantenance;
  sparepart: SparePart;
  dirId: Number;
  maintenanceId:Number;
  sparepartId:Number;
  directories: healthDirectory[];
  requests: RequestService[];
  statusList:RequestStatus[];
  priorities:Priority[];
  WorkOrdersWithoutRequest:WorkOrder[];
  OrdersWithoutRequest:WorkOrder;
  equipmentList:Equipment[];
  msgs: Message[] = [];

  constructor(private router: Router,
    private requestService: RequestServiceService,
    private equipmentService: EquipmentService,
    private translate:TranslateService,
    public dialogService: DialogService,
    private workOrderService:WorkOrderService,
    private employeeService: EmployeeService,
    private vendorService: VendorService,
    private sharedService:SharedService,
    private userService:UserService,
    private confirmationService: ConfirmationService) { this.currentUser = this.userService.currentUserValue; }

  ngOnInit() {
    this.getAll();   
    this.getAllOrdersWithoutRequest();
   // this.equipmentService.getAllEquipments().subscribe(data => this.equipments = data, console.log)
    this.WorkOrder = {
      id: 0,
      workOrderDate: new Date,
      priorityId: 0,
      userId: '',
      vendorId: 0,
      requestStatusId: 0,
      ServiceRequestId: 0,
      maintenanceId: 0,
      sparePartId: 0,
      EquipmentId:0,
      StatusName:'',
      StatusNameAr:'',
      EquipmentName:'',
      EquipmentNameAr:''
    } 
    this.maintenance = {
      id: 0,
      problem: '',
      partCost: 0.00,
      laborCost: 0.00
    };
    this.sparepart = {
      id: 0,
      sparePartName: '',
      sparePartNameAr: '',
      sparePartCode: ''
    };
  }
    getAll() {
      this.workOrderService.getAllWorkOrders().subscribe(data=>{this.WorkOrderList=data});
  }
//   getAll() {
//     console.log("currentUser", this.currentUser.roleName)
//     if (this.currentUser.roleName == 'Admin' ||this.currentUser.roleName ==  'Minister' ||this.currentUser.roleName ==  'Technician') {
// console.log("first")
//       this.requestService.getAllserviceRequests().subscribe(data => {
//         this.AllRequests = data,
//           this.AllRequests.forEach(element => {
//             if (element.employeeEmail == this.currentUser.email) {
//               this.FilteredRequestsBycurrentUser.push(element)
//               console.log("AllRequestsOfTechBefore", this.FilteredRequestsBycurrentUser)
//             }
//             if (this.currentUser.roleName == 'Admin' || 'Minister') {
//               this.AllRequests = this.AllRequests
//             }
//             else if (this.currentUser.roleName == 'Technician') {
//               console.log("AllRequestsOfTechAfterRole", this.FilteredRequestsBycurrentUser)

//               this.AllRequests = this.FilteredRequestsBycurrentUser
//             }

//           });
//         console.log(data)
//       });


//     }
//     if (this.currentUser.roleName == 'Directorate') {
//       console.log("In Directorate", this.currentUser)
//       this.requestService.getAllserviceRequests().subscribe(data => {
//         this.AllRequests = data,
//           this.AllRequests.forEach(element => {
//             if (element.employeeEmail == this.currentUser.email) {
//               this.requestsByDirectoryId.push(element)
//               console.log("AllRequestsOfdirectorateBefore", this.requestsByDirectoryId)
//             }
//             if (this.currentUser.roleName == 'Directorate') {
//               this.AllRequests = this.requestsByDirectoryId
//             }

//           });
//         console.log("ay7aga", data, "email", this.currentUser)
//       });
//     }

//     if (this.currentUser.roleName == 'District') {
//       console.log("in district", this.currentUser)
//       this.requestService.getAllserviceRequests().subscribe(data => {
//         this.AllRequests = data,
//           this.AllRequests.forEach(element => {
//             if (element.employeeEmail == this.currentUser.email) {
//               this.requestsByDistrictId.push(element)
//               console.log("AllRequestsOf district Before", this.requestsByDistrictId)
//             }
//             if (this.currentUser.roleName == 'District') {
//               this.AllRequests = this.requestsByDistrictId
//             }

//           });
//         console.log(data, this.currentUser)
//       });

//     }
//   }
getMaintenance()
{
  //this.workOrderService.getMaintenance().subscribe(data=>{this.maintenance=data});
}
getAllEquipments()
{
  this.equipmentService.getAllEquipments().subscribe(data=>{this.equipmentList=data})
}
openNew(wo) {
  this.workOrderDialog = true
  this.submitted = false;
  this.WorkOrder = wo;
  console.log("from open New",this.WorkOrder);
  this.maintenanceId=this.WorkOrder.maintenanceId;
  this.sparepartId=this.WorkOrder.sparePartId;
  this.getmaintenance(this.maintenanceId);
  this.getsparepart(this.sparepartId);
  // this.getAllEmployees();
  this.getAllVendors();
  this.getstatus();
  this.getPriopities();
  this.getAllEquipments();
  // console.log("mmmm",this.maintenance);
}
openNewDialog(wo1)
{
  this.workOrderDialogWithoutRequest = true
  this.submitted = false;
  this.OrdersWithoutRequest=wo1;
  console.log("from openNewDialog",this.OrdersWithoutRequest);
  this.maintenanceId=this.OrdersWithoutRequest.maintenanceId;
  this.sparepartId=this.OrdersWithoutRequest.sparePartId;
  this.getmaintenance(this.maintenanceId);
  this.getsparepart(this.sparepartId);
  this.getAllUsers();
  this.getAllVendors();
  this.getstatus();
  this.getPriopities();
  this.getAllEquipments();
}
getAllOrdersWithoutRequest()
{
  this.workOrderService.getAllOrdersWithoutRequest().subscribe(data=>{this.WorkOrdersWithoutRequest=data});
}
getmaintenance(id)
{
  this.workOrderService.getMaintenance(id).subscribe(data=>{this.maintenance=data});
}
getsparepart(id)
{
  this.workOrderService.getsparepart(id).subscribe(data=>{this.sparepart=data});
}
getAllUsers() {
  this.userService.getUsers().subscribe(data => { this.users = data});
  this.vendor = [];
}
getAllVendors() {
  this.vendorService.getAllVendors().subscribe(data => { this.vendor = data; console.log("vendors", this.vendor) });
  this.users = [];
}
getstatus()
{
  this.workOrderService.GetAllRequestStatus().subscribe(data=>{this.statusList=data})
}
getPriopities()
{
  this.sharedService.getAllpriorities().subscribe(data=>{this.priorities=data});
}
hideDialog() {
  this.workOrderDialog = false;
  this.submitted = false;
  this.router.navigate(['/home/WorkOrderList/']);
}
hideDialogWithoutRequest() {
  this.workOrderDialogWithoutRequest = false;
  this.submitted = false;
}
editOrg(id: number) {
  this.router.navigate(['home/AddWorkOrder', id]);
}
updateWorkOrder() {
  // console.log("maintenance",this.maintenance);
  // console.log("sparepart",this.sparepart);
  // console.log("workorder",this.WorkOrder);
  this.submitted = true;
  this.workOrderService.updateMaintenance(this.maintenance.id,this.maintenance).subscribe(data=>{console.log("maintenance",data)
    this.workOrderService.updateSparePart(this.sparepart.id,this.sparepart).subscribe(data=>{console.log("sparepart",data)});
    this.workOrderService.UpdateWorkOrder(this.WorkOrder.id, this.WorkOrder).subscribe(data =>{console.log("workOrder",data);});
  });
  this.workOrderDialog = false;
  window.location.reload();
}
updateWorkOrderWithoutRequest() {
  // console.log("maintenance",this.maintenance);
  // console.log("sparepart",this.sparepart);
  // console.log("workorder",this.OrdersWithoutRequest);
  this.submitted = true;
  this.workOrderService.updateMaintenance(this.maintenance.id,this.maintenance).subscribe(data=>{console.log("maintenance",data)
    this.workOrderService.updateSparePart(this.sparepart.id,this.sparepart).subscribe(data=>{console.log("sparepart",data)});
    this.workOrderService.UpdateWorkOrder(this.OrdersWithoutRequest.id, this.OrdersWithoutRequest).subscribe(data =>{console.log("workOrder",data)});
  });
 // this.router.navigate(['/home/WorkOrderList/'])
    this.workOrderDialogWithoutRequest = false;
    window.location.reload();
}

deleteWorkOrder(workorderId) {
 // var result = confirm("Want to delete this request" + "?");
 // if (result) {
    console.log("request");
    this.workOrderService.deleteWorkOrder(workorderId).subscribe(
      data => { console.log(data), this.getAll() }
    );
 // }
 // this.router.navigate(['/home/workOrders/'])
}
confirmDelete(WoId) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this workOrder ?' ,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteWorkOrder(WoId)
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
          this.router.navigate(['/home/workOrders/']) 
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'Delete rejected'}];
      }
  });
}
closeOrder(id)
{
  this.workOrderService.closeorder(id).subscribe();
}
}
