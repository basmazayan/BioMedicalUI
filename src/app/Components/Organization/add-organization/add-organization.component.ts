import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/Shared/Models/Organization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  submitted:boolean;
  organizationDialog:boolean;
  org:Organization;
  error:string;
  errorDisplay:boolean=false;
  constructor(private router:Router,private organizationService:OrganizationService) { }

  ngOnInit(): void {
    this.org={
      id:0,
      Name:'',
      NameAr:''
    }
    this.openNew();
  }
  hideDialog() {
    this.organizationDialog = false;
    this.router.navigate(['/home/OrganizationList'])
  }
  openNew() {
    this.organizationDialog = true
    this.submitted = false;
  }
  saveOrganization()
  {
    this.addOrganization();  
  }
  addOrganization() {
    this.organizationService.addNewOrganization(this.org).subscribe(
      data => {
        this.submitted = true;
        this.router.navigate(['/home/OrganizationList/'])
         },
      error=>{
        this.errorDisplay=true;
        this.error=error.error.message;
      });
  }
}
