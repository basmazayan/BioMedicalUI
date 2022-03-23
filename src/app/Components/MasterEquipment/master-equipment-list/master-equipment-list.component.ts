import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { Category } from 'src/app/Shared/Models/Category';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Origin } from 'src/app/Shared/Models/Origin';
import { MasterEquipmentAttachments } from 'src/app/Shared/Models/MasterEquipmentAttachments';
import { style } from '@angular/animations';
import { Paging } from 'src/app/Shared/Models/Paging';

@Component({
  selector: 'app-master-equipment-list',
  templateUrl: './master-equipment-list.component.html',
  styleUrls: ['./master-equipment-list.component.scss']
})
export class MasterEquipmentListComponent implements OnInit {
  MasterEquipments: MasterEquipment[];
  masterEquipmentObj: MasterEquipment;
  msterEquipmentDialog: boolean;
  submitted: boolean;
  msgs: Message[] = [];
  categoriesList: Category[];
  subCategoriesList: SubCategory[];
  index: number = 0;
  isNextvalid: boolean = false;
  isPrevvalid: boolean = true;
  priorityList: Priority[];
  manufacturerList: Manufacturer[];
  originsList: Origin[]

  errorMessage: string = "";
  errorDisplay: boolean = false;
  Attachs: MasterEquipmentAttachments[];
  isvisible: boolean = false;
  isbtnvisible: boolean = false;
  EquipAttachs: MasterEquipmentAttachments[];
  IDs: number[] = [];
  masterAttachDel: MasterEquipmentAttachments[];
  msgappear:boolean=false;
  page:Paging;
  event:any;
  count:number;
  // manufacturerList: Manufacturer[];





  constructor(private masterEquipmentService: MasterequipmentService,
    private translate: TranslateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private messageservice:MessageService) { }

  ngOnInit(): void {
    this.page={
      pagenumber:1,
      pagesize:10
    }
  this.masterEquipmentService.getcount().subscribe(data=>
    {
      this.count=data
    })
    this.masterEquipmentService.getAllwithpaging(this.page).subscribe(data=>{
      this.MasterEquipments=data;      
    })
  }
  getAll() {
    this.masterEquipmentService.getAll().subscribe(data => { this.MasterEquipments = data});
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
  }
  hideDialog() {
    this.msterEquipmentDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/MasterEquipmentList/'])
  }
  openNew(m) {
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });
    this.getAttachs(m.id);
    this.msterEquipmentDialog = true
    this.submitted = false;
    this.masterEquipmentObj = m
  }
  openEmptyDialog() {
    this.msterEquipmentDialog = true
    this.submitted = false;
  }
  updateMasterEquipment() {
    this.submitted = true;
    this.msterEquipmentDialog = true;

    if (this.masterEquipmentObj.categoryId == 0) {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please select category";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "اختر التصنيف";
      }
      return false;
    }


    if (this.masterEquipmentObj.brandId == 0) {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please select brand";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "اختر ماركة";
      }
      return false;
    }


    if (this.masterEquipmentObj.originId == 0) {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please select origin";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "اختر بلد المنشأ";
      }
      return false;
    }

    if (this.masterEquipmentObj.priorityId == 0) {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please select priority";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "اختر المستوى";
      }
      return false;
    }

    if (this.masterEquipmentObj.nameAr == "") {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please enter arabic name";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "ادخل الاسم باالعربي";
      }
      return false;
    }


    if (this.masterEquipmentObj.name == "") {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please enter name";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "ادخل اسم الجهاز";
      }
      return false;
    }

    if (this.masterEquipmentObj.masterCode == "") {
      this.errorDisplay = true;
      if (this.translate.currentLang == 'En') {

        this.errorMessage = "Please enter code";
      }
      if (this.translate.currentLang == 'Ar') {
        this.errorMessage = "ادخل اسم الكود";
      }
      return false;
    }
    else {
      this.masterEquipmentService.getAllAttachWithNoMasterEquipment().subscribe(data => {
        this.EquipAttachs = data;
        this.EquipAttachs.forEach(element => {
          this.IDs.push(element.id);
        });
        this.masterEquipmentObj.AttachmentIDs = this.IDs;
        this.masterEquipmentService.update(this.masterEquipmentObj.id, this.masterEquipmentObj).subscribe(
          data => {
            data = data
            this.hideDialog()
          }
          , error => {
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
            } if (this.translate.currentLang == 'Ar') {
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
      });

    }

  }
  deleteMsterEquipment(mEquipmentId) {
    this.masterEquipmentService.getAllAttachForEquipment(mEquipmentId).subscribe(data => {
      this.masterAttachDel = data,
        this.masterAttachDel.forEach(element => {
        this.RemoveAttach(element.id);
      });
    });

    this.masterEquipmentService.Delete(mEquipmentId).subscribe(
      data => { this.getAll() }
    );
  }

  confirmDelete(MEId, MEName) {
    if(this.translate.currentLang == 'En')
   { 
    this.confirmationService.confirm(
      {     
       message: 'Do you want to delete ' + MEName + 'from master equipments',
       header: 'Delete Confirmation',
       icon: 'pi pi-info-circle',
       accept: () => {
         this.deleteMsterEquipment(MEId)
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
     this.confirmationService.confirm({     
      message: 'هل انت متأكد من مسح' + MEName + 'من القائمه الرئيسيه',
      header: 'تاكيد عملية المسح',
      icon: 'pi pi-info-circle',
      
      accept: () => {
        this.deleteMsterEquipment(MEId)
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
  getAttachs(equipId) {
    this.masterEquipmentService.getAllAttachForEquipment(equipId).subscribe(data => {
      this.Attachs = data,
        this.Attachs.forEach(el => {
        });
    })
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
  RemoveAttach(id: number) {
    this.masterEquipmentService.DeleteAttachment(id).subscribe(data => { });
    this.isvisible = true;
    this.isbtnvisible = true;
  }
  clicktbl(event)
  {
     this.page.pagenumber=event.page+1;
     this.page.pagesize=event.rows;
    this.masterEquipmentService.getAllwithpaging(this.page).subscribe(data=>{
      this.MasterEquipments=data;
    })
  }
}
