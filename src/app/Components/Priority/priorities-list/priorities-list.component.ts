import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Priority } from 'src/app/Shared/Models/Priority';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService,Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-priorities-list',
  templateUrl: './priorities-list.component.html',
  styleUrls: ['./priorities-list.component.scss']
})
export class PrioritiesListComponent implements OnInit {
  selectedPriorities: Priority[]
  priorityDialog: boolean;
  priorityObj: Priority
  submitted: boolean;
  prioritiesList: Priority[];
  msgs: Message[] = [];
  errorMessage: string = '';
  errorDisplay: boolean = false;
  result:boolean=false;


  constructor(private sharedService: SharedService, 
              private router: Router,
              private translate:TranslateService,
              private confirmationService: ConfirmationService,
              private messageservice:MessageService) { }

  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.sharedService.getAllpriorities().subscribe(data => { this.prioritiesList = data });

  }
  openNew(p) {
    this.priorityDialog = true
    this.submitted = false;
    this.priorityObj = p;
    }
  hideDialog() {
    this.priorityDialog = false;
    this.submitted = false;
    
  }
  updatePriority() {
    this.submitted = true;
    
    this.sharedService.updatePriority(this.priorityObj.id, this.priorityObj).subscribe(data => 
      {this.hideDialog()},
      (error) => {
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
  deletePriority(priorityId) {
      this.sharedService.deletePriority(priorityId).subscribe(
        data => {  this.getAll() }
      );
  }
  confirmDelete(pId) {
    if (this.translate.currentLang == 'En')
    {
    this.confirmationService.confirm({
        message: 'Do you want to delete this level of priority ?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deletePriority(pId)
            this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
           
        },
        reject: () => {
         this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
        }
    });
  }
  if (this.translate.currentLang == 'Ar')
  {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف هذا العنصر' ,
      header: 'تأكيد المسح',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deletePriority(pId)
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
