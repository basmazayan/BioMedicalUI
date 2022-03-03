import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/Shared/Models/Status';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
@Component({
  selector: 'app-statuses-list',
  templateUrl: './statuses-list.component.html',
  styleUrls: ['./statuses-list.component.scss']
})
export class StatusesListComponent implements OnInit {

  selectedStatuses: Status[]
  statusDialog: boolean;
  equipmentStatusObj: Status
  submitted: boolean;
  msgs: Message[] = [];
  statusesList: Status[];
  errorMessage: string = '';
  errorDisplay: boolean = false;


  
  constructor(private sharedService: SharedService,
              private router: Router,
              private translate:TranslateService,
              private confirmationService: ConfirmationService,
              private messageservice:MessageService) { }

  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.sharedService.getAllstatuses().subscribe(data => { this.statusesList = data });

  }
  openNew(S) {
    this.statusDialog = true
    this.submitted = false;
    this.equipmentStatusObj = S
  }
  hideDialog() {
    this.statusDialog = false;
    this.submitted = false;

  }
  updateStatus() {
    this.submitted = true;
    this.sharedService.updateStatus(this.equipmentStatusObj.id, this.equipmentStatusObj).subscribe(data =>
       {
         this.hideDialog();
         this.router.navigate(['/home/Statuses/']);
        },
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
      }
      )
  }
  deleteStatus(modeId) {
      this.sharedService.deleteStatus(modeId).subscribe(
        data => {  this.getAll() }
      );
  }
  confirmDelete(SId) {
    if (this.translate.currentLang == 'En')
    {
    this.confirmationService.confirm({
        message: 'Do you want to delete this status ?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteStatus(SId)
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
      message: 'هل أنت متأكد من مسح الحالة؟' ,
      header: 'تأكيد المسح',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteStatus(SId)
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