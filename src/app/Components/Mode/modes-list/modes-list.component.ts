import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mode } from 'src/app/Shared/Models/Mode';
import { SharedService } from 'src/app/Shared/services/shared.service';
import {ConfirmationService,Message} from 'primeng/api';
@Component({
  selector: 'app-modes-list',
  templateUrl: './modes-list.component.html',
  styleUrls: ['./modes-list.component.scss']
})
export class ModesListComponent implements OnInit {
  selectedModes: Mode[]
  modeDialog: boolean;
  mode: Mode
  submitted: boolean;
  modesList: Mode[];
  msgs: Message[] = [];
  constructor(private sharedService: SharedService, private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.sharedService.getAllModes().subscribe(data => { this.modesList = data });

  }
  openNew(m) {
    this.modeDialog = true
    this.submitted = false;
    this.mode = m
    console.log(m)
  }
  hideDialog() {
    this.modeDialog = false;
    this.submitted = false;
   
  }
  updateMode() {
    this.submitted = true;
    console.log(this.mode)
    this.sharedService.updateMode(this.mode.id, this.mode).subscribe(data =>{data=this.mode, console.log(data), this.hideDialog()})
 
  }
  deleteMode(modeId) {
      this.sharedService.deleteMode(modeId).subscribe(
        data => { console.log(data), this.getAll() }
      );
  }
  confirmDelete(MId) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this level of Mode ?' ,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteMode(MId)
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'Delete rejected'}];
        }
    });
}
}

