import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { Category } from 'src/app/Shared/Models/Category';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Origin } from 'src/app/Shared/Models/Origin';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Status } from 'src/app/Shared/Models/Status';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { Department } from 'src/app/Shared/Models/Department';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/Shared/Models/Employee';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { DatePipe } from '@angular/common';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormGroup, NgForm } from '@angular/forms'

import { UserService } from 'src/app/Shared/services/user.service';
import { User } from 'src/app/Shared/Models/User';
import { EquipmentAttachments } from 'src/app/Shared/Models/EquipmentAttachments';

import {  IDropdownSettings } from 'ng-multiselect-dropdown';
import { Paging } from 'src/app/Shared/Models/Paging';


//import { MasterEquipmentService } from 'src/app/Shared/services/Master-equipment.service';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [DatePipe]
})
export class EquipmentsListComponent implements OnInit {
  eqId: Number

  equipmentDialog: boolean;
  equipments: Equipment[];
  MasterEquipment: MasterEquipment[];
  equipmentObj: Equipment;
  selectedProducts: Equipment[];
  submitted: boolean;
  opened: boolean;
  healthCareUnitsList: HealthCareUnit[];
  healthCareUnits: HealthCareUnit[];
  CareUnits: HealthCareUnit[];
  statusList: Status[];
  priorityList: Priority[];
  manufacturerList: Manufacturer[];
  originsList: Origin[];
  categoriesList: Category[];
  subCategoriesList: SubCategory[];
  departmentsList: Department[];
  suppliersList: Supplier[];
  employeeList: Employee[];
  healthDirectoriesList: healthDirectory[];
  HealthDistrictsList: HealthDistrict[];
  users: User[];
  organizations:Equipment[]
  TecniciensList = []
  employees: any[] = [];
  selectedEmployees: User[];
  EpmIDs: string[] = [];
  msgs: Message[] = [];
  districtsList: HealthDistrict[];
  masterEquipment: MasterEquipment[];
  InstallationDate: string = '';
  purchaseDat: string = '';
  index: number = 0;
  Id: number;
  ID = '';
  isNextvalid: boolean = false;
  isPrevvalid: boolean = true;
  currentUser: User;
  directories: Equipment[];
  hospitals: Equipment[];
  districts: Equipment[];
  techniciens: Equipment[];
  Attachs: EquipmentAttachments[];
  Attach: EquipmentAttachments;
  ImagePath: string;
  fileName: string[];
  isvisible: boolean = false;
  isbtnvisible: boolean = false;
  EquipAttachs: EquipmentAttachments[];
  IDs: number[] = [];
  page:Paging;
  count:number;
  public checkedemployees: string[] = ['8df79975-4750-441c-8254-a10a679585d5']
  constructor(private equipmentService: EquipmentService,
    private router: Router,
    private sharedService: SharedService,
    public translate: TranslateService,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private masterEquipmentService: MasterequipmentService,
    private confirmationService: ConfirmationService,
    private messageservice: MessageService,
    private userService: UserService) { this.currentUser = this.userService.currentUserValue; }


  dropdownSettings:IDropdownSettings;
  ngOnInit() {
    this.selectedEmployees = []
    this.directories = []
    this.hospitals = []
    this.TecniciensList = []
    this.techniciens = []
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.sharedService.getAllstatuses().subscribe(data => { this.statusList = data });
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });
    this.sharedService.getAllDepartments().subscribe(data => { this.departmentsList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data});
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data });
    // this.sharedService.getAllEmployees().subscribe(data => { this.employeesList = data });
    this.sharedService.getAllHealthDistrict().subscribe(data => { this.districtsList = data });
    this.page={
      pagenumber:1,
      pagesize:10
    }
  this.equipmentService.getcount().subscribe(data=>
  {
    this.count=data
  })
    this.getAllWithPaging(this.page)
    this.equipmentObj = {
      id: 0,
      equipmentDescription: '',
      equipmentDescriptionAr: '',
      equipmentName: "",
      equipmentNameAr: "",
      installationDate: new Date(),
      purchaseDate: new Date(),
      priorityId: 0,
      equipmentCategoryId: 0,
      equipmentSubCategoryId: 0,
      equipmentStatuSId: 0,
      statusName: '',
      statusNameAr: '',
      manufacturerId: 0,
      originId: 0,
      healthCareUnitId: 0,
      healthCareUnit: '',
      healthCareUnitName: '',
      healthCareUnitNameAr: '',
      supplierId: 0,
      supplierName: '',
      supplierNameAr: '',
      expectedLifeTime: 0,
      length: 0,
      height: 0,
      weight: 0,
      departmentId: 0,
      departmentName: '',
      departmentNameAr: '',
      room: 0,
      floor: 0,
      remarks: '',
      price: 0,
      modelNumber: '',
      versionNumber: '',
      serialNumber: '',
      internalCode: '',
      upaCode: '',
      barcode: '',
      color: '',
      colorAr: '',
      manufacturerName: '',
      manufacturerNameAr: '',
      healthDirectoryId: 0,
      healthDirectoryName: '',
      healthDirectoryNameAr: '',
      healthDistrictId: 0,
      healthDistrictName: '',
      healthDistrictNameAr: '',
      employeeIDs: [],
      AttachmentIDs: [],
      masterEquipmentId: 0,
      qrImgPath: '',
      createdAt: new Date(),
      organizationName: '',
      organizationNameAr: '',
      time: '',
      recallNumber: 0,
      recallDate: new Date(),
      organizationId: 0,
      contractRequestId:0,
      organizationrequestid:0,
      contractid:0,
      DepreciationRate :0
    }
    this.Attach = {
      id: 0,
      fileName: '',
      equipmentId: 0
    }
    this.equipmentObj.employeeIDs = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };   
  }

  onItemSelect(item) {
    this.equipmentObj.employeeIDs.push(item.id)
  //   if(this.equipmentObj.employeeIDs.length>0){
  //         this.equipmentObj.employeeIDs.push(item.id)
  //     this.equipmentObj.employeeIDs.forEach(element => {
  //       console.log("eeee",element,item.id)
  //       if(element!=item.id){
  //         console.log("basooma",this.equipmentObj.employeeIDs)
  //        }
  //        else{
  //          console.log("they are equal")
  //        }
  //      });
  //     for(var i=0;i<this.equipmentObj.employeeIDs.length;){
  //       if(this.equipmentObj.employeeIDs[i]!=item.id){
  //            this.equipmentObj.employeeIDs.push(item.id)
  //         //     console.log("basooma",this.equipmentObj.employeeIDs)
  //         //    }
  //     }
  //   }
  // }
  //   else if(this.equipmentObj.employeeIDs.length== 0){
  //     this.equipmentObj.employeeIDs.push(item.id)
  //     console.log("basbeso",this.equipmentObj.employeeIDs)
    
  // }
}
onItemDeSelect(item){
  for(var i=0;i<this.equipmentObj.employeeIDs.length;i++){
    if(this.equipmentObj.employeeIDs[i]==item.id){
      this.equipmentObj.employeeIDs.splice(i,1)
    }
  }
}
  onSelectAll(items: any) {
  }
  getHealthCareUnit(id: number) {
    this.sharedService.getAllunitsByDistrictId(id).subscribe(data => { this.CareUnits = data })

  }
  getAll() {
    if (this.currentUser.roleName == 'Admin') {
      this.equipmentService.getAllEquipments().
        subscribe(data => { this.equipments = data})
    }

    if (this.currentUser.roleName == 'Governorate') {
      this.equipmentService.getAllEquipments().
        subscribe(data => {
          this.equipments = data,


            this.equipments.forEach(element => {
              if (element.healthDirectoryId == this.currentUser.healthdirId) {

                this.directories.push(element)
                this.equipments = this.directories
              }
            })
        });
    }

    if (this.currentUser.roleName == 'Hospital') {
      this.equipmentService.getAllEquipments().
        subscribe(data => {
          this.equipments = data,
            this.equipments.forEach(element => {
              if (element.healthCareUnitId == this.currentUser.healthCareUnitId) {
                this.hospitals.push(element)
              }
              if (this.currentUser.roleName == 'Hospital') {
                this.equipments = this.hospitals
              }
            })
        });
    }

    if (this.currentUser.roleName == 'City') {
      this.equipmentService.getAllEquipments().
        subscribe(data => {
          this.equipments = data,
            this.equipments.forEach(element => {
              if (element.healthDistrictId == this.currentUser.healthDistrictId) {
                this.districts.push(element)
              }
              if (this.currentUser.roleName == 'City') {
                this.equipments = this.districts
              }
            })
        });
    }

    if (this.currentUser.roleName == 'Technician') {
    
      this.equipmentService.getAllEquipments().
        subscribe(data => {
          this.equipments = data,
            this.equipments.forEach(element => {
              element.employeeIDs.forEach(usrElement => {
                if (usrElement == this.currentUser.id) {                
                  this.techniciens.push(element)
                }
               
              })              
            })
            if (this.currentUser.roleName == 'Technician') {
              this.equipments = this.techniciens
            }
        });
      }

        if (this.currentUser.roleName == 'Organization') {
          this.equipmentService.getAllEquipments().
            subscribe(data => {
              this.equipments = data,
                this.equipments.forEach(element => {
                  if (element.organizationId == this.currentUser.organizationId) {
                    this.organizations.push(element)
                  }
                  if (this.currentUser.roleName == 'Organization') {
                    this.equipments = this.organizations
                  }
                })
            });
        }
  }
  getAllWithPaging(page)
  {
    this.equipmentService.getAllwithpaging(page).subscribe(data=>{
      if (this.currentUser.roleName == 'Admin') {
        this.equipmentService.getAllEquipments().
          subscribe(data => { this.equipments = data})
      }
  
      if (this.currentUser.roleName == 'Governorate') {
        this.equipmentService.getAllEquipments().
          subscribe(data => {
            this.equipments = data,
  
  
              this.equipments.forEach(element => {
                if (element.healthDirectoryId == this.currentUser.healthdirId) {
  
                  this.directories.push(element)
                  this.equipments = this.directories
                }
              })
          });
      }
  
      if (this.currentUser.roleName == 'Hospital') {
        this.equipmentService.getAllEquipments().
          subscribe(data => {
            this.equipments = data,
              this.equipments.forEach(element => {
                if (element.healthCareUnitId == this.currentUser.healthCareUnitId) {
                  this.hospitals.push(element)
                }
                if (this.currentUser.roleName == 'Hospital') {
                  this.equipments = this.hospitals
                }
              })
          });
      }
  
      if (this.currentUser.roleName == 'City') {
        this.equipmentService.getAllEquipments().
          subscribe(data => {
            this.equipments = data,
              this.equipments.forEach(element => {
                if (element.healthDistrictId == this.currentUser.healthDistrictId) {
                  this.districts.push(element)
                }
                if (this.currentUser.roleName == 'City') {
                  this.equipments = this.districts
                }
              })
          });
      }
  
      if (this.currentUser.roleName == 'Technician') {
      
        this.equipmentService.getAllEquipments().
          subscribe(data => {
            this.equipments = data,
              this.equipments.forEach(element => {
                element.employeeIDs.forEach(usrElement => {
                  if (usrElement == this.currentUser.id) {                
                    this.techniciens.push(element)
                  }
                 
                })              
              })
              if (this.currentUser.roleName == 'Technician') {
                this.equipments = this.techniciens
              }
          });
        }
  
          if (this.currentUser.roleName == 'Organization') {
            this.equipmentService.getAllEquipments().
              subscribe(data => {
                this.equipments = data,
                  this.equipments.forEach(element => {
                    if (element.organizationId == this.currentUser.organizationId) {
                      this.organizations.push(element)
                    }
                    if (this.currentUser.roleName == 'Organization') {
                      this.equipments = this.organizations
                    }
                  })
              });
          }      
    })
  }
  openNew(eq) {
    this.InstallationDate = this.datePipe.transform(eq.installationDate, 'yyyy-MM-dd');
    this.purchaseDat = this.datePipe.transform(eq.purchaseDate, 'yyyy-MM-dd');
    this.getAttachs(eq.id);
    eq.installationDate = this.InstallationDate;
    eq.purchaseDate = this.purchaseDat;
    this.equipmentDialog = true
    this.submitted = false;

    this.equipmentObj = eq;
    this.getSelectedemployees(eq.id);
    this.eqId = this.equipmentObj.id;
    this.sharedService.getAllunits().subscribe(data => {
      this.healthCareUnitsList = data
    });

    this.sharedService.getAllstatuses().subscribe(data => { this.statusList = data });
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });
    this.sharedService.getAllDepartments().subscribe(data => { this.departmentsList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    this.userService.getUsers().subscribe(data => {
      this.users = data,
      this.users.forEach(element => {
        if (this.currentUser.roleName == 'Hospital') {
          if ((element.healthCareUnitId == this.currentUser.healthCareUnitId) && element.roleName == 'Technician') {
            this.TecniciensList.push(element)
            this.users = this.TecniciensList
          }
        }
      })
    });
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data });
    this.masterEquipmentService.getAll().subscribe(data => { this.masterEquipment = data });

  }
  getAllMasterEquipment() {
    this.masterEquipmentService.getAll().subscribe(data => { this.MasterEquipment = data});
  }
  fillDistrict(name: string) {
    this.sharedService.getDirectoryIdByname(name).subscribe(data => {
      this.sharedService.getAllHealthDistricts(data).subscribe(data => {
        this.HealthDistrictsList = data
      });
    });

  }
  fillHospital(name: string) {
    this.sharedService.getDirectoryIdByname(name).subscribe(data => {
      this.sharedService.getAllunitsByDistrictId(data).subscribe(data => {
        this.healthCareUnits = data;
      })
    })
  }
  fillSubCategory() {
    this.sharedService.getAllSubCategories(this.equipmentObj.equipmentCategoryId).subscribe(data => { this.subCategoriesList = data});
  }
  hideDialog() {
    this.equipmentDialog = false;
    this.submitted = false;

  }
  getAttachs(equipId) {
    this.equipmentService.getAllAttachForEquipment(equipId).subscribe(data => {
      this.Attachs = data,
        this.Attachs.forEach(el => {
        });
    })
  }
  getimagepath(img) {
    this.equipmentService.getImagePath(img).subscribe(data => {
      this.ImagePath = data
    });
  }

  getSelectedemployees(id) {

    this.userService.getEquipmentEmployees(id).subscribe(
      data => {
        this.selectedEmployees = data;
        this.selectedEmployees.forEach(value => {
          this.EpmIDs.push(value.id);
        });
      });
  }
  updateProduct(myform: NgForm) {
    this.submitted = true;
    this.equipmentObj.installationDate = new Date(this.InstallationDate);
    this.equipmentObj.purchaseDate = new Date(this.purchaseDat);
    this.equipmentService.getAllAttachWithNoEquipment().subscribe(data => {
      this.EquipAttachs = data;
      this.EquipAttachs.forEach(element => {
        this.IDs.push(element.id);
      });
      this.equipmentObj.AttachmentIDs = this.IDs;
      this.equipmentService.updateEquipment(this.equipmentObj.id, this.equipmentObj).subscribe(data => { this.hideDialog() });

    });
  }

  deleteProduct(equipmentId) {

    this.equipmentService.deleteEquipment(equipmentId).subscribe(
      data => {
        this.getAllWithPaging(this.page);
      });

  }
  confirmDelete(eqId, eqName) {
    if (this.translate.currentLang == 'En') {

      this.confirmationService.confirm({
        message: 'Do you want to delete this' + eqName + ' Equipment?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deleteProduct(eqId)
          this.messageservice.add({ severity: 'info', detail: 'Record deleted' });

        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        },
        acceptLabel: "yes",
        rejectLabel: "No"
      });
    }
    else if (this.translate.currentLang == 'Ar') {
      this.confirmationService.confirm({
        message: 'هل انت متأكد من مسح' + eqName + 'من القائمه ',
        header: 'تاكيد عملية المسح',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.deleteProduct(eqId)
          this.msgs = [{ severity: 'info', detail: 'تم المسح' }]


        },
        reject: () => {
          this.msgs = [{ severity: 'info', detail: 'رفض عمليه المسح' }];
        },
        acceptLabel: "نعم",
        rejectLabel: "لا",
      });
    }
  }

  // checkCheckBoxvalue(event) {
  //   this.EpmIDs = [];
  //   console.log("selected111", this.selectedEmployees);
  //   var index = this.selectedEmployees.length;
  //   if (event.value.length === index + 1) {
  //     console.log("index", index);
  //     console.log(event)
  //     this.selectedEmployees.forEach(value => {
  //       if (value.id != event.itemValue.id) {
  //         console.log(value, event.itemValue.id, "uuuuuuddddddddddddddd")
  //         this.equipmentObj.employeeIDs.push(event.itemValue.id);
  //       }
  //     });
  //   }
  //   else {

  //     var ind = this.equipmentObj.employeeIDs.indexOf(event.itemValue.id);
  //     this.equipmentObj.employeeIDs.splice(ind, 1);
  //   }
  //   this.EpmIDs = this.equipmentObj.employeeIDs

  //   console.log("basooma", this.EpmIDs, "yyyyyyyyyy", this.equipmentObj.employeeIDs)
  //   // var index = this.equipmentObj.employeeIDs.length;
  //   // if (event.value.length === index + 1) {
  //   //   if (event.itemValue.id === event.value[index].id) {
  //   //     this.equipmentObj.employeeIDs.push(event.value[index].id);
  //   //     //     console.log("after push", this.equipmentObj.employeeIDs);
  //   //   }
  //   // }
  //   // else {
  //   //   var ind = this.equipmentObj.employeeIDs.indexOf(event.itemValue.id);
  //   //   this.equipmentObj.employeeIDs.splice(ind, 1);
  //   //   //   console.log("after remove", this.equipmentObj.employeeIDs);
  //   // }
  // }
  Next() {
    this.index++;
    if (this.index === 4) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }

  }
  Previous() {
    this.index--;
    if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }

  }
  handleChange(e) {
    this.index = e.index;
    if (this.index === 4) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
    else if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }

  }
  getDetails(id: number) {
    this.router.navigate(['home/EquipmentDetailsAdminComponent', id]);
  }
  RemoveAttach(id: number) {
    this.equipmentService.DeleteAttachment(id).subscribe(data => {});
    this.isvisible = true;
    this.isbtnvisible = true;
  }
  openLink() {
    // window.open("http://localhost:4200/pdfCreate");
    this.router.navigate(['/pdfCreate']);
  }
}
