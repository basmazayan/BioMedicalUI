import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Origin } from 'src/app/Shared/Models/Origin';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-origin',
  templateUrl: './new-origin.component.html',
  styleUrls: ['./new-origin.component.css']
})
export class NewOriginComponent implements OnInit {
  originDialog: boolean;
  originObj: Origin;
  submitted: boolean;
  errorDialog: boolean;
  error:string
  constructor(private sharedService: SharedService, private router: Router, private translate:TranslateService,
    private messageService:MessageService) { }

  ngOnInit() {
    this.errorDialog=false
    this.originObj = {
      id: 0,
      originCode: '',
      arabicName: '',
      englishName: ''
    }
    this.openNew()

  }

  openNew() {
    this.originDialog = true
    this.submitted = false;

  }

  hideDialog() {
    this.originDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/origins/']);
  }

  saveOrigin() {
    this.submitted = true;
    this.addOrigin();
   
  }

  addOrigin() {
    this.sharedService.addNewOrigin(this.originObj).subscribe(data => { 
       this.router.navigate(['/home/origins/'])},
       error=>{
        this.errorDialog=true;
      // this.error=error.error.message

       if (this.translate.currentLang == 'En') {
        if (error.error.status == 'code') {
          this.error = error.error.message;
        }
        if (error.error.status == 'name') {
          this.error = error.error.message;
        }

        if (error.error.status == 'nameAr') {
          this.error = error.error.message;
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
