import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/Shared/Models/Category';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  categories: Category[];
  selectedCategories: Category[];
  categoryDialog: boolean;
  category: Category;
  submitted: boolean;
  healthCareUnitsList:HealthCareUnit[]
  error:string
  errorDialog:boolean
  constructor(private sharedService:SharedService,private router:Router ,
     private translate: TranslateService ,
     private messageService: MessageService) { }
  

  ngOnInit() {
    this.sharedService.getAllunits().subscribe(data=>{this.healthCareUnitsList=data})
    this.category = {
      id: 0,
      name: '',
      nameAr: '',
      code: '',
      description: '',
      descriptionAr: ''
      //healthCareUnitId:0
  }

  this.openNew()
  
}

openNew() {
  this.categoryDialog = true
  this.submitted = false;
}

hideDialog() {
  this.categoryDialog = false;
  this.submitted = false;
  this.router.navigate(['/home/equipmentCategories']) 
}

saveEquepmentCat() {
  this.submitted = true;
  this.addCategory();
}

addCategory() {
  console.log("Add")
  this.sharedService.addNewCategory(this.category).subscribe(data => { console.log(data), 
    this.router.navigate(['/home/equipmentCategories']) },
    error=>{
      console.log("error",error)
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
      return false;
      
    });
}

  

}
