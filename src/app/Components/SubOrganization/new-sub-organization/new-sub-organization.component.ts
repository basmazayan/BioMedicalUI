import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Organization } from 'src/app/Shared/Models/Organization';
import { SubOrganization } from 'src/app/Shared/Models/subOrganization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { SubSubOrganizationService } from 'src/app/Shared/services/sub-organization.service';

@Component({
  selector: 'app-new-sub-organization',
  templateUrl: './new-sub-organization.component.html',
  styleUrls: ['./new-sub-organization.component.css']
})
export class NewSubOrganizationComponent implements OnInit {
  subOrganizationDialog:boolean;
  subOrganization: SubOrganization;
  submitted: boolean;
  OrganizationsList: Organization[];
  error: string;
  errorDialog: boolean;
  constructor(private subSubOrganizationService:SubSubOrganizationService,
    private organizatioService:OrganizationService,
    private router:Router,
    private translate:TranslateService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.subOrganization = {
      id: 0,
      name: '',
      nameAr: '',
      organizationId:0
  }
  this.openNew()
}
openNew() {
  this.subOrganizationDialog = true
  this.submitted = false;
  this.organizatioService.getAllOrganization().subscribe(data => { this.OrganizationsList = data });

}

hideDialog() {
  this.subOrganizationDialog = false;
  this.submitted = false;
  this.router.navigate(['/home/SubOrganizationList'])
}

saveSubOrganization() {
  this.submitted = true;
  this.addSubOrganization();
 
}

addSubOrganization() {
  this.subSubOrganizationService.addNewSubOrganization(this.subOrganization).subscribe(
    data => { this.hideDialog()},error=>{
      this.errorDialog=true;
      if (this.translate.currentLang == 'En') {
             if (error.error.status == 'name') {
          this.error = error.error.message;
        }
        if (error.error.status == 'nameAr') {
          this.error = error.error.message;
        }
      }  if (this.translate.currentLang == 'Ar')  {
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

  

}