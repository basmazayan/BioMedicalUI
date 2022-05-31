import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Shared/Models/Employee';
import { RegisterModel } from 'src/app/Shared/Models/registerModel';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { Organization } from 'src/app/Shared/Models/Organization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { MessageService } from 'primeng/api';
import { SubSubOrganizationService } from 'src/app/Shared/services/sub-organization.service';
import { SubOrganization } from 'src/app/Shared/Models/subOrganization';
import { Role } from 'src/app/Shared/Models/Role';
import { Supplier } from 'src/app/Shared/Models/Supplier';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {


  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  empsList: Employee[];
  unAssignedUsers = [];
  rolesList: Role[];
  registerModel: RegisterModel;
  user: User;
  userDialog: boolean;
  employee: Employee;
  submitted: boolean;
  uploadedFiles: any[] = [];
  Equipments: Equipment[];
  currentUser: User;
  dirctoryRoleList: Role[]
  healthUnits: HealthCareUnit[];
  healthDistricts: HealthDistrict[];
  healthDirectories: healthDirectory[];
  organizationList: Organization[];
  show = false;
  error: string;
  errorDialog: boolean=false
  subOrganizationList: SubOrganization[]
  TechnicianRoleList: Role[];
  HospitalRoleList: Role[];
  suppliersList:Supplier[];
  constructor(private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private translate: TranslateService,
    private equipmentservice: EquipmentService,
    private sharedService: SharedService,
    private organizationService: OrganizationService,
    private subOrganizationService: SubSubOrganizationService,
    private messageService: MessageService) { this.currentUser = this.userService.currentUserValue; }

  ngOnInit() {

    this.dirctoryRoleList = []
    this.TechnicianRoleList = []
    this.HospitalRoleList = []
    this.user = {
      id: '',
      userName: '',
      userNameAr: '',
      email: '',
      password: '',
      roleName: '',
      healthdirId: null,
      token: '',
      suborganizationId: null,
      healthDistrictId: null,
      healthCareUnitId: null,
      organizationId: null,
      supplierId:null,
      organizationName:''
    }

    this.openNew();
  }
  openNew() {


    this.sharedService.getAllunits().subscribe(data => { this.healthUnits = data});
    this.subOrganizationService.getAllSubOrganization().subscribe(data => { this.subOrganizationList = data});
    this.organizationService.getAllOrganization().subscribe(data => { this.organizationList = data});
    this.sharedService.getAllHealthDistrict().subscribe(data => { this.healthDistricts = data});
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectories = data});
    this.sharedService.getAllSuppliers().subscribe(data=>{this.suppliersList=data})
    this.userDialog = true
    this.submitted = false;
    this.userService.getRoles().subscribe(data => {
      this.rolesList = data

      if (this.currentUser.roleName == 'Admin') {
        this.rolesList = this.rolesList

      }
      else if (this.currentUser.roleName == 'Governorate') {
        this.rolesList.forEach(element => {
          if (element.name == 'City') {

            this.dirctoryRoleList.push(element)
            this.rolesList = this.dirctoryRoleList
          }
        })
      }
      else if (this.currentUser.roleName == 'Hospital') {
        this.rolesList.forEach(element => {
          if (element.name == 'Technician') {
            this.TechnicianRoleList.push(element)
            this.rolesList = this.TechnicianRoleList
          }
        })
      }
      else if (this.currentUser.roleName == 'City') {
        this.rolesList.forEach(element => {
          if (element.name == 'Hospital') {
            this.HospitalRoleList.push(element)
            this.rolesList = this.HospitalRoleList
          }
        })
      }
    });
    this.equipmentservice.getAllEquipments().subscribe(data => { this.Equipments = data });

  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/users'])
  }
  saveUser() {
    this.submitted = true;
    this.addUser();

  }
  addUser() {
    this.userService.register(this.user).subscribe(data => {this.hideDialog(),console.log(data) },
    error => {
      this.errorDialog = true,
        this.error = error.error.message;
    }
    );
  }
  loadDistricts(DirectoryId: number) {
    this.sharedService.getAllHealthDistricts(DirectoryId).subscribe(data => {
      this.healthDistricts = data
    });
  }

}