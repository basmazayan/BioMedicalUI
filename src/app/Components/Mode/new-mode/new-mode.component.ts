import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mode } from 'src/app/Shared/Models/Mode';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-mode',
  templateUrl: './new-mode.component.html',
  styleUrls: ['./new-mode.component.css']
})
export class NewModeComponent implements OnInit {
 modeDialog: boolean;
  mode: Mode;
  submitted:boolean;
  constructor(private sharedService:SharedService,private router:Router) { }

  ngOnInit() {
    this.mode = {
      id: 0,
      requestMode: '',
      requestModeAr:''
    }
    this.openNew()
  }

  openNew() {
    this.modeDialog = true
    this.submitted = false;
  }

  hideDialog() {
    this.modeDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/Modes/'])
  }

  saveMode() {
    this.submitted = true;
    this.addMode();
    this.router.navigate(['/home/Modes/'])
  }

  addMode() {
    this.sharedService.addNewMode(this.mode).subscribe(data => { console.log(data) });

  }

}
