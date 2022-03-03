import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Status } from 'src/app/Shared/Models/Status';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-status',
  templateUrl: './new-status.component.html',
  styleUrls: ['./new-status.component.css']
})
export class NewStatusComponent implements OnInit {

  equipmentStatusObj: Status;
  submitted: boolean;
  statusDialog: boolean;
  errorMessage: string = '';
  errorDisplay: boolean = false;


  constructor(private sharedService: SharedService, private router: Router ,private translate:TranslateService) { }

  ngOnInit() {
    this.equipmentStatusObj = {
      id: 0,
      status: '',
      statusAr: '',
      selected: false,
      code:''
    }
    this.openNew()

  }

  openNew() {
    this.statusDialog = true
    this.submitted = false;

  }

  hideDialog() {
    this.statusDialog = false;
    this.submitted = false;
      this.router.navigate(['/home/Statuses/'])
  }

  saveStatus() {
    this.submitted = true;
    this.addStatus();
  
  }

  addStatus() {   
    this.sharedService.addNewStatus(this.equipmentStatusObj).subscribe(data => {
      this.hideDialog()
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
       });
  }

}
