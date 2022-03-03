import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {
  selectedSubCategories: SubCategory[]
  subCategoryDialog: boolean;
  subCategory: SubCategory
  submitted: boolean;
  subCategoriesList: SubCategory[];
  categoriesList: Category[];
  msgs: Message[] = [];
  error:string;
  errorDisplay;boolean=false;
  constructor(private sharedService: SharedService, private router: Router,
    private translate:TranslateService,private confirmationService: ConfirmationService,
    private messageservice:MessageService) { }
  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.sharedService.getSubCategories().subscribe(data => { this.subCategoriesList = data });

  }
  openNew(subCat) {
    this.subCategoryDialog = true
    this.submitted = false;
    this.subCategory = subCat
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });
  }
  hideDialog() {
    this.subCategoryDialog = false;
    this.submitted = false;
   
  }
  updatesubCategory() {
    this.submitted = true;
    this.sharedService.updateSubCategory(this.subCategory.id, this.subCategory).subscribe(
      data => {
        this.submitted = true,
        this.subCategoryDialog=false;
        this.router.navigate(['/home/equipmentSubCategories/'])
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
      })

      this.getAll();
  }
  deleteSubCategory(subCat) {
      this.sharedService.deleteSubCategory(subCat).subscribe(
        data => { this.getAll() }
      );
  }
  confirmDelete(subId,subName) {
    if(this.translate.currentLang == 'En')
    {
      this.confirmationService.confirm({
        message: 'Do you want to delete this ' + subName + 'from subCategory?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteSubCategory(subId)
            this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
          
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        }
    });
  }
  else if(this.translate.currentLang == 'Ar')
  {
    this.confirmationService.confirm({     
      message: 'هل انت متأكد من مسح' + subName + 'من القائمه الرئيسيه',
      header: 'تاكيد عملية المسح',
      icon: 'pi pi-info-circle',
      
      accept: () => {
        this.deleteSubCategory(subId)
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
