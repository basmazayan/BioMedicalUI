import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { Mode } from 'src/app/Shared/Models/Mode';
import { Priority } from 'src/app/Shared/Models/Priority';
import { RequestService } from 'src/app/Shared/Models/RequstService';
import { User } from 'src/app/Shared/Models/User';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { RequestServiceService } from 'src/app/Shared/services/request-service.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { UserService } from 'src/app/Shared/services/user.service';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/Shared/Models/Employee';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-service-request-add',
  templateUrl: './service-request-add.component.html',
  styleUrls: ['./service-request-add.component.css'],
  providers: [DatePipe]
})

export class ServiceRequestAddComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router, private requestService: RequestServiceService,
    private sharedService: SharedService,
    private equipmentService: EquipmentService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) { this.currentUser = this.userService.currentUserValue; }
  requestDialog: boolean;
  requests: RequestService[];
  requestObj: RequestService;
  equipmentObj: Equipment;
  submitted: boolean;
  priorityList: Priority[];
  modesList: Mode[];
  equipmentList: Equipment[];
  equipId: number;
  employee: Employee;
  selectedEquip: Equipment;
  // myDate: Date;
  s: string = ''
  myDate = new Date();
  districtsEquipments: Equipment[]
  // equipList:Equipment[];
  ngOnInit() {
    this.requestObj = {
      id: 0,
      serviceRequestCode: '',
      serviceRequestTitle: '',
      serviceRequestTitleAr: '',
      problemDescriptionAr: '',
      problemDescription: '',
      serviceRequestDate: new Date,
      serviceRequestTime: '',
      employeeEmail: '',
      requestType: '',
      EquipmentId: 0,
      employeeId: '',
      healthDirectoryId: 0,
      healthDistrictId: 0,
      modeId: 0,
      priorityId: 0
    };

    this.equipmentObj = {
      id: 0,
      equipmentDescription: '',
      equipmentName: "",
      equipmentDescriptionAr: '',
      equipmentNameAr: "",
      installationDate: new Date(),
      purchaseDate: new Date(),
      priorityId: 0,
      equipmentCategoryId: 0,
      equipmentSubCategoryId: 0,
      equipmentStatuSId: 0,
      statusName:'',
      statusNameAr:'',
      manufacturerId: 0,
      originId: 0,
      healthCareUnitId: 0,
      healthCareUnit: '',
      healthCareUnitName:'',
      healthCareUnitNameAr:'',
      supplierId: 0,
      supplierName:'',
      supplierNameAr:'',
      expectedLifeTime: 0,
      length: 0,
      height: 0,
      weight: 0,
      departmentId: 0,
      departmentName:'',
      departmentNameAr:'',
      room: 0,
      floor: 0,
      remarks: '',
      price: 0,
      modelNumber: '',
      versionNumber: '',
      serialNumber: '',
      internalCode: '',
      upaCode:'',
      barcode: '',
      color: '',
      colorAr: '',
      manufacturerName: '',
      manufacturerNameAr:'',
      healthDirectoryId: 0,
      healthDirectoryName: '',
      healthDirectoryNameAr:'',
      healthDistrictId: 0,
      healthDistrictName: '',
      healthDistrictNameAr:'',
      employeeIDs: [],
      AttachmentIDs:[],
      masterEquipmentId: 0,
      qrImgPath:'',
      createdAt:new Date(),
      organizationName:'',
      organizationNameAr:'',
      time:'',
      recallNumber:0,
      recallDate:new Date(),
      organizationId:0,
      contractRequestId:0,
      organizationrequestid:0,
      contractid:0,
      DepreciationRate:0
    }
    this.districtsEquipments = []
    this.s = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    console.log(this.s, "jjjj")

    var hours = this.requestObj.serviceRequestDate.getHours();
    var minutes = this.requestObj.serviceRequestDate.getMinutes();
    var secondes = this.requestObj.serviceRequestDate.getSeconds();
    console.log("cuurentuser", this.currentUser);
    this.requestObj.serviceRequestTime = hours + ':' + minutes + ':' + secondes;


    this.openNew()
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data, console.log("priority list", this.priorityList) });
    this.sharedService.getAllModes().subscribe(data => { this.modesList = data });


    console.log("currentUserEmail", this.currentUser.email);
  }
  openNew() {

    this.requestDialog = true;

    if (this.currentUser.roleName == 'Technician') {
      // this.employeeService.getUserByEmail(this.currentUser.email).subscribe(data => {
      //   this.employee = data,
      //     console.log("UsersEmps", this.employee);
      //   this.requestObj.employeeId = this.employee.id;
      //   console.log("IID", this.employee.id);
      // });
      // this.getEquipmentByempId(this.currentUser.email);
      // this.equipmentService.getEquipmentsByemp(this.currentUser.email).subscribe(data => this.equipmentList = data);

    }
    else if (this.currentUser.roleName == 'Admin' || this.currentUser.roleName == 'District') {
      console.log("admin")
      // this.getEquipmentById(this.requestObj.EquipmentId)
      this.equipmentService.getAllEquipments().subscribe(data => {
        this.equipmentList = data,
          this.equipmentList.forEach(element => {
            if (element.healthDistrictId == this.currentUser.healthDistrictId) {

              this.districtsEquipments.push(element)
            }
            if (this.currentUser.roleName == 'Admin') {
              this.equipmentList = this.equipmentList

            }
            if (this.currentUser.roleName == 'District') {
              this.equipmentList = this.districtsEquipments
            }
          })

      })
    }
    console.log("currentUserEmail", this.currentUser.email);


    // this.employeeService.getUserByEmail(this.currentUser.email).subscribe(data => {
    //   this.employee = data;
    //   console.log("IID", this.employee.id);
    //   this.requestObj.employeeId = this.employee.id;
    // });
    this.requestDialog = true;

  }

  hideDialog() {
    this.requestDialog = false;
  

  }
  saveProduct() {
    this.submitted = true;
    console.log("save")
    this.makeRequest();
   
  }

  makeRequest() {
    console.log("requestObj", this.requestObj);



    this.requestService.makeRequest(this.requestObj).subscribe(data => {this.hideDialog(), console.log("Saved", data) });

  }
  // getEquipmentByempId(empId) {
  //   this.equipmentService.getEquipmentsByemp(empId).subscribe(data => { this.equipmentList = data; console.log("equips", this.equipmentList); })
  // }


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

        console.log(data, this.requestObj.employeeId, "uuuuuuuuuuuuu")
      });
    }
  }

  getEquipmentById(equipId) {
    this.equipmentService.getEquipmentById(equipId).subscribe(data => { this.equipmentObj = data, console.log(this.equipmentObj) })

  }
}




