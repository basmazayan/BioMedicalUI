import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/Shared/Models/Department';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DepartmentsListComponent implements OnInit {

  selectedDepartments: Department[]
  departmentDialog: boolean;
  departmentObj: Department
  submitted: boolean;
  departmentsList: Department[];


  errorMessage: string = '';
  errorDisplay: boolean = false;
  result:boolean=false;


  
  msgs: Message[] = [];
  constructor(private sharedService: SharedService, 
              private router: Router,
              private translate:TranslateService,
              private confirmationService: ConfirmationService,
              private messageservice:MessageService) { }

  ngOnInit() {
    this.getAll()
    this.departmentObj={
      id:0,
      departmentCode:'',
      departmentName:'',
      departmentNameAr:''
    }
  }
  getAll() {
    this.sharedService.getAllDepartments().subscribe(data => { this.departmentsList = data });
  }
  openNew(dept) {
    this.departmentDialog = true
    this.submitted = false;
    this.departmentObj = dept
  }
  hideDialog() {
    this.departmentDialog = false;
    this.submitted = false;
   
  }
  updateDepartment() {
    this.submitted = true;
    this.sharedService.updateDepartment(this.departmentObj.id, this.departmentObj).subscribe(data => {
      this.hideDialog()},     (error) => {
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
      });
    
  }
  deleteDepartment(deptId) {
      this.sharedService.deleteDepartment(deptId).subscribe(
        data => { this.getAll() }
      );
  }
  confirmDelete(DId) {
    if (this.translate.currentLang == 'En')
    {
    this.confirmationService.confirm({
        message: 'Do you want to delete this department ?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteDepartment(DId)
            this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        }
    });
  }
  if (this.translate.currentLang == 'Ar')
  {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من مسح هذا القسم' ,
      header: 'تأكيد المسح',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteDepartment(DId)
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
