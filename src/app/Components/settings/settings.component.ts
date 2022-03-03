import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarOptions, } from '@fullcalendar/angular'; // useful for typechecking
import { Contract } from 'src/app/Shared/Models/Contract';
import { ContractRequest } from 'src/app/Shared/Models/ContractRequest';
import { RequestService } from 'src/app/Shared/Models/RequstService';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { RequestServiceService } from 'src/app/Shared/services/request-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  contractObj: Contract
  requestsList: Contract[]
  calendarOptions: CalendarOptions
  // newdate: string
  subject: string
  list: any[] = []
  constructor(private requestService: ContractService,
    private datePipe: DatePipe,
    private equipmentService: EquipmentService) { }
  ngOnInit() {
    this.contractObj = {
      id: 0,
      number: 0,
      startDate: null,
      endDate: null,
      contents: '',
      healthCareUnitId: null,
      subject: '',
      supplierId: null,
      supplierName: '',
      supplierNameAr: '',
      equipmentIDs: []
    }

    this.requestService.getAllContracts().subscribe(data => {
      this.list = []
      this.requestsList = data, console.log(data),
        this.requestsList.forEach(element => {
          var title = ''
          var date = ''
          var event = { title: element.subject, date: element.startDate.toString() }
          this.list.push(event)
          console.log(this.list)
        });
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        // dateClick: this.handleDateClick.bind(this),
        // bind is important!
        events: this.list
      }

      console.log(this.calendarOptions.events);
      ;
    })

    // this.serviceRequest={
    //   modeId:0,
    //   priorityId:0,
    //   employeeEmail:'',
    //   employeeId:'',
    //   EquipmentId:0,
    //   healthDirectoryId:0,
    //   healthDistrictId:0,
    //   id:0,
    //   problemDescription:'',
    //   problemDescriptionAr:'',
    //   requestType:'',
    //   serviceRequestCode:'',
    //   serviceRequestDate:new Date,
    //   serviceRequestTime:'',
    //   serviceRequestTitle:'',
    //   serviceRequestTitleAr:''
    // }



  }

  handleDateClick(arg) {
    // alert('date click! ' + arg.dateStr + this.newdate)
  }
  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }
}


