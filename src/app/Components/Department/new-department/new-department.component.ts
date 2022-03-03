import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'jquery';
import { Department } from 'src/app/Shared/Models/Department';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {

  departmentObj:Department;
  departmentDialog:boolean;
  submitted:boolean;

  errorDisplay:boolean=false;
  errorMessage:string="";

  constructor(private sharedService:SharedService,private router:Router, private translate:TranslateService) { }

  ngOnInit() {
    this.departmentObj = {
      id: 0,
      departmentName: '',

      departmentNameAr: '',

      departmentCode:''

    }
    this.openNew()

  }

  openNew() {
    this.departmentDialog = true
    this.submitted = false;

  }

  hideDialog() {
    this.departmentDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/Departments/'])
  }

  saveDepartment() {
    this.submitted = true;
    this.addDepartment();
   
  }

  addDepartment() 
  {
   
    this.sharedService.addNewDepartment(this.departmentObj).subscribe(data => 
      { 
        this.router.navigate(['/home/Departments/']) 
      }, 
      
      error => {
        this.errorDisplay = true;
        if (this.translate.currentLang == 'En') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.message;
          }
        }  if (this.translate.currentLang == 'Ar')  {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.messageAr;
          }
        }
        return false;
      }
      
      );
  }


}
