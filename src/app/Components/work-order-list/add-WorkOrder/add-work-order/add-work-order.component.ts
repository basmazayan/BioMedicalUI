import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Shared/Models/Employee';
import { Miantenance } from 'src/app/Shared/Models/Miantenance';
import { SparePart } from 'src/app/Shared/Models/SparePart';
import { Status } from 'src/app/Shared/Models/Status';
import { Vendor } from 'src/app/Shared/Models/Vendor';
import { WorkOrder } from 'src/app/Shared/Models/WorkOrder';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { VendorService } from 'src/app/Shared/services/vendor.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { WorkOrderService } from 'src/app/Shared/services/work-order.service';
import { Priority } from 'src/app/Shared/Models/Priority';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from 'src/app/Shared/Models/RequestStatus';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/Shared/services/user.service';
import { User } from 'src/app/Shared/Models/User';
@Component({
  selector: 'app-add-work-order',
  templateUrl: './add-work-order.component.html',
  styleUrls: ['./add-work-order.component.css']
})
export class AddWorkOrderComponent implements OnInit {
  WrokOrderDialog: boolean;
  submitted: boolean;
  maintenance: Miantenance;
  workOrder: WorkOrder;
  sparepart: SparePart;
  employees: Employee[];
  vendor: Vendor[];
  uploadedFiles: any[] = [];
  statusList: RequestStatus[];
  priorityList: Priority[];
  RequestID: Number;
  index:number=0;
  isNextvalid:boolean=false;
  isPrevvalid:boolean=true;
  workOrderDialog: boolean;
  users:User[];
  constructor(private employeeService: EmployeeService,
    private vendorService: VendorService,
    private sharedService: SharedService,
    private workOrderService: WorkOrderService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private translate:TranslateService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.RequestID = this.activeRoute.snapshot.params['id'];
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
    this.workOrder = {
      id: 0,
      workOrderDate: new Date,
      priorityId: 1,
      userId: '',
      vendorId: 0,
      requestStatusId: 1,
      ServiceRequestId: this.activeRoute.snapshot.params['id'],
      maintenanceId: 0,
      sparePartId: 0,
      EquipmentId:0,
      StatusName:'',
      StatusNameAr:'',
      EquipmentName:'',
      EquipmentNameAr:''
    };
    this.openNew();
  }
  openNew() {
    //console.log("addNew");
    this.WrokOrderDialog = true;
    this.submitted = false;
    this.workOrderService.createNewStatus().subscribe(data=>{console.log(data);
    this.workOrderService.GetAllRequestStatus().subscribe
    (data => { this.statusList = data,console.log("created",this.statusList) })});
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });    
  }
  saveWorkOrder() {
    this.submitted = true;
    this.AddMaintenance();
    // this.AddWorkOrder();
    this.router.navigate(['/home/getRequests/']);
  }
  Addworkorder() {
    //console.log("IIID",this.workOrder.ServiceRequestId);
    // this.workOrderService.AddWorkOrder(this.workOrder).subscribe(data => { console.log("WorkOrder", data) });
  }
  AddMaintenance() {
    this.sharedService.AddMaintenance(this.maintenance)
      .subscribe(data => { this.maintenance = data, console.log("maintenance", data) 
      this.workOrder.maintenanceId = this.maintenance.id;
      this.sharedService.AddSparePart(this.sparepart).subscribe(data=>{this.sparepart=data
      this.workOrder.sparePartId=this.sparepart.id
       this.workOrderService.AddWorkOrder(this.workOrder).subscribe(data => { console.log("WorkOrder", data) });
    });
      
      });
    //  this.Addworkorder();
  }
  hideDialog() {
    this.workOrderDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/getRequests/']);
  }
  getAllUsers() {
    this.userService.getUsers().subscribe(data => { this.users = data 
    this.vendor = [];
    this.workOrder.vendorId=0;
  });
  }
  getAllVendors() {
    this.vendorService.getAllVendors().subscribe(data => { this.vendor = data; console.log("vendors", this.vendor) 
    this.users = [];
    this.workOrder.userId='';
  });
}

  onDrop(event: any) {
    // console.log(event);
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
  }
  onDragOver(evt) {
    //console.log(evt);
    evt.preventDefault();
    evt.stopPropagation();
  }
  onDragLeave(evt) {
    console.log(evt);

    evt.preventDefault();
    evt.stopPropagation();
  }

  upload(event) {
    for (let file of event.files) {
      console.log(event)
      this.uploadedFiles.push(file);
    }
  }
  Next()
  {
     this.index++;
     if(this.index==4)
     {
       this.isNextvalid=true;
       this.isPrevvalid=false;
     }
    console.log("indexNext",this.index);
  }
   Previous()
   {
      this.index--;
      if(this.index==0)
      {
        this.isNextvalid=false;
        this.isPrevvalid=true;    
      }    
      console.log("indexPrev1",this.index);
   }
   handleChange(e) {
     this.index = e.index;
     if(this.index==4)
     {
       this.isNextvalid=true;
       this.isPrevvalid=false;
     }
     else if(this.index==0)
     {
       this.isNextvalid=false;
       this.isPrevvalid=true;
       console.log("Zeeero",this.index);
   }
  }
}
