import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { RequestService } from 'src/app/Shared/Models/RequstService';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { RequestServiceService } from 'src/app/Shared/services/request-service.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Mode } from 'src/app/Shared/Models/Mode';

import { ConfirmationService, Message } from 'primeng/api';

//import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.scss'],
  providers: [DatePipe]
})
export class ServiceRequestListComponent implements OnInit {
  serviceDialog: boolean;

  requests: RequestService[];
  equipments: Equipment[];
  requestObj: RequestService;
  selectedProducts: RequestService[];
  currentUser: User;
  AllRequests: RequestService[];
  FilteredRequestsBycurrentUser: RequestService[];
  requestsByDirectoryId: RequestService[];
  requestsByDistrictId: RequestService[];

  s: string = '';

  msgs: Message[] = [];

  time: string = '';

  submitted: boolean;
  selectedEquip: Equipment;
  priorityList: Priority[];
  modesList: Mode[]
  constructor(private router: Router,
    private requestService: RequestServiceService,
    private equipmentService: EquipmentService,

    private translate: TranslateService,
    private userService: UserService, private datePipe: DatePipe,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService) { this.currentUser = this.userService.currentUserValue; }




  ngOnInit() {
console.log(this.currentUser)
    this.getAll();
    this.equipmentService.getAllEquipments().subscribe(data => this.equipments = data, console.log)
    this.requestObj = {
      id: 0,
      serviceRequestCode: '',
      serviceRequestTitle: '',
      problemDescription: '',
      serviceRequestTitleAr: '',
      problemDescriptionAr: '',
      serviceRequestDate: new Date(),
      serviceRequestTime: '',
      employeeId: '',
      employeeEmail: '',
      requestType: '',
      EquipmentId: 0,
      healthDirectoryId: 0,
      healthDistrictId: 0,
      modeId: 0,
      priorityId: 0
    }
this.FilteredRequestsBycurrentUser=[]
    this.requestsByDistrictId = []
    this.AllRequests=[]
    this.requestsByDirectoryId=[]
    //console.log("requestObject to Edit",this.requestObj);
  }

  // getAll() {
  //   this.requestService.getAllserviceRequests().subscribe(data => {
  //     this.requests = data,console.log("requestsList",data)});
  // }



  getAll() {
    console.log("currentUser", this.currentUser.roleName,this.currentUser.email)
    if (this.currentUser.roleName == 'Admin' || this.currentUser.roleName == 'Technician') {
      console.log("first",this.currentUser.email)
      this.requestService.getAllserviceRequests().subscribe(data => {
        this.AllRequests = data,
        console.log(this.AllRequests)
          this.AllRequests.forEach(element => {
          
            if (element.employeeEmail == this.currentUser.email ) {
              this.FilteredRequestsBycurrentUser.push(element)
              console.log("here", element.employeeEmail,this.FilteredRequestsBycurrentUser)
            }
            if (this.currentUser.roleName == 'Admin') {
              this.AllRequests = this.AllRequests
              console.log("donot display")
            }
            else if (this.currentUser.roleName == 'Technician') {
              console.log("tech", this.FilteredRequestsBycurrentUser)

              this.AllRequests = this.FilteredRequestsBycurrentUser
            }
          
          });
        console.log(data)
      });


    }
    if (this.currentUser.roleName == 'Directorate') {
      console.log("In Directorate", this.currentUser)
      this.requestService.getAllserviceRequests().subscribe(data => {
        this.AllRequests = data,
          this.AllRequests.forEach(element => {
            if (element.healthDirectoryId == this.currentUser.healthdirId) {
              this.requestsByDirectoryId.push(element)
              console.log("AllRequestsOfdirectorateBefore", this.requestsByDirectoryId)
            }
            if (this.currentUser.roleName == 'Directorate') {
              this.AllRequests = this.requestsByDirectoryId
            }

          });
        console.log("ay7aga", this.AllRequests, "email", this.currentUser)
      });
    }

    if (this.currentUser.roleName == 'District') {
      console.log("in district", this.currentUser)
      this.requestService.getAllserviceRequests().subscribe(data => {
        this.AllRequests = data,
          this.AllRequests.forEach(element => {
            if (element.healthDistrictId == this.currentUser.healthDistrictId) {
              console.log(this.requestsByDistrictId)
              this.requestsByDistrictId.push(element)
              console.log("AllRequestsOf district Before", element.healthDistrictId, this.currentUser.healthDistrictId)
            }
            if (this.currentUser.roleName == 'District') {
              this.AllRequests = this.requestsByDistrictId
            }

          });
        console.log(data, this.currentUser)
      });

    }
  }
  getTime() {

    // this.requestObj.serviceRequestDate=new Date(this.s);
    var hours = this.requestObj.serviceRequestDate.getHours();
    var minutes = this.requestObj.serviceRequestDate.getMinutes();
    // var secondes = this.requestObj.serviceRequestDate.getSeconds();
    this.requestObj.serviceRequestTime = hours + ':' + minutes;
    // console.log("Daate",this.s);
    // console.log("tiiiime",this.requestObj.serviceRequestTime);
  }
  openNew(req) {

    console.log("openNew");
    this.s = this.datePipe.transform(req.serviceRequestDate, 'yyyy-MM-dd');
    this.sharedService.getAllpriorities().subscribe(data => {
      this.priorityList = data,
        console.log("priority list", this.priorityList)
    });
    this.sharedService.getAllModes().subscribe(data => { this.modesList = data });
    this.equipmentService.getAllEquipments().subscribe(data => this.equipments = data, console.log)
    this.serviceDialog = true;
    this.submitted = false;
    this.requestObj = req;
    // console.log("openNew");
    this.s = this.datePipe.transform(req.serviceRequestDate, 'yyyy-MM-dd');
    //this.time=this.datePipe.transform(req.serviceRequestDate,"h:mm a");
    //this.getTime();
    this.serviceDialog = true;
    this.submitted = false;
    if (req.serviceRequestTime.hours < 10 && req.serviceRequestTime.minutes < 10) {
      this.time = req.serviceRequestTime.days + '' + req.serviceRequestTime.hours + ':' + req.serviceRequestTime.days + '' + req.serviceRequestTime.minutes;
    }
    else if (req.serviceRequestTime.hours < 10) {
      this.time = req.serviceRequestTime.days + '' + req.serviceRequestTime.hours + ':' + req.serviceRequestTime.minutes;
    }
    else if (req.serviceRequestTime.minutes < 10) {
      this.time = req.serviceRequestTime.hours + ':' + req.serviceRequestTime.days + '' + req.serviceRequestTime.minutes;
    }
    else {
      this.time = req.serviceRequestTime.hours + ':' + req.serviceRequestTime.minutes;
    }
    this.requestObj = req;
    // console.log("NewDate",req.serviceRequestDate);
    console.log("NewTimwe", this.time);
    console.log("time", req.serviceRequestTime);
  }

  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
    
  }

  updateRequest() {
    console.log("insideUpdate")
    this.submitted = true;

    console.log("rrequest", this.requestObj);

    this.requestObj.serviceRequestDate = new Date(this.s);
    this.requestObj.serviceRequestTime = this.time;
    this.requestService.updateRequest(this.requestObj.id, this.requestObj).subscribe(data => {
       console.log("requests", data) ,this.hideDialog()});
    // this.requestService.updateRequest(this.requestObj.id, this.requestObj).subscribe(data => { console.log("requests", data) });

    this.serviceDialog = false;
    // window.location.reload();
  }


  deleteRequest(requestId) {
    // var result = confirm("Want to delete this request" + "?");
    // if (result) {
    // console.log("request");
    this.requestService.deleteRequest(requestId).subscribe(

      data => { console.log(data), this.getAll() }
      // this.router.navigate(['/home/getRequests/'])
    );
  }


  // }
  // this.router.navigate(['/home/getRequests/']) 


  confirmDelete(reqId, reqName) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this' + reqName + ' request?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteRequest(reqId)
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Delete rejected' }];
      }
    });
  }
  editOrg(id: number) {
    this.router.navigate(['home/AddWorkOrder', id]);
  }

  onselectEquipment(equipmentId) {
    if (this.currentUser.roleName == 'Technician') {
      this.equipmentService.getEquipmentById(equipmentId).subscribe(data => {
        this.selectedEquip = data,
          this.requestObj.EquipmentId = this.selectedEquip.id,
          this.requestObj.healthDirectoryId = this.selectedEquip.healthDirectoryId;
        this.requestObj.healthDistrictId = this.selectedEquip.healthDistrictId;
        console.log(data, this.requestObj.healthDistrictId, this.requestObj.EquipmentId, ';;;;')
      });
    }
    else if (this.currentUser.roleName == 'Admin') {
      this.equipmentService.getEquipmentById(equipmentId).subscribe(data => {
        this.selectedEquip = data,
          this.requestObj.healthDirectoryId = this.selectedEquip.healthDirectoryId;
        this.requestObj.healthDistrictId = this.selectedEquip.healthDistrictId;
        this.requestObj.employeeId = this.selectedEquip.employeeIDs[0];

        console.log(data, this.requestObj.employeeId)
      });
    }
  }

  // getEquipmentById(equipId) {
  //   this.equipmentService.getEquipmentById(equipId).subscribe(data => { this.equipmentObj = data, console.log(this.equipmentObj) })

  // }

}
