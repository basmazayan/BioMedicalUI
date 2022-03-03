import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContractRequest, ContractRequestVM, ContractVM, OrganizationRequests } from 'src/app/Shared/Models/ContractRequest';
import { Equipment, EquipmentVM } from 'src/app/Shared/Models/Equipment';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { PrimeNGConfig } from 'primeng/api';
import { data } from 'jquery';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { OrganizationContractRequest } from 'src/app/Shared/Models/OrganizationContractRequest';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { dateVM } from 'src/app/Shared/Models/dateVM';
import { element } from 'protractor';
import { MenuItem } from 'primeng/api';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { Contract } from 'src/app/Shared/Models/Contract';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RequestStatus } from 'src/app/Shared/Models/RequestStatus';
export enum pageNames {
  page1,
  page2
}
@Component({
  selector: 'app-contract-request',
  templateUrl: './contract-request.component.html',
  styleUrls: ['./contract-request.component.css']
})
export class ContractRequestComponent implements OnInit {
  RequestObj: ContractRequestVM;
  // RequestObjToEdit: ContractRequestVM;
  OrganizationRequestObj: OrganizationContractRequest;
  EquipmentList: Equipment[];
  EquipmentListToEdit: Equipment[];
  EquipmentIDs: number[] = [];
  OrganizationEquipmentIDs: number[] = [];
  UPAEquipmentIDs: number[] = [];
  SelectedEquipmentList: Equipment[] = [];
  SelectedEquipmentListForEdit: Equipment[];
  ALLEquipmentListForEdit: Equipment[] = [];
  SelectedtList: Equipment[] = [];
  isFound: boolean = false;
  isFoundInEdit: boolean = false;
  isFoundInList: boolean = false;
  newEquip: Equipment;
  currentUser: User;
  hospitalRequestdate: string;
  organizationRequestdate: string;
  errorMsg: string;
  successMsg: string;
  hospitalList: ContractVM[];
  hospitalWithRequestList: ContractVM[] = [];
  hospitalWithRequestList1: ContractVM[] = [];
  nullablMSG: string;
  MSG: string;
  manufacturerList: Manufacturer[];
  orgId: number;
  d: dateVM;
  dfrom: string;
  dto: string;
  items: MenuItem[];
  RequestID:number;
  vewid:number;
  organizationRequestList: OrganizationRequests[];
  orgRequestList: OrganizationRequests[] = [];
  healthDirectoriesList: healthDirectory[];
  HealthDistrictsList: HealthDistrict[];
  healthCareUnits: HealthCareUnit[];
  suppliersList: Supplier[];
  equipmentInContract: Equipment[];
  contractObj: Contract;
  contractEquipment: Equipment[];
  EquipmentInEachContract: Equipment[];
  contractList: Contract[];
  contract: Contract;
  pageNames = pageNames;
  visibleFrom:boolean=true;
  visibleTo:boolean=true;
  requestStatus:RequestStatus;
  activeIndex = pageNames.page1;
  selected:boolean=false;
 
  constructor(public translate: TranslateService, private equipmentService: EquipmentService,
    private primengConfig: PrimeNGConfig, private userService: UserService,
    private contractRequestService: ContractService, private datePipe: DatePipe,
    private messageService: MessageService, private sharedService: SharedService,
    private router:Router,private activeRoute: ActivatedRoute) { this.currentUser = this.userService.currentUserValue; }

  ngOnInit(): void {
    this.SelectedEquipmentListForEdit=[];
    console.log('SelectedEquipmentListForEdit from oninit',this.SelectedEquipmentListForEdit)

    this.RequestID = this.activeRoute.snapshot.params['id'];
    this.vewid= this.activeRoute.snapshot.params['vewid'];
    
    this.primengConfig.ripple = true;
    this.requestStatus={
      Status:'',
      StatusAr:'',
      id:0
    }
    
    this.RequestObj = {
      id: 0,
      hospitalId: 0,
      number: 0,
      date: new Date,
      comments: '',
      status:0,
      equipments: [],
      numberOfEquipment:0
    }
    this.OrganizationRequestObj = {
      id: 0,
      organizationId: 0,
      number: 0,
      date: new Date,
      equipmentIDs: []
    }
    this.contractObj = {
      id: 0,
      number: 0,
      startDate: null,
      endDate: null,
      contents: '',
      healthCareUnitId: null,
      subject: '',
      supplierId: null,
      supplierName: '',
      supplierNameAr: '',
      equipmentIDs: []
    }
    this.d = {
      from: null,
      to: null
    }
    if(this.RequestID!=undefined)
    {
      this.getRequestToEdit(this.RequestID);
    }
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.hospitalRequestdate = this.datePipe.transform(this.RequestObj.date, 'yyyy-MM-dd');
    this.organizationRequestdate = this.datePipe.transform(this.OrganizationRequestObj.date, 'yyyy-MM-dd');
    this.RequestObj.number = Math.floor((Math.random() * 1000) + 1);
    this.RequestObj.hospitalId = this.currentUser.healthCareUnitId;
    this.OrganizationRequestObj.organizationId = this.currentUser.organizationId;
    this.OrganizationRequestObj.number = Math.floor((Math.random() * 1000) + 1);
    if (this.currentUser.roleName == "Hospital") {
      this.getAllEquipment(this.currentUser.healthCareUnitId);
    }
    if (this.currentUser.roleName == "Organization") {
      this.getAllRequestsForOrg();
    }
    this.orgId = this.currentUser.organizationId;
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    if (this.currentUser.roleName == "Admin") {
      this.getRequestForUPA();
    }
    this.items = [{
      label: 'Prepare Contract Request'
    },
    {
      label: 'Create Contract'
    }];
  }

  getAllEquipment(hosId) {
    this.equipmentService.getEquipmentInHospital(hosId).subscribe(data => {
      this.EquipmentList = data
      if (this.EquipmentList.length == 0) {
        this.MSG = "there is no equipment need to be in request";
      }
    });
  }

  selectEquipment() 
  {
    this.EquipmentIDs.forEach(id => {
      this.equipmentService.getEquipmentById(id).subscribe(data => {
        const index = this.EquipmentList.findIndex(item => item.id === data.id);
        if(this.RequestID!=undefined)
        {
          var indexForEditSelectedList=this.EquipmentListToEdit.findIndex(item=>item.id === data.id);
        }
        if (this.RequestObj.equipments.length > 0 && this.SelectedEquipmentList.length > 0) {
          this.RequestObj.equipments.forEach(eq => {
            if (eq.id == data.id) {
              this.isFound = true;
            }
          });
          if (!this.isFound) {
            this.RequestObj.equipments.push(data);
            this.SelectedEquipmentList.push(data);
            this.EquipmentList.splice(index, 1);
            this.EquipmentListToEdit.splice(indexForEditSelectedList,1);
          }
          this.isFound = false;
        }
        else {
          this.RequestObj.equipments.push(data);
          this.SelectedEquipmentList.push(data);
          this.EquipmentList.splice(index, 1);
          this.EquipmentListToEdit.splice(indexForEditSelectedList,1);
        }
      });
    });
    // this.SelectedEquipmentList.forEach(element=>{
    //   this.SelectedEquipmentListForEdit.push(element);
    // })
    // console.log("this.SelectedEquipmentList",this.SelectedEquipmentList)
  }
  outEquipment() {
    console.log("this.SelectedtList",this.SelectedtList)
    this.SelectedtList.forEach(equip => {
      const indexInSelected = this.SelectedEquipmentList.findIndex(item => item.id === equip.id);
      const indexInObj = this.RequestObj.equipments.findIndex(item => item.id === equip.id);
      const indexInNewList = this.SelectedtList.findIndex(item => item.id === equip.id);
      if (this.RequestObj.equipments.length > 0 && this.SelectedEquipmentList.length > 0) {
        if(this.RequestID==undefined)
        {
          this.EquipmentList.forEach(eq => {
            if (eq.id == equip.id) {
              this.isFound = true;
            }
          });
        }
        else 
        {
          this.EquipmentListToEdit.forEach(eq => {
            if (eq.id == equip.id) {
              this.isFoundInEdit = true;
            }
          });
        }
        if (!this.isFound && this.RequestID==undefined) {
          this.EquipmentList.push(equip);
          this.SelectedEquipmentList.splice(indexInSelected, 1);
          this.RequestObj.equipments.splice(indexInObj, 1);
          this.SelectedtList.splice(indexInNewList, 1);
        }       
        this.isFound = false;
        if (!this.isFoundInEdit  && this.RequestID!=undefined) {
          this.EquipmentListToEdit.push(equip);
          this.RequestObj.equipments.splice(indexInObj, 1);
          this.SelectedtList.splice(indexInNewList, 1);
        }
        this.isFoundInEdit = false;
      }
      else {
        this.EquipmentListToEdit.push(equip);
        this.RequestObj.equipments.splice(indexInObj, 1);
     }
    });
  }
  selectEquipmentToOut(id) {
  document.getElementById(id).style.backgroundColor="silver";
    const indexInNewList = this.SelectedtList.findIndex(item => item.id === id);
    this.equipmentService.getEquipmentById(id).subscribe(data => {
      if (this.SelectedtList.length > 0) {
        this.SelectedtList.forEach(elem => {
          if (elem.id == data.id) {
            this.isFoundInList = true;
          }
        });
        if (!this.isFoundInList) {
          this.SelectedtList.push(data);
        }
        else {
          this.SelectedtList.splice(indexInNewList, 1);
        }
        this.isFoundInList = false;
      }
      else {
        this.SelectedtList.push(data);
      }
    });
  }
  onSave(arg) {
    if(arg==="Save")
    {
      this.RequestObj.status=0;
    }
    else if(arg==="sent") 
    {
      this.RequestObj.status=1;
    }
    if(this.RequestID==undefined)
    {
      this.contractRequestService.AddContractRequest(this.RequestObj).subscribe(data => {
        this.successMsg = data;
        if (this.translate.currentLang == 'En') {
          this.messageService.add({ severity: 'info', detail: data.message });
          window.location.reload();
        }
        else {
          this.messageService.add({ severity: 'info', detail: data.messageAr });
          window.location.reload();
        }
      },
        error => {
          if (this.translate.currentLang == 'En')
            this.messageService.add({ severity: 'info', detail: error.error.message });
          else
            this.messageService.add({ severity: 'info', detail: error.error.messageAr });
        }
      );
    }
    else
    {
      this.contractRequestService.updateContractRequest(this.RequestObj).subscribe(data => {
        this.successMsg = data;
        if (this.translate.currentLang == 'En') {
          this.messageService.add({ severity: 'info', detail: data.message });
          window.location.reload();
        }
        else {
          this.messageService.add({ severity: 'info', detail: data.messageAr });
          window.location.reload();
        }
      },
        error => {
          if (this.translate.currentLang == 'En')
            this.messageService.add({ severity: 'info', detail: error.error.message });
          else
            this.messageService.add({ severity: 'info', detail: error.error.messageAr });
        }
      );
    }
    this.router.navigate(['/home/ContractRequest'])
  }
  onOrgRequestSave() {
    this.OrganizationRequestObj.equipmentIDs = this.OrganizationEquipmentIDs;
    this.contractRequestService.AddOrganizationContractRequest(this.OrganizationRequestObj).subscribe(data => {
      this.successMsg = data;
      if (this.translate.currentLang == 'En') {
        this.messageService.add({ severity: 'info', detail: data.message });
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      }
      else {
        this.messageService.add({ severity: 'info', detail: data.messageAr });
        setTimeout(() => {
          window.location.reload();
        }, 30000)

      }
    },
      error => {
        if (this.translate.currentLang == 'En')
          this.messageService.add({ severity: 'dander', detail: error.error.message });
        else
          this.messageService.add({ severity: 'info', detail: error.error.messageAr });
      }
    )
  }
  InformByEmail(){
    
  }
  getAllRequestsForOrg() {
    this.contractRequestService.getHosForOrg(this.currentUser.organizationId).subscribe(data => {
      this.hospitalList = data,
        this.hospitalList.forEach(elem => {
          if (elem.contractRequests.length > 0) {
            // if($('#FromDate').val()!=undefined && $('#ToDate').val()!=undefined)
            //   {
            //     elem.contractRequests.forEach(req=>{
            //       if(this.datePipe.transform(req.date,'yyyy-MM-dd')>=$('#FromDate').val() && 
            //       this.datePipe.transform(req.date,'yyyy-MM-dd')<=$('#ToDate').val())
            //       {
            //         this.hospitalWithRequestList.push(elem);
            //       }
            //     })               
            //   }
              this.hospitalWithRequestList.push(elem);
          }
        })
        console.log("this.hospitalWithRequestList",this.hospitalWithRequestList)
      if (this.hospitalWithRequestList.length == 0) {
        this.nullablMSG = "there is no new request.";
      }
    });
    
    // if($('#FromDate').val()!=undefined && $('#ToDate').val()!=undefined)
    // {     
    //   this.hospitalWithRequestList.forEach(element=>{
    //     element.contractRequests.forEach(el=>{
    //       console.log("$('#FromDate').val()",$('#FromDate').val());
    //       console.log("pipe",(this.datePipe.transform(el.date,'yyyy-MM-dd')));

    //       if(this.datePipe.transform(el.date,'yyyy-MM-dd')>=$('#FromDate').val() && 
    //       this.datePipe.transform(el.date,'yyyy-MM-dd')<=$('#ToDate').val())
    //       {
    //         console.log("equuuals");
    //         this.hospitalWithRequestList1.forEach(e=>
    //           {
    //             e.contractRequests.push(el);
    //           })
    //       }
    //       else
    //       {
    //         this.hospitalWithRequestList1=this.hospitalWithRequestList;
    //       }
    //     })
    //     console.log("this.hospitalWithRequestList", this.hospitalWithRequestList1)
    //   })
    // }
  }
  FilterByDate(hosName) {
    document.getElementById(hosName).style.display = "none";
    $('#requestDate').val("");
    this.hospitalWithRequestList = [];
    this.contractRequestService.getHosForOrg(this.currentUser.organizationId).subscribe(data => {
      this.hospitalList = data,
        this.hospitalList.forEach(elem => {
          if (elem.contractRequests.length > 0) {
            this.hospitalWithRequestList.push(elem);
          }
        })
      if (this.hospitalWithRequestList.length == 0) {
        this.nullablMSG = "there is no new request.";
      }
    });
  }
  OnchangDate(id, hosName) {
    if (this.translate.currentLang == "En") {
      if ($('#' + id).val() == undefined) {
        document.getElementById(hosName).style.display = "none";
      }
      else {
        console.log("iiiiid", hosName);
        document.getElementById(hosName).style.display = "block";
        document.getElementById(hosName).style.marginTop = "-1.2rem";
        document.getElementById(hosName).style.marginLeft = "7rem";
      }
    }
    else {
      if ($('#' + id).val() == undefined) {
        document.getElementById(hosName).style.display = "none";
      }
      else {
        document.getElementById(hosName).style.display = "block";
        document.getElementById(hosName).style.marginTop = "-1.2rem";
        document.getElementById(hosName).style.marginRight = "15rem";
      }
    }

  }

  OnchangDateInOrg(id, orgName)
  {
    if (this.translate.currentLang == "En") {
      if ($('#' + id).val() == undefined) {
        document.getElementById(orgName).style.display = "none";
      }
      else {
      //  console.log("iiiiid", orgName);
        document.getElementById(orgName).style.display = "block";
        document.getElementById(orgName).style.marginTop = "-1.2rem";
        document.getElementById(orgName).style.marginLeft = "7rem";
      }
    }
    else {
      if ($('#' + id).val() == undefined) {
        document.getElementById(orgName).style.display = "none";
      }
      else {
        document.getElementById(orgName).style.display = "block";
        document.getElementById(orgName).style.marginTop = "-1.2rem";
        document.getElementById(orgName).style.marginRight = "15rem";
      }
    }
  }
  FilterByDateInOrg(orgName) {
    document.getElementById(orgName).style.display = "none";
    $('#requestDate').val("");
    // this.hospitalWithRequestList = [];
    // this.contractRequestService.getHosForOrg(this.currentUser.organizationId).subscribe(data => {
    //   this.hospitalList = data,
    //     this.hospitalList.forEach(elem => {
    //       if (elem.contractRequests.length > 0) {
    //         this.hospitalWithRequestList.push(elem);
    //       }
    //     })
    //   if (this.hospitalWithRequestList.length == 0) {
    //     this.nullablMSG = "there is no new request.";
    //   }
    // });
    this.orgRequestList=[];
    this.getRequestForUPA();
  }
  filterFromDate() {
    this.visibleFrom=false;
    this.hospitalList=[];
    this.hospitalWithRequestList=[];
    this.d.from=new Date($("#FromDate").val().toString());
    this.d.to=new Date($("#ToDate").val().toString());
     this.contractRequestService.getRequestbetweenDates(this.currentUser.organizationId,this.d).subscribe(data=>{
       console.log("daata",data),
       this.hospitalList = data,
        this.hospitalList.forEach(elem => {
          if (elem.contractRequests.length > 0) {
              this.hospitalWithRequestList.push(elem);
          }
        })
     });
  }
  filterToDate()
  {
    this.visibleTo=false;
    this.hospitalList=[];
    this.hospitalWithRequestList=[];
    this.d.from=new Date($("#FromDate").val().toString());
    this.d.to=new Date($("#ToDate").val().toString());
     this.contractRequestService.getRequestbetweenDates(this.currentUser.organizationId,this.d).subscribe(data=>{
       console.log("daata",data),
       this.hospitalList = data,
        this.hospitalList.forEach(elem => {
          if (elem.contractRequests.length > 0) {
              this.hospitalWithRequestList.push(elem);
          }
        })
     });
  }
  ClearFromDate()
  {
    this.hospitalList=[];
    this.hospitalWithRequestList=[];
    this.visibleFrom=true;
    $("#FromDate").val("");
    this.getAllRequestsForOrg();
  }
  ClearToDate()
  {
    this.hospitalList=[];
    this.hospitalWithRequestList=[];
    this.visibleTo=true;
    $("#ToDate").val("");
    this.getAllRequestsForOrg();
  }
  getRequestForUPA() {
     console.log("in geeeeeeeeet")
    this.contractRequestService.getRequestForUPA().subscribe(data => {
      this.organizationRequestList = data;
      this.organizationRequestList.forEach(elem => {
        if (elem.orgRequests.length > 0) { 
           this.orgRequestList.push(elem);
         }
         else
         {
           this.nullablMSG = "there is no new request.";
           console.log("this.nullablMSG",this.nullablMSG)
         }
       })
      if (this.organizationRequestList.length == 0) {
        this.nullablMSG = "there is no new request.";
      }
    })
  }
  nextPage() {
    this.contractRequestService.getEquipmentInContract(this.UPAEquipmentIDs).subscribe(data => {
      this.contractEquipment = data,
        this.contractObj.number = Math.floor((Math.random() * 1000) + 1),
        this.activeIndex++;
    },
      error => {
        if (this.translate.currentLang == 'En')
          this.messageService.add({ severity: 'info', detail: error.error.message });
        else
          this.messageService.add({ severity: 'info', detail: error.error.messageAr });
      })
  }
  prevPage() {
    this.activeIndex--;
  }
  CreateContract(myForrm:NgForm) {
    this.contractObj.equipmentIDs = this.UPAEquipmentIDs;
    console.log("this.contractObj",this.contractObj,this.contractObj.equipmentIDs);
    this.contractRequestService.addNewContract(this.contractObj).subscribe(data => {
      window.location.reload();
    })
    
  }
  fillDistrict(name: string) {
    this.sharedService.getDirectoryIdByname(name).subscribe(data => {
      this.sharedService.getAllHealthDistricts(data).subscribe(data => {
        this.HealthDistrictsList = data
      });
    });

  }
  fillHospital(name: string) {
    this.sharedService.getDirectoryIdByname(name).subscribe(data => {
      this.sharedService.getAllunitsByDistrictId(data).subscribe(data => {
        this.healthCareUnits = data;
      })
    })
  }
  InformHospital()
  {
    this.router.navigate(['home/Informhospital'])
  }
  // getRequest(id)
  // {
  //   this.contractRequestService.getRequest(id).subscribe(data=>{
  //     this.RequestObj=data;
  //     console.log('equips',this.RequestObj);
  //     this.RequestObj.equipmentIDs.forEach(eqId=>{
  //       this.equipmentService.getEquipmentInHospitalToEdit(eqId).subscribe(data=>{
  //         this.EquipmentListToEdit=data;
  //       });
  //     });
  //   })
  // }
  getRequestToEdit(id)
  {
    this.contractRequestService.getRequestToEdit(id).subscribe(data=>{
      this.RequestObj=data;
      this.RequestObj.hospitalId=this.currentUser.healthCareUnitId;
        this.equipmentService.getEquipmentInHospitalToEdit(this.RequestObj.equipments,this.currentUser.healthCareUnitId).subscribe(data=>{
          this.EquipmentListToEdit=data;
          console.log('eq',this.RequestObj.equipments)
        });
      if(this.RequestObj.status==1 && this.vewid==undefined)
      {
        this.router.navigate(['/home/ContractRequest/'])
      }
    })
  }
}
