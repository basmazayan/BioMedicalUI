import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Priority } from 'src/app/Shared/Models/Priority';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-new-priority',
  templateUrl: './new-priority.component.html',
  styleUrls: ['./new-priority.component.css']
})
export class NewPriorityComponent implements OnInit {
  priorityObj: Priority;
  submitted: boolean;
  priorityDialog: boolean;

  errorMessage: string = '';
  errorDisplay: boolean = false;


  constructor(private sharedService: SharedService, private router: Router,
              private translate:TranslateService) { }

  ngOnInit() {
    this.priorityObj = {
      id: 0,
      level: '',
      description: '',
      levelAr: '',
      descriptionAr: '',
      code:''


    }
    this.openNew()

  }

  openNew() {
    this.priorityDialog = true
    this.submitted = false;

  }

  hideDialog() {
    this.priorityDialog = false;
    this.submitted = false;
     this.router.navigate(['/home/priorities/'])
  }

  savePriority() {
    this.submitted = true;
    this.addPriority();
    
  }

  addPriority() {
    this.sharedService.addNewPriority(this.priorityObj).subscribe(data => { 
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
