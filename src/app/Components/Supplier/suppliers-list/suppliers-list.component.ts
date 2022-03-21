import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SuppliersListComponent implements OnInit {
  selectedSuppliers: Supplier[]
  supplierDialog: boolean;
  supplierObj: Supplier
  submitted: boolean;
  suppliersList:Supplier[];
  msgs: Message[] = [];
  errorMessage: string = '';
  errorDisplay: boolean = false;

  constructor(private sharedService:SharedService,
              private router:Router,
              private translate:TranslateService,
              private confirmationService: ConfirmationService,
              private messageservice:MessageService) { }

  ngOnInit(){
    this.supplierObj={
      id:0,
      Code:'',
      Name:'',
      NameAr:''
    }
    this.getAll();
  }
  getAll(){
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });

  }
  openNew(s) {
    this.supplierDialog = true
    this.submitted = false;
    this.supplierObj = s
  }
  hideDialog() {
    this.supplierDialog = false;
    this.submitted = false;
    
  }
  updateSupplier() {
    this.submitted = true;
     this.sharedService.updateSupplier(this.supplierObj.id, this.supplierObj).subscribe(data => 
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
  deleteSupplier(supplierId) {
      this.sharedService.deleteSupplier(supplierId).subscribe(
        data => {  this.getAll() }
      );
  }
  confirmDelete(SId,SName) {
    if (this.translate.currentLang == 'En')
    {
    this.confirmationService.confirm({
        message: 'Do you want to delete '+ SName +' supplier ?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteSupplier(SId)
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
          this.deleteSupplier(SId)
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
