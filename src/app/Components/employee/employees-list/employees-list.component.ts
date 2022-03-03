import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Shared/Models/Employee';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { RegisterModel } from 'src/app/Shared/Models/registerModel';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import {ConfirmationService,Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[];
  selectedEmployees: Employee[];
  employeeDialog: boolean;
  employee: Employee;
  registerModel: RegisterModel;
  submitted: boolean;
  healthCareUnitsList: HealthCareUnit[];
  empId: Number;
  equipList:Equipment[];
  msgs: Message[] = [];
  healthUnitobj:HealthCareUnit;
  district:HealthDistrict
  constructor(private employeeService: EmployeeService,
    private sharedService: SharedService,
    private router: Router,
    private translate: TranslateService,
    private equipmentService:EquipmentService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit() {
  }
//     this.getAll();
//     this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
//     this.employee = {
//       id: 0,
//       employeeName: '',
//       employeeNameAr: '',
//       email: '',
//       mobile: '',
//       phone: '',
//       employeeCode: '',
//       healthCareUnitId: 0,
//       healthDirectoryId: 0,
//       healthDistrictId: 0
//     }
  
//     this.healthUnitobj = {
//       id: 0,
//       healthCareUnitCode: '',
//       healthCareUnitName: '',
//       healthCareUnitNameAr: '',
//       healthDistrictId: 0,
//       healthDirectoryId:0,
//       OrganizationId:0,
//       OrganizationName:'',
//       OrganizationNameAr:'',
//       healthDistrictName:'',
//       healthDistrictNameAr:'',
//       healthDirectoryName:'',
//       healthDirectoryNameAr:'',
//       Address:'',
//       Director:'',
//       Phone:'',
//       Mobile:'',
//       Email:'',
//       Long:0,
//       Lat:0

//     }
//     this.district = {
//       id: 0,
//       healthDirectoryId: 0,
//       healthDistrictName: '',
//       healthDistrictNameAr: ''
//     }
  
//   }
//   getAll() {
//     this.employeeService.getAllEmployees().
//       subscribe(data => { this.employees = data, console.log("employees", this.employees) });
//   }
//   openNew(eq) {
//     this.employeeDialog = true
//     this.submitted = false;
//     this.employee = eq
//     this.getEquipmentByempId(this.employee.email);
//   }
//   hideDialog() {
//     this.employeeDialog = false;
//     this.submitted = false;
//     // this.router.navigate(['/home/emps/'])
//   }
//   updateEmployee() {
//     this.submitted = true;
//     console.log(this.employee)
//     this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(data => {console.log(data),this.hideDialog()})
//     this.router.navigate(['/home/emps/'])
//   }
//   deleteEmployee(empId) {
//   //  var result = confirm("Want to delete this equipment" + "?");
//     //if (result) {
//       console.log(empId);
//       this.employeeService.deleteEmployee(empId).subscribe(
//         data => { console.log(data), this.getAll() }
//       );
//   //  }
//   //  this.router.navigate(['/home/emps/'])
//   }
//   confirmDelete(empId,empName) {
//     this.confirmationService.confirm({
//         message: 'Do you want to delete this' +empName+ ' Category?' ,
//         header: 'Delete Confirmation',
//         icon: 'pi pi-info-circle',
//         accept: () => {
//             this.deleteEmployee(empId)
//             this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
//             this.router.navigate(['/home/emps/'])
//         },
//         reject: () => {
//             this.msgs = [{severity:'info', summary:'Rejected', detail:'Delete rejected'}];
//         }
//     });
// }
//   getEquipmentByempId(empId)
//   {
//     this.equipmentService.getEquipmentsByemp(empId).subscribe(data=>{this.equipList=data; console.log("equips",this.equipList);})
//   }

//   onSelectUnit(unitId) {
//     this.getHealthUnitById(unitId)

    
//   }
//   // confirmSave() {
//   //   this.messageService.add({severity:'error', summary:'In Valid Data', detail:'please,Enter Required Data'});
        
//   // }
//   getHealthUnitById(unitId) {
//     this.sharedService.getunitById(unitId).subscribe(data => {
//       this.healthUnitobj = data, console.log("healthUnitobj", this.healthUnitobj),
//         this.employee.healthDistrictId = this.healthUnitobj.healthDistrictId,
//         this.district.id = this.healthUnitobj.healthDistrictId,
//         console.log(this.employee.healthDistrictId),
//         this.getHealthDistrictbyUnitDistrictId()
//     })
//   }

//   getHealthDistrictbyUnitDistrictId() {
//     console.log(this.healthUnitobj.healthDistrictId)
//     this.sharedService.getDistrictBydistrictId(this.healthUnitobj.healthDistrictId).subscribe(data => {
//       this.district = data,
//         this.employee.healthDirectoryId = this.district.healthDirectoryId
//       console.log("districtobj", this.district,
//         this.district.healthDirectoryId)
//     })
//   }
}
