import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Shared/Models/Employee';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { RegisterModel } from 'src/app/Shared/Models/registerModel';
import { User } from 'src/app/Shared/Models/User';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { UserService } from 'src/app/Shared/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Role } from 'src/app/Shared/Models/Role';
import { element } from 'protractor';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { Organization } from 'src/app/Shared/Models/Organization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { SubSubOrganizationService } from 'src/app/Shared/services/sub-organization.service';
import { SubOrganization } from 'src/app/Shared/Models/subOrganization';
import { Paging } from 'src/app/Shared/Models/Paging';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  selectedUsers: User[];
  userDialog: boolean;
  user: User;
  currentUser: User;
  registerModel: RegisterModel;
  submitted: boolean;
  healthCareUnitsList: HealthCareUnit[];
  userId: Number;
  role: Role;
  rolesList: Role[];
  dirctoryRoleList: Role[]
  districts: User[]
  directories: User[]
  equipments: Equipment[];
  error: string;
  msgs: Message[] = [];
  TecniciensList: User[]
  hospitals: User[];
  organizations: User[]
  healthUnits: HealthCareUnit[];
  healthDistricts: HealthDistrict[];
  healthDirectories: healthDirectory[];
  organizationList: Organization[];
  errorDialog: boolean = false;
  subOrganizationList: SubOrganization[];
  TechnicianRoleList: Role[];
  HospitalRoleList: Role[];
  page: Paging;
  count: number;
  constructor(private userService: UserService, private sharedService: SharedService,
    private router: Router, private translate: TranslateService,
    private equipmentservice: EquipmentService,
    private confirmationService: ConfirmationService,
    private organizationService: OrganizationService,
    private subOrganizationService: SubSubOrganizationService,
    private messageservice: MessageService) { this.currentUser = this.userService.currentUserValue; }

  ngOnInit() {
    // console.log("iiiii")

    this.dirctoryRoleList = []
    this.TecniciensList = []
    this.HospitalRoleList = []

    this.districts = []
    this.directories = []
    this.hospitals = []
    this.organizations = []
    this.getAll();
    // this.page = {
    //   pagenumber: 1,
    //   pagesize: 10
    // }
    // this.userService.getUserscount().subscribe(data => {
    //   this.count = data
    // })
    // this.userService.getAllUserswithpaging(this.page).subscribe(data => {
    //   this.users = data;
    // })
    this.userService.createRoles().subscribe(data => {
      data = data
      //  console.log("data", data) 
    });
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.user = {
      id: '',
      userName: '',
      userNameAr: '',
      email: '',
      password: '',
      roleName: '',
      healthdirId: 0,
      suborganizationId: 0,
      token: '',
      healthDistrictId: 0,
      healthCareUnitId: 0,
      organizationId: 0,
      supplierId: 0,
      organizationName: ''
    }
    this.role =
    {
      id: '',
      name: ''
    }
  }
  openNew(user) {
    this.dirctoryRoleList = []
    this.TecniciensList = []
    this.HospitalRoleList = []
    // console.log(user,"user");
    this.sharedService.getAllunits().subscribe(data => { this.healthUnits = data });
    this.subOrganizationService.getAllSubOrganization().subscribe(data => {
      this.subOrganizationList = data
      //  console.log(this.subOrganizationList)
    });
    this.organizationService.getAllOrganization().subscribe(data => {
      this.organizationList = data
      //  console.log("orgs", this.organizationList)
    });
    this.sharedService.getAllHealthDistrict().subscribe(data => { this.healthDistricts = data });
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectories = data });
    this.submitted = false;
    this.userDialog = true;
    this.user = user;
    // console.log("after function");
    this.userService.getRoles().subscribe(data => {
      this.rolesList = data
      //  console.log("roles", data)
      if (this.currentUser.roleName == 'Admin' || this.currentUser.roleName == 'HeadQuarter') {
        this.rolesList = this.rolesList

      }
    })
    if (this.currentUser.roleName == 'Governorate') {
      // console.log("gov")

      this.userService.getRoles().subscribe(data => {
        this.rolesList = data
        // console.log(this.rolesList)
        this.rolesList.forEach(element => {
          if (element.name == 'City') {

            this.dirctoryRoleList.push(element)
            // console.log(element.name,this.dirctoryRoleList,"ttttttttttttttt")
          }
        })
        this.rolesList = this.dirctoryRoleList
      })

    }
    if (this.currentUser.roleName == 'Hospital') {
      this.userService.getRoles().subscribe(data => {
        this.rolesList = data
        // console.log(this.rolesList)

        this.rolesList.forEach(element => {
          if (element.name == 'Technician') {
            this.TechnicianRoleList.push(element)
          }
        })
        this.rolesList = this.TechnicianRoleList
      })
    }

    if (this.currentUser.roleName == 'City') {
      this.userService.getRoles().subscribe(data => {
        this.rolesList = data

        this.rolesList.forEach(element => {
          if (element.name == 'Hospital') {
            this.HospitalRoleList.push(element)
          }
        })
        this.rolesList = this.HospitalRoleList
      })
    }

    this.equipmentservice.getAllEquipments().subscribe(data => { this.equipments = data });
  }
  getAll() {
    if (this.currentUser.roleName == 'Admin' || this.currentUser.roleName == 'HeadQuarter') {
      this.userService.getUsers().subscribe(data => {
        this.users = data
        // console.log(data)
      });
    }
    if (this.currentUser.roleName == 'Governorate') {
      this.userService.getUsers().
        subscribe(data => {
          // console.log("one")
          this.users = data,

            this.users.forEach(element => {
              if (element.healthdirId == this.currentUser.healthdirId) {
                // console.log(element, element.healthdirId, element.healthDistrictId
                // )
                this.directories.push(element)
              }
              if (this.currentUser.roleName == 'Governorate') {
                this.users = this.directories
                // console.log(this.directories)
              }
            })
        });
    }
    if (this.currentUser.roleName == 'Hospital') {
      // console.log(this.currentUser)
      // console.log("hospital")
      this.userService.getUsers().
        subscribe(data => {
          this.users = data,
            this.users.forEach(element => {
              if (element.healthCareUnitId == this.currentUser.healthCareUnitId && (element.roleName == 'Technician' || this.currentUser.roleName == 'Hospital')) {
                this.hospitals.push(element)
              }
              if (this.currentUser.roleName == 'Hospital') {
                this.users = this.hospitals
                // console.log(this.hospitals)
              }
            })
        });
    }
    if (this.currentUser.roleName == 'City') {
      this.userService.getUsers().
        subscribe(data => {
          this.users = data,
            this.users.forEach(element => {
              //  console.log(element.healthDistrictId, this.currentUser.healthDistrictId)
              if (element.healthDistrictId == this.currentUser.healthDistrictId) {
                this.districts.push(element)
              }
              if (this.currentUser.roleName == 'City') {
                this.users = this.districts
              }
            })
        });
    }
    if (this.currentUser.roleName == 'Technician') {
      this.userService.getUsers().
        subscribe(data => {
          this.users = data,
            this.users.forEach(element => {
              // console.log(element.userId, this.currentUser.userId)
              if (element.id == this.currentUser.id) {
                this.TecniciensList.push(element)
                this.users = this.TecniciensList
                // console.log(this.TecniciensList)
              }

            })
        });
    }
    if (this.currentUser.roleName == 'Organization') {
      this.userService.getUsers().
        subscribe(data => {
          this.users = data,
            this.users.forEach(element => {
              //  console.log(element.healthDistrictId, this.currentUser.healthDistrictId)
              if (element.organizationId == this.currentUser.organizationId) {
                this.organizations.push(element)
              }
              if (this.currentUser.roleName == 'Organization') {
                this.users = this.organizations
              }
            })
        });
    }
  }


  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(data => {
      // console.log(data),
      this.getAll()
    })
  }
  confirmDelete(userId, userName) {
    console.log("delete")
    if (this.translate.currentLang == 'En') {
      this.confirmationService.confirm({
        message: 'Do you want to delete ' + userName + '?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deleteUser(userId)
          this.messageservice.add({ severity: 'info', detail: 'Record deleted' });
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        }
      });
    }
    else if (this.translate.currentLang == 'Ar') {
      this.confirmationService.confirm({
        message: 'هل انت متأكد من مسح' + userName + 'من القائمه ',
        header: 'تاكيد عملية المسح',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.deleteUser(userId)
          this.messageservice.add({ severity: 'info', detail: 'تم المسح' });

        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'رفض عمليه المسح' });
        },
        acceptLabel: "نعم",
        rejectLabel: "لا",
      });
    }
  }


  updateUser() {
    this.submitted = true;
    this.editUser(this.user);

  }

  editUser(user: User) {
    // console.log("user",this.user)
    this.userService.updateRole(user).subscribe(data => {
      // console.log(data)
      this.hideDialog()
    },
      error => {
        this.errorDialog = true,
          this.error = error.error.message;

      });
  }
  hideDialog() {
    this.userDialog = false;
  }
  loadDistricts(DirectoryId: number) {
    this.sharedService.getAllHealthDistricts(DirectoryId).subscribe(data => {
      this.healthDistricts = data
      // console.log(DirectoryId)
    });
  }
}