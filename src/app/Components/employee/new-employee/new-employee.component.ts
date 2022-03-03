import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Shared/Models/Employee';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { ConfirmationService,MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  employees: Employee[];
  selectedEmployees: Employee[];
  equipmentDialog: boolean;
  employee: Employee;
  submitted: boolean;
  healthCareUnitsList: HealthCareUnit[];
  healthCareUnitsListByDistrictId: HealthCareUnit[];
  uploadedFiles: any[] = [];
  healthDirectoriesList: healthDirectory[];
  HealthDistrictsList: HealthDistrict[];
  healthUnitobj: HealthCareUnit
  healthDistrict: number
  unitId: number
  pattern: string;
  districtId: number
  district: HealthDistrict
  directoryId: number;
  directory: healthDirectory;
  msgs: Message[] = [];
  constructor(private employeeService: EmployeeService,
    private sharedService: SharedService,
    private router: Router,
    private translate: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService) {
    console.log(translate.getBrowserLang());
    // var lang=this.translate.getBrowserLang();
    //         // this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    //         // {
    //           if(lang == 'Ar')
    //           {
    //             this.pattern="";
    //             console.log("arabic");
    //           } 
    //           else
    //           {
    //             this.pattern="[A-Za-z]+";
    //             console.log("english");
    //           }
    //});
  }

  ngOnInit() {
  }
  //   this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
  //   this.districtId = 0
  //   this.employee = {
  //     id: 0,
  //     employeeName: '',
  //     employeeNameAr: '',
  //     email: '',
  //     mobile: '',
  //     phone: '',
  //     employeeCode: '',
  //     healthCareUnitId: 0,
  //     healthDirectoryId: 0,
  //     healthDistrictId: 0

  //   }
  //   this.healthUnitobj = {
  //     id: 0,
  //     healthCareUnitCode: '',
  //     healthCareUnitName: '',
  //     healthCareUnitNameAr: '',
  //     healthDistrictId: 0,
  //     healthDirectoryId:0,
  //     OrganizationId:0,
  //     OrganizationName:'',
  //     OrganizationNameAr:'',
  //     healthDistrictName:'',
  //     healthDistrictNameAr:'',
  //     healthDirectoryName:'',
  //     healthDirectoryNameAr:'',
  //     Address:'',
  //     Director:'',
  //     Phone:'',
  //     Mobile:'',
  //     Email:'',
  //     Long:0,
  //     Lat:0

  //   }
  //   this.district = {
  //     id: 0,
  //     healthDirectoryId: 0,
  //     healthDistrictName: '',
  //     healthDistrictNameAr: ''
  //   }

  //   this.openNew()


  // }
  // openNew() {
  //   this.equipmentDialog = true
  //   this.submitted = false;
  //   this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
  //   this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data });
  // }
  // hideDialog() {
  //   this.equipmentDialog = false;
  //   this.submitted = false;
  //   this.router.navigate(['/home/emps/'])
  // }
  // fillDistrict() {
  //   this.sharedService.getAllHealthDistricts(this.employee.healthDirectoryId).subscribe(data => { this.HealthDistrictsList = data });
  // }

  // fillHealthCareUnit() {
  //   this.sharedService.getAllunitsByDistrictId(this.employee.healthDistrictId).subscribe(data => { this.healthCareUnitsListByDistrictId = data });
  // }
  // // confirmSave() {
  // //   this.messageService.add({severity:'error', summary:'In Valid Data', detail:'please,Enter Required Data'});
        
  // // }
  // saveEmployee() {

  //   console.log("inside saveEmployee");
  //   this.submitted = true;
  //   this.addEmployee();

  // }
  // addEmployee() {

  //   // this.employee.healthCareUnitId = Number(this.employee.healthCareUnitId);
  //   console.log(this.employee)

  //   this.employeeService.addNewEmployee(this.employee).subscribe(data => { console.log(data) });
  //   this.router.navigate(['/home/emps/'])
  // }
  // onSelectUnit(unitId) {
  //   this.getHealthUnitById(unitId)


  // }

  // getHealthUnitById(unitId) {
  //   this.sharedService.getunitById(unitId).subscribe(data => {
  //     this.healthUnitobj = data, console.log("healthUnitobj", this.healthUnitobj),
  //       this.employee.healthDistrictId = this.healthUnitobj.healthDistrictId,
  //       this.district.id = this.healthUnitobj.healthDistrictId,
  //       console.log(this.employee.healthDistrictId),
  //       this.getHealthDistrictbyUnitDistrictId()
  //   })
  // }

  // getHealthDistrictbyUnitDistrictId() {
  //   console.log(this.healthUnitobj.healthDistrictId)
  //   this.sharedService.getDistrictBydistrictId(this.healthUnitobj.healthDistrictId).subscribe(data => {
  //     this.district = data,
  //       this.employee.healthDirectoryId = this.district.healthDirectoryId
  //     console.log("districtobj", this.district,
  //       this.district.healthDirectoryId)
  //   })
  // }


  // onDrop(event: any) {
  //   console.log(event);
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // your code goes here after droping files or any
  // }

  // onDragOver(evt) {
  //   console.log(evt);

  //   evt.preventDefault();
  //   evt.stopPropagation();
  // }

  // onDragLeave(evt) {
  //   console.log(evt);

  //   evt.preventDefault();
  //   evt.stopPropagation();
  // }

  // upload(event) {
  //   for (let file of event.files) {
  //     console.log(event)
  //     this.uploadedFiles.push(file);
  //   }

  // }

}