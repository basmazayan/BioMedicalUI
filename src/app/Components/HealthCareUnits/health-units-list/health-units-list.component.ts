import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { SharedService } from 'src/app/Shared/services/shared.service';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { Organization } from 'src/app/Shared/Models/Organization';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { Paging } from 'src/app/Shared/Models/Paging';
@Component({
  selector: 'app-health-units-list',
  templateUrl: './health-units-list.component.html',
  styleUrls: ['./health-units-list.component.scss']
})
export class HealthUnitsListComponent implements OnInit {
  healthUnitobj:HealthCareUnit;
  healthUnitDialog:boolean;
  healthUnits:HealthCareUnit[];
  selectedUnits:HealthCareUnit[];
  healthDistricts:HealthDistrict[];
  HealthDistrictsList:HealthDistrict[];
  healthDirectories:healthDirectory[];
  organizationList:Organization[];
  organization:Organization;
  unitId:number;
  submitted:boolean;
  msgs: Message[] = [];
  index:number=0;
  isNextvalid:boolean=false;
  isPrevvalid:boolean=true;
  selectedLang:string;
  errorDialog: boolean;
  error:string
  count: number;
  page: Paging;
  constructor(private sharedService:SharedService,
    private translate: TranslateService,
    private router:Router,private confirmationService: ConfirmationService,
    private organizationService:OrganizationService,private messageservice:MessageService
    ) {
      // this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      // {
      //   if(event.lang == 'Ar')
      //   {
      //     this.selectedLang='Ar';
      //   } 
      //   else       
      //   {
      //     this.selectedLang='En';
      //   }
      // });
     }

  ngOnInit() {
    this.healthUnitobj={
      id:0,
      code:'',
      name:'',
      nameAr:'',
      cityId:0,
      governorateId:0,
      organizationId:0,
      organizationName:'',
      organizationNameAr:'',
      cityName:'',
      cityNameAr:'',
      governorateName:'',
      governorateNameAr:'',
      address:'',
      director:'',
      phone:'',
      mobile:'',
      email:'',
      long:0,
      lat:0
    }
    this.page={
      pagenumber:1,
      pagesize:10
    }
  //  this.getAll()
  this.sharedService.getHospitalscount().subscribe(data=>
    {
      this.count=data
      console.log("count",this.count)
    })
    this.sharedService.getAllHospitalswithpaging(this.page).subscribe(data=>{
      this.healthUnits=data;      
    })

    this.organizationService.getAllOrganization().subscribe(data=>{this.organizationList=data});
    this.sharedService.getAllHealthDistrict().subscribe(data=>{this.healthDistricts=data}); 
    this.sharedService.getAllHealthDirectories().subscribe(data=>{this.healthDirectories=data});
  }
  getAll(){
    this.sharedService.getAllunits().subscribe(data=>{this.healthUnits=data});

  }
  openNew(unit){
    this.healthUnitDialog=true;
    this.healthUnitobj=unit;
    this.submitted=false
  }
  fillDistrict(name:string) {
    this.sharedService.getDirectoryIdByname(name).subscribe(data=>{
      this.sharedService.getAllHealthDistricts(data).subscribe(data => {
        this.HealthDistrictsList = data
      });
    });
   
  }
  deleteUnit(id){
    this.sharedService.deleteHealthUnit(id).subscribe(data=>{console.log(data,"deleted"),this.getAll()})

  }
  confirmDelete(pId) {
    if(this.translate.currentLang=='En')
    {
      this.confirmationService.confirm({
        message: 'Do you want to delete this health care unit ?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteUnit(pId)
            this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
            
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        }
    });
    }
    else if(this.translate.currentLang=='Ar')
    {
      this.confirmationService.confirm({     
        message: 'هل انت متأكد من مسح هذا العنصر من القائمة',
        header: 'تاكيد عملية المسح',
        icon: 'pi pi-info-circle',
        
        accept: () => {
          this.deleteUnit(pId)
            this.messageservice.add({ severity: 'info', detail: 'تم المسح' });
    
        },
        reject: () => {
            this.messageservice.add({ severity: 'info', detail: 'رفض عمليه المسح' });
        },
        acceptLabel:"نعم",
        rejectLabel:"لا",
      });
    }
    
}

  updateUnit(){
    this.submitted=true
   // this.healthUnitDialog=false;
   this.sharedService.updateUnit(this.healthUnitobj.id,this.healthUnitobj).subscribe(data=>
    {this.healthUnitobj=data;
      this.hideDialog;
      this.healthUnitDialog=false;

  }, error=>{
    this.errorDialog=true;
    if (this.translate.currentLang == 'En') {
      if (error.error.status == 'code') {
        this.error = error.error.message;
      }
      if (error.error.status == 'name') {
        this.error = error.error.message;
      }
      if (error.error.status == 'nameAr') {
        this.error = error.error.message;
      }
    }  if (this.translate.currentLang == 'Ar')  {
      if (error.error.status == 'code') {
        this.error = error.error.messageAr;
      }
      if (error.error.status == 'name') {
        this.error = error.error.messageAr;
      }
      if (error.error.status == 'nameAr') {
        this.error = error.error.messageAr;
      }
    }
    return false;

  });
  

  }
  hideDialog() {
    this.healthUnitDialog = false;
    this.submitted = false;
   
  }
  loadDistricts(DirectoryId:number)
  {
    this.sharedService.getAllHealthDistricts(DirectoryId).subscribe(data => { this.healthDistricts = data,console.log(DirectoryId) });
  }
  onOrgChange(OrgId)
  {
    this.organizationService.getOrganization(OrgId).subscribe(data=>{this.organization=data});
  }
  Next()
  {
     this.index++;
     if(this.index===1)
     {
       this.isNextvalid=true;
       this.isPrevvalid=false;
     }
   // console.log("indexNext",this.index);
  }
   Previous()
   {
      this.index--;
      if(this.index===0)
      {
        this.isNextvalid=false;
        this.isPrevvalid=true;    
      }    
   //   console.log("indexPrev1",this.index);
   }
   handleChange(e) {
     this.index = e.index;
     if(this.index===1)
     {
       this.isNextvalid=true;
       this.isPrevvalid=false;
     }
     else if(this.index===0)
     {
       this.isNextvalid=false;
       this.isPrevvalid=true;
     }
       
//     console.log("index from onchange tab",this.index);
   }

   clicktbl(event)
   {
      this.page.pagenumber=event.page+1;
      this.page.pagesize=event.rows;
     this.sharedService.getAllHospitalswithpaging(this.page).subscribe(data=>{
       this.healthUnits=data;
     })
   }
}
