import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Category } from 'src/app/Shared/Models/Category';
import { Department } from 'src/app/Shared/Models/Department';
import { Employee } from 'src/app/Shared/Models/Employee';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { Origin } from 'src/app/Shared/Models/Origin';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Status } from 'src/app/Shared/Models/Status';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { User } from 'src/app/Shared/Models/User';
import { EmployeeService } from 'src/app/Shared/services/employee.service';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-equipment-details-admin',
  templateUrl: './equipment-details-admin.component.html',
  styleUrls: ['./equipment-details-admin.component.css']
})
export class EquipmentDetailsAdminComponent implements OnInit {

  eqId: Number;
  equiID: number;
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
  TecniciensList = []
  employees: any[] = [];
  selectedEmployees: Employee[];
  EpmIDs: number[] = [];
  msgs: Message[] = [];
  districtsList: HealthDistrict[];
  masterEquipment: MasterEquipment[];
  InstallationDate: string = '';
  purchaseDat: string = '';
  index: number = 0;
  Id: number;
  isNextvalid: boolean = false;
  isPrevvalid: boolean = true;
  currentUser: User;
  constructor(private equipmentService: EquipmentService,
    private router: Router,
    private sharedService: SharedService,
    public translate: TranslateService,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private masterEquipmentService: MasterequipmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService,
    private activeRoute: ActivatedRoute) { this.currentUser = this.userService.currentUserValue; }

  ngOnInit(): void {
    this.equipmentObj = {
      id: this.activeRoute.snapshot.params['id'],
      equipmentDescription: '',
      equipmentDescriptionAr: '',
      equipmentName: '',
      equipmentNameAr: '',
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
      createdAt:new Date(),
      organizationName:'',
      organizationNameAr:'',
      time:'',
      recallNumber:0,
      recallDate:new Date(),
      organizationId:0,
      contractRequestId:0,
      organizationrequestid:0,
      contractid:0,
      DepreciationRate:0
    }
    this.equipmentObj.employeeIDs = [];
    this.openNew(this.activeRoute.snapshot.params['id']);
  }
  openNew(id: number) {
    this.equipmentDialog = true;
    this.InstallationDate = this.datePipe.transform(this.equipmentObj.installationDate, 'yyyy-MM-dd');
    this.purchaseDat = this.datePipe.transform(this.equipmentObj.purchaseDate, 'yyyy-MM-dd');
    console.log("installationDate", this.InstallationDate);
    console.log("purchaseDate", this.purchaseDat);
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.sharedService.getAllDepartments().subscribe(data => { this.departmentsList = data });
    this.sharedService.getAllstatuses().subscribe(data => { this.statusList = data });
    this.equipmentService.getEquipmentById(id).subscribe(data => { this.equipmentObj = data });
    // this.getUsersByEquipmentId(id);
  }
  getOne() {
    //this.equipmentService.getEquipmentById()
  }
  getAll() {
    this.equipmentService.getAllEquipments().
      subscribe(data => { this.equipments = data, console.log("equipments", this.equipments) });
  }
  //    getUsersByEquipmentId(id){
  // this.userService.getUsersByEquipmentId(this.equipmentObj.id).subscribe(e=>console.log(e))
  //    }
  getHealthCareUnit(id: number) {
    this.sharedService.getAllunitsByDistrictId(id).subscribe(data => { this.CareUnits = data })
    console.log("iiiiiid", id);
  }
  getAllMasterEquipment() {
    this.masterEquipmentService.getAll().subscribe(data => { this.MasterEquipment = data, console.log("masterEquipment", this.MasterEquipment) });
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
    this.sharedService.getAllSubCategories(this.equipmentObj.equipmentCategoryId).subscribe(data => { this.subCategoriesList = data, console.log(this.subCategoriesList) });
  }
  hideDialog() {
    this.equipmentDialog = false;
    this.submitted = false;
    this.router.navigate(['home/equipmentsList']);
  }
  updateProduct(myform: NgForm) {
    this.submitted = true;
    //console.log("update")
    this.equipmentObj.installationDate = new Date(this.InstallationDate);
    this.equipmentObj.purchaseDate = new Date(this.purchaseDat);
    this.equipmentService.updateEquipment(this.equipmentObj.id, this.equipmentObj).subscribe(
      data => {
        console.log(data), this.hideDialog()
      });
  }
  Next() {
    this.index++;
    if (this.index === 3) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
    console.log("next", this.index);
  }
  Previous() {
    this.index--;
    if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }
    console.log("prev", this.index);

  }
  handleChange(e) {
    this.index = e.index;
    if (this.index === 3) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
    else if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }
    console.log("index", this.index);
  }
  checkCheckBoxvalue(event) {
    this.EpmIDs = [];
    console.log("selected111", this.selectedEmployees);
    var index = this.selectedEmployees.length;
    console.log("index", index);
    this.selectedEmployees.forEach(value => {
      this.EpmIDs.push(value.id);
    });
    //this.equipmentObj.employeeIDs = this.EpmIDs;
  }

}
