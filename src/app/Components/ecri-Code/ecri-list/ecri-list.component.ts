import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ListEcriVM } from 'src/app/Shared/Models/ECRI';
import { EcriCode } from 'src/app/Shared/Models/ecri-code';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-ecri-list',
  templateUrl: './ecri-list.component.html',
  styleUrls: ['./ecri-list.component.scss']
})
export class ECRIListComponent implements OnInit {
  lang = localStorage.getItem('lang');
  selectedCodes: EcriCode[];
  ecriCodeDialog: boolean;
  ecriObj: EcriCode;
  submitted: boolean;
  codesList: EcriCode[];

  errorMessage: string = '';
  errorDisplay: boolean = false;
  result:boolean=false;


  constructor(
    private sharedService: SharedService,
    private router: Router,
    private translate: TranslateService,
    private messageservice:MessageService, private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.sharedService.getAllEcricodes().subscribe((data) => {
      this.codesList = data;
    });
  }
  openNew(m) {
    this.ecriCodeDialog = true;
    this.submitted = false;
    this.ecriObj = m;
  }
  hideDialog() {
    this.ecriCodeDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/ecrisList/']);
  }
  updateEcriCode() {
    this.submitted = true;
    console.log(this.ecriObj);
    this.sharedService.updateEcriCode(this.ecriObj.id, this.ecriObj).subscribe(
      (data) => {
        (data = this.ecriObj), this.hideDialog();
        this.router.navigate(['/home/ecrisList/']);
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
    );
  }
 
  deleteEcriCode(codeId) {
      this.sharedService.deleteEcriCode(codeId).subscribe((data) => {
        this.getAll();
      });
    this.router.navigate(['/home/ecrisList/']);
  }

  confirmDelete(codeId) {
  if(this.translate.currentLang == 'En')
   { 
    this.confirmationService.confirm(
      {     
       message: 'Do Want to delete this ecriCode',
       header: 'Delete Confirmation',
       icon: 'pi pi-info-circle',
       accept: () => {
        this.deleteEcriCode(codeId)
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
      message: 'هل انت متأكد من مسح هذا العنصر من القائمة الرئيسيه',
      header: 'تاكيد عملية المسح',
      icon: 'pi pi-info-circle',
      
      accept: () => {
        this.deleteEcriCode(codeId)
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
