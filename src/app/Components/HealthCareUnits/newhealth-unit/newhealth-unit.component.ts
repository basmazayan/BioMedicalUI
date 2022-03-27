import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { Organization } from 'src/app/Shared/Models/Organization';
import { SubOrganization } from 'src/app/Shared/Models/subOrganization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { SubSubOrganizationService } from 'src/app/Shared/services/sub-organization.service';

@Component({
  selector: 'app-newhealth-unit',
  templateUrl: './newhealth-unit.component.html',
  styleUrls: ['./newhealth-unit.component.css']
})
export class NewhealthUnitComponent implements OnInit {
  healthUnitDialog:boolean
  submitted:boolean
  healthUnitobj:HealthCareUnit
  healthDistricts:HealthDistrict[];
  subOrganizationList:SubOrganization[];
  healthDirectories:healthDirectory[];
  index:number=0;
  isNextvalid:boolean=false;
  isPrevvalid:boolean=true;
  errorDialog: boolean;
  error:string
  constructor(private sharedService:SharedService,
    private subOrganizationService: SubSubOrganizationService,
    private translate:TranslateService,
    private router:Router,private organizationService:OrganizationService) { }

  ngOnInit(): void {
    this.healthUnitobj={
      id:0,
      code:'',
      name:'',
      nameAr:'',
      cityId:0,
      governorateId:0,
      suborganizationId:0,
      subOrganizationName:'',
      subOrganizationNameAr:'',
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
   this.openNew()
  }
  openNew() {
    this.healthUnitDialog = true
    this.submitted = false;
   // this.sharedService.getAllHealthDistrict().subscribe(data=>{this.healthDistricts=data});
    this.sharedService.getAllHealthDirectories().subscribe(data=>{this.healthDirectories=data,console.log("Directories",this.healthDirectories)});
    this.subOrganizationService.getAllSubOrganization().subscribe(data=>{this.subOrganizationList=data,
    console.log("this.subOrganizationList",this.subOrganizationList)});
  }
  saveHealthUnit(){
    console.log("CareUnits",this.healthUnitobj);
    console.log("DirecIIID",this.healthUnitobj.governorateId);
    this.sharedService.addNewHealthCareUnit(this.healthUnitobj).subscribe(
      data=>{console.log(data),this.router.navigate(['/home/healthUnitsList'])}, error=>{
        this.errorDialog=true,
        this.error=error.error.message;
        
      });
    
  }
  hideDialog(){
    this.healthUnitDialog = false
    this.router.navigate(['/home/healthUnitsList'])
  }
  loadDistricts(DirectoryId:number)
  {
    this.sharedService.getAllHealthDistricts(DirectoryId).subscribe(data => { this.healthDistricts = data,console.log(DirectoryId) });
  }
  Next()
 {
    this.index++;
    if(this.index===1)
    {
      this.isNextvalid=true;
      this.isPrevvalid=false;
    }

   console.log("indexNext",this.index);
 }
  Previous()
  {
     this.index--;
     if(this.index===0)
     {
       this.isNextvalid=false;
       this.isPrevvalid=true;    
     }    
     console.log("indexPrev1",this.index);
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
      
    console.log("index from onchange tab",this.index);
  }
}
