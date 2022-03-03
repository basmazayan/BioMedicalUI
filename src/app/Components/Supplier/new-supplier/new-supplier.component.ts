import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit {

  supplierObj:Supplier;
  supplierDialog:boolean;
  submitted:boolean;
  errorMessage: string = '';
  errorDisplay: boolean = false;
  constructor(private sharedService:SharedService,private router:Router ,private translate:TranslateService) { }

  ngOnInit() {
    this.supplierObj = {
      id: 0,
      supplierName: '',
     supplierNameAr: '',
      supplierCode:''

    }
    this.openNew()

  }

  openNew() {
    this.supplierDialog = true
    this.submitted = false;

  }

  hideDialog() {
    this.supplierDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/Suppliers'])
  }

  saveSupplier() {
   
    this.addSupplier();
  
  }

  addSupplier() {
    this.sharedService.addNewSupplier(this.supplierObj).subscribe(data => { 
      this.hideDialog() },
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


}
