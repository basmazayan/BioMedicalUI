import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-new-sub-category',
  templateUrl: './new-sub-category.component.html',
  styleUrls: ['./new-sub-category.component.css']
})
export class NewSubCategoryComponent implements OnInit {
  subCategoryDialog:boolean;
  subCategory: SubCategory;
  submitted: boolean;
  categoriesList: Category[];
  error:string;
  errorDisplay:boolean=false;
  constructor(private sharedService:SharedService,private router:Router,
              private translate:TranslateService,
              private messageService:MessageService) { }

  ngOnInit(){
    this.subCategory = {
      id: 0,
      name: '',
      nameAr: '',
      categoryId:0,
      code:''
  }

  this.openNew()
  
}

openNew() {
  this.subCategoryDialog = true
  this.submitted = false;
  this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });

}

hideDialog() {
  this.subCategoryDialog = false;
  this.submitted = false;
  this.router.navigate(['/home/equipmentSubCategories'])
}

saveSubCatgory() {
  this.submitted = true;
  this.addSubCategory();
 
}

addSubCategory() {
  if(this.subCategory.categoryId ==0)
  {
    this.errorDisplay = true;
    if (this.translate.currentLang == 'En') {
  
    this.error ="Please select category";
    }
    if (this.translate.currentLang == 'Ar') {
      this.error ="من فضلك اختر فئة";
      }
      return false;
  }
  else{
  this.sharedService.addNewSubCategory(this.subCategory).subscribe(
    data => {
      this.router.navigate(['/home/equipmentSubCategories/']);
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

  


}
