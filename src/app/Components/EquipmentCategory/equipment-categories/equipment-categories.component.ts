import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';

import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';

import { ConfirmationService, Message, MessageService } from 'primeng/api';
//import {Message} from 'primeng/api';
//import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-equipment-categories',
  templateUrl: './equipment-categories.component.html',
  styleUrls: ['./equipment-categories.component.scss'],
  providers: [ConfirmationService]
})
export class EquipmentCategoriesComponent implements OnInit {
  selectedCategories: Category[]
  categoryDialog: boolean;
  category: Category
  submitted: boolean;
  CategoriesList: Category[];
  healthCareUnitsList: HealthCareUnit[]
  msgs: Message[] = [];
  errorDialog: boolean= false;
  error:string;
  constructor(private sharedService: SharedService,
    private router: Router,
    private translate: TranslateService,
    private confirmationService: ConfirmationService,
    private messageservice:MessageService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.sharedService.getAllCategories().subscribe(data => { this.CategoriesList = data });
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data, console.log("hc",data) })


  }
  openNew(category) {
//this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data, console.log("hc",data) })

    this.categoryDialog = true
    this.submitted = false;
    this.category = category
    console.log(category)
  }
  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/equipmentCategories/'])
  }
  updateCategory() {
    this.submitted = true;
    console.log(this.category)
    this.sharedService.updateCategory(this.category.id, this.category).subscribe(data => {
      this.hideDialog()
    },error=>{
      this.errorDialog=true;
      if (this.translate.currentLang == 'En') {
        if (error.error.status == 'code') {
          this.error = error.error.message;
        }
        if (error.error.status == 'name') {
          this.error = error.error.message;
        }
        if (error.error.status == 'nameAr') {
          this.error= error.error.message;
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
    //  return false;
      //this.getAll()
    })

  }
  deleteCategory(deptId) {

    console.log("Categories");
    this.sharedService.deleteCategory(deptId).subscribe(
      data => {  this.getAll() }
    );

  }
  confirmDelete(deptId, catName) {
    console.log("from delete")
    if(this.translate.currentLang == 'En')
    {
    console.log("from iiiif")
    this.confirmationService.confirm(
      {     
       message: 'Do you want to delete ' + catName + 'from master equipments',
       header: 'Delete Confirmation',
       icon: 'pi pi-info-circle',
       accept: () => {
        this.deleteCategory(deptId)
         this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
       },
       reject: () => {
         this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
       },
       acceptLabel:"yes",
       rejectLabel:"No"
     });
  }
  else if(this.translate.currentLang == 'Ar')
  { 
    console.log("this.translate.currentLang",this.translate.currentLang)

    this.confirmationService.confirm({     
     message: 'هل انت متأكد من مسح' + catName + 'من القائمه ',
     header: 'تاكيد عملية المسح',
     icon: 'pi pi-info-circle',
     
     accept: () => {
      this.deleteCategory(deptId)
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
