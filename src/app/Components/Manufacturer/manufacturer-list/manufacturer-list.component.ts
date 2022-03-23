import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ManufacturerListComponent implements OnInit {

  manufacturersList: Manufacturer[];
  selectedmanufacturers: Manufacturer[]
  manufacturerDialog: boolean;
  manufacturer: Manufacturer;
  submitted: boolean;
  msgs: Message[] = [];
  error:string;
  errorDisplay:boolean=false;
  constructor(private sharedService: SharedService, 
              private router: Router,
              private translate:TranslateService,
              private confirmationService: ConfirmationService,
              private messageservice:MessageService) { }

  ngOnInit() {
    this.manufacturer={
      id:0,
      name:'',
      nameAr:'',
      code:''
    }
    this.getAll();
  }
  getAll() {
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturersList = data });
  }
  openNew(m) {
    this.manufacturerDialog = true
    this.submitted = false;
    this.manufacturer = m
  }
  hideDialog() {
    this.manufacturerDialog = false;
    this.submitted = false;

  }
  saveManufacturer()
  {
    
  }
  updateManfacturer() {
    
    this.sharedService.updateManufacturer(this.manufacturer.id, this.manufacturer).subscribe(
      data => {
        this.submitted = true;
        this.manufacturerDialog=false;
        data=this.manufacturer
      
      },
      error=>{
        this.errorDisplay=true;
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
  deleteManfacturer(manfacturerId) {
      this.sharedService.deleteManufacturer(manfacturerId).subscribe(
        data => {this.getAll() }
      );
  }
confirmDelete(MId,MName) {
if(this.translate.currentLang == 'En')
 {
    this.confirmationService.confirm({
        message: 'Do you want to delete this ' +MName+ ' manufacturer?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteManfacturer(MId)
            this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
           
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        }
    });
  }
  if(this.translate.currentLang == 'Ar')
  {
    this.confirmationService.confirm({     
      message: 'هل انت متأكد من مسح' + MName + 'من القائمه الرئيسيه',
      header: 'تاكيد عملية المسح',
      icon: 'pi pi-info-circle',
      
      accept: () => {
        this.deleteManfacturer(MId)
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
