import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Origin } from 'src/app/Shared/Models/Origin';
import { SharedService } from 'src/app/Shared/services/shared.service';
import {ConfirmationService,Message, MessageService} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-origins-list',
  templateUrl: './origins-list.component.html',
  styleUrls: ['./origins-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OriginsListComponent implements OnInit {
  originsList: Origin[];
  selectedOrigins: Origin[]
  originDialog: boolean;
  origin: Origin;
  submitted: boolean;
  msgs: Message[] = [];
  errorDialog: boolean;
  error:string
  companyProduct: any[];
  constructor(private sharedService: SharedService, private router: Router,
    private confirmationService: ConfirmationService, private translate:TranslateService,
    private messageservice:MessageService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });

  }
  openNew(o) {
    this.originDialog = true
    this.submitted = false;
    this.origin = o
  }
  hideDialog() {
    this.originDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/origins/']);
  }
 
  updateOrigin() {
    this.submitted = true;
    this.sharedService.updateOrigin(this.origin.id,this.origin).subscribe(data => {
      this.hideDialog()}
      ,error=>{
        this.errorDialog=true,
        this.error=error.error.message,this.getAll()
      })
    
  }
  deleteOrigin(originId) {
  //  var result = confirm("Want to delete this origin" + "?");
  //  if (result) {
      this.sharedService.deleteOrigin(originId).subscribe(
        data => {  this.getAll()}
      );
   // }
    //this.router.navigate(['/home/origins/'])
  }
  confirmDelete(originId) {
if(this.translate.currentLang == 'En')
 {
    this.confirmationService.confirm({
        message: 'Do you want to delete this origin?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteOrigin(originId)
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
      this.deleteOrigin(originId)
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
