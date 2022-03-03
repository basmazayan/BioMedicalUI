import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { Router } from '@angular/router';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import { Category } from 'src/app/Shared/Models/Category';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Origin } from 'src/app/Shared/Models/Origin';
import { MasterEquipmentAttachments } from 'src/app/Shared/Models/MasterEquipmentAttachments';
@Component({
  selector: 'app-new-master-equipment',
  templateUrl: './new-master-equipment.component.html',
  styleUrls: ['./new-master-equipment.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class NewMasterEquipmentComponent implements OnInit {
  equipmentDialog: boolean;
  submitted: boolean;
  masterEquipmentObj: MasterEquipment;
  categoriesList: Category[];
  subCategoriesList: SubCategory[];
  index: number = 0;
  isNextvalid: boolean = false;
  isPrevvalid: boolean = true;
  priorityList:Priority[];
  manufacturerList:Manufacturer[];
  originsList:Origin[]
  errorMessage: string="";
  errorDisplay:boolean= false;
  EquipAttachs:MasterEquipmentAttachments[];
  IDs:number[]=[];


  constructor(private router: Router, private masterEquipmentService: MasterequipmentService,
    private sharedService: SharedService,
    private translate: TranslateService
  ) { }




  ngOnInit() {
    this.masterEquipmentObj = {
      id: 0,
      name: '',
      nameAr: '',
      masterCode: '',
      equipmentCategoryId: 0,
      equipmentDescriptionAr: '',
      equipmentSubCategoryId: 0,
      expectedLifeTime: 0,
      manufacturerId: 0,
      manufacturerName:'',
      manufacturerNameAr:'',
      modelNumber: '',
      originId: 0,
      originCode:'',
      priorityId: 0,
      upaCode: '',
      versionNumber: '',
      AttachmentIDs:[]
    }
    this.openNew();
  }
  openNew() {
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });

    this.equipmentDialog = true
    this.submitted = false;
  }
  hideDialog() {
    this.equipmentDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/MasterEquipmentList/']);
  }
  saveEquipment() {
    this.submitted = true;
    this.addEquipment();
    
  }
  addEquipment() {

//console.log("this.masterEquipmentObj",this.masterEquipmentObj);


    if(this.masterEquipmentObj.manufacturerId == 0)
    {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
    
      this.errorMessage ="Please select brand";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="اختر ماركة";
        }
        return false;
    }

    
    if(this.masterEquipmentObj.equipmentCategoryId == 0)
    {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
    
      this.errorMessage ="Please select category";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="اختر التصنيف";
        }
        return false;
    }


    if(this.masterEquipmentObj.originId == 0)
    {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
    
      this.errorMessage ="Please select origin";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="اختر بلد المنشأ";
        }
        return false;
    }

    if(this.masterEquipmentObj.priorityId == 0)
    {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
    
      this.errorMessage ="Please select priority";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="اختر المستوى";
        }
      return false;
    }

 if(this.masterEquipmentObj.nameAr == "")
    {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
    
      this.errorMessage ="Please enter arabic name";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="ادخل اسم الجهاز";
        }
        return false;
    }

    if(this.masterEquipmentObj.name == "")
    {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
    
      this.errorMessage ="Please enter name";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="ادخل اسم الجهاز";
        }
        return false;
    }

    if(this.masterEquipmentObj.masterCode == "")
    { this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
     
      this.errorMessage ="Please enter code";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage ="ادخل اسم الكود";
        }
        return false;
    }
    else{
    this.masterEquipmentService.getAllAttachWithNoMasterEquipment().subscribe(data=>{
      this.EquipAttachs=data;
      this.EquipAttachs.forEach(element=>{
        this.IDs.push(element.id);
      });
      this.masterEquipmentObj.AttachmentIDs=this.IDs;
      console.log("this.equipmentObj.AttachmentIDs",this.masterEquipmentObj.AttachmentIDs);
      this.masterEquipmentService.addNewEquipments(this.masterEquipmentObj).subscribe(data => { this.hideDialog() });
    //  console.log("IDDDDs",this.EquipAttachs);
    // });
    },
    error => {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {
        if (error.error.status == 'code') {
          this.errorMessage = error.error.message;
        }
        if (error.error.status == 'name') {
          this.errorMessage = error.error.message;
        }
      }  if (this.translate.currentLang == 'Ar')  {
        if (error.error.status == 'code') {
          this.errorMessage = error.error.messageAr;
        }
        if (error.error.status == 'name') {
          this.errorMessage = error.error.messageAr;
        }
      }
      return false;
    }) ;
  }
  }
  handleChange(e) {
    this.index = e.index;
    if (this.index === 2) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
    else if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }
  }
  Next() {
    this.index++;
    if (this.index === 2) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
  }
  Previous() {
    this.index--;
    if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }
  }
  fillSubCategory(id: number) {
    this.sharedService.getAllSubCategories(id).subscribe(data => { this.subCategoriesList = data; });
  }
}
