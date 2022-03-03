import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ContractRequestVM } from 'src/app/Shared/Models/ContractRequest';
import { Paging } from 'src/app/Shared/Models/Paging';
import { RequestStatus } from 'src/app/Shared/Models/RequestStatus';
import { User } from 'src/app/Shared/Models/User';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  page: Paging;
  currentUser: User;
  requestsInHospital:ContractRequestVM[];
  requestStatus:RequestStatus;
  count: number;
  numberOfEquipment: number;
  msgs: Message[] = [];
  constructor(private _contractRequestService:ContractService,private userService: UserService,
    public translate: TranslateService,private confirmationService: ConfirmationService,
    private messageservice: MessageService) 
  {this.currentUser = this.userService.currentUserValue; }

  ngOnInit(): void {
    this.requestStatus={
      Status:'',
      StatusAr:'',
      id:0
    }
    this.page={
      pagenumber:1,
      pagesize:10
    }
    this._contractRequestService.getcount().subscribe(data=>
    {
        this.count=data
    })
    this.getAllHospitalRequests();
  }
getAllHospitalRequests()
{
  this._contractRequestService.getRequestInHospitals(this.page,this.currentUser.healthCareUnitId).subscribe(data=>{
    this.requestsInHospital=data;
    console.log('reqss',this.requestsInHospital);
  })
}
sendToOrg(id)
{
  this._contractRequestService.updateStatus(id).subscribe(data=>{
    window.location.reload();
  });
}
delete(id)
{
  this._contractRequestService.delete(id).subscribe(data=>{
    this.getAllHospitalRequests();
  });
}
confirmDelete(eqId) {
  if (this.translate.currentLang == 'En') {

    this.confirmationService.confirm({
      message: 'Are you sure',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(eqId)
        this.messageservice.add({ severity: 'info', detail: 'Record deleted' });

      },
      reject: () => {
        this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
      },
      acceptLabel: "yes",
      rejectLabel: "No"
    });
  }
  else if (this.translate.currentLang == 'Ar') {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد',
      header: 'تاكيد عملية المسح',
      icon: 'pi pi-info-circle',

      accept: () => {
        this.delete(eqId)
        this.msgs = [{ severity: 'info', detail: 'تم المسح' }]


      },
      reject: () => {
        this.msgs = [{ severity: 'info', detail: 'رفض عمليه المسح' }];
      },
      acceptLabel: "نعم",
      rejectLabel: "لا",
    });
  }
}

}
