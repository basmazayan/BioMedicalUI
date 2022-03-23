import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { EcriCode } from 'src/app/Shared/Models/ecri-code';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-ecri',
  templateUrl: './ecri.component.html',
  styleUrls: ['./ecri.component.css']
})
export class ECRIComponent implements OnInit {

  ecriCodeDialog: boolean;
  ecriObj: EcriCode;
  submitted:boolean;
  errorMessage: string="";
  errorDisplay:boolean= false;
  constructor(private sharedService:SharedService,private router:Router,private messageService:MessageService, private translate:TranslateService) { }

  ngOnInit() {
    this.ecriObj = {
      id: 0,
      code: '',
      name:'',
      nameAr:''
    
    }
    this.openNew()
  }

  openNew() {
    this.ecriCodeDialog = true
    this.submitted = false;
  }

  hideDialog() {
    this.ecriCodeDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/ecrisList/'])
  }

  saveCode() {
    this.submitted = true;
    this.addEcri();
   
  }

  addEcri() {
        
    if(this.ecriObj.name == "")
    {
     this.errorDisplay = true;
     if (this.translate.currentLang == 'En') {
   
     this.errorMessage ="Please enter name";
     }
     if (this.translate.currentLang == 'Ar') {
       this.errorMessage ="ادخل الاسم";
       }
       return false;
    }

else{
    this.sharedService.addEcriCode(this.ecriObj).subscribe(data => { 

      this.router.navigate(['/home/ecrisList/'])
      this.ecriCodeDialog = false;
      this.submitted = false;
      this.messageService.add({severity:'sucess', summary: 'Sticky', detail: 'Data saved Successfully', sticky: true});
    
    } ,


    error => {
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
    }) ;

  }
}

}

