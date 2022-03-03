import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Contract } from 'src/app/Shared/Models/Contract';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { User } from 'src/app/Shared/Models/User';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-inform-hospital',
  templateUrl: './inform-hospital.component.html',
  styleUrls: ['./inform-hospital.component.css']
})
export class InformHospitalComponent implements OnInit {

  constructor(private contractRequestService: ContractService, private datePipe: DatePipe,
    private userService: UserService,public translate: TranslateService,private router:Router,
    private messageService: MessageService,) 
  { this.currentUser = this.userService.currentUserValue;}
  contract: Contract;
  EquipmentInEachContract: Equipment[];
  currentUser: User;
  contractList: Contract[];
  ngOnInit(): void {
    this.contractRequestService.getAllContracts().subscribe(data => {
      this.contractList = data;
      console.log("this.contractList", this.contractList)
    })
  }
  onSelectContract() {
    // this.EquipmentInEachContract=[];
    var cId = Number($("#contractId").val());
    this.contractRequestService.getOneContract(cId).subscribe(data => {
      this.contract = data,
      $("#supplier").val(this.contract.supplierName);
      $("#startDate").val(this.datePipe.transform(this.contract.startDate, 'yyyy-MM-dd'));
      $("#endDate").val(this.datePipe.transform(this.contract.endDate, 'yyyy-MM-dd'));
      $("#subject").val(this.contract.subject);
      this.contractRequestService.EquipmentInContract(this.contract.id).subscribe(eq => {
        this.EquipmentInEachContract=eq
        
      });
    })
  }
  backToRequest()
  {
    this.router.navigate(['home/ContractRequest'])
  }
  InformHospital(){
    this.contractRequestService.InformHospital(this.contract.id).subscribe(data=>{console.log(data)
      if (this.translate.currentLang == 'En') {
        this.messageService.add({ severity: 'info', detail: 'hospital will be notified with email' });
        
      }
      else {
        this.messageService.add({ severity: 'info', detail: 'سوف يتم اخطار المستشفي بالايميل' });
      
      }});
  }
}
