import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService,Message, MessageService } from 'primeng/api';
import { Organization } from 'src/app/Shared/Models/Organization';
import { Paging } from 'src/app/Shared/Models/Paging';
import { OrganizationService } from 'src/app/Shared/services/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
  organizationsList:Organization[];
  selectedProducts:Organization[];
  organization:Organization;
  organizationDialog: boolean;
  submitted:boolean;
  msgs: Message[] = [];
  error:string;
  errorDisplay:boolean=false;
  page: Paging;
  count: number;
  constructor(private organizationService:OrganizationService,private router:Router,
    private translate:TranslateService,private confirmationService: ConfirmationService,
    private messageservice:MessageService) { }

  ngOnInit(): void {
    this.organization={
      id:0,
      Name:'',
      NameAr:''
    }
    this.page={
      pagenumber:1,
      pagesize:10
    }
  this.organizationService.getOrganizationscount().subscribe(data=>
  {
    this.count=data
  })
    this.organizationService.getAllwithpaging(this.page).subscribe(data=>{
      this.organizationsList=data;      
    })
  //  this.getAll();
  }
  getAll()
  {
    this.organizationService.getAllOrganization().subscribe(data=>{this.organizationsList=data,console.log("orgsList",this.organizationsList)});
  }
  AddOrganization(org)
  {
    this.organizationService.addNewOrganization(org).subscribe(data=>{console.log("organizations",data)});
  }
  openNew(org) {
    this.organizationDialog = true
    this.submitted = false;    
    this.organization = org; 
   // console.log("insideOpenNew",org);
   // this.getAll();
  }
  hideDialog() {
    this.organizationDialog = false;
    this.submitted = false;
   
  }
  updateOrganization() {
   
    console.log(this.organization)
    this.organizationService.updateOrganization(this.organization.id, this.organization).subscribe(
      data => {
      this.submitted = true;
      this.organizationDialog = false;     
    },
    error=>{
      this.errorDisplay=true;
      this.error=error.error.message;
      this.getAll();
    });
  }
  deleteOrganization(orgId) {
    this.organizationService.deleteOrganization(orgId).subscribe(
      data => { console.log(data), this.getAll() }
    );
}
confirmDelete(OId) {
  if(this.translate.currentLang=='En')
  {
    this.confirmationService.confirm({
      message: 'Do you want to delete this organization ?' ,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteOrganization(OId)
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
        this.deleteOrganization(OId)
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


}
