import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { element } from 'protractor';
import { Category } from 'src/app/Shared/Models/Category';
import { Department } from 'src/app/Shared/Models/Department';
import { Equipment, EquipmentVM, scanningDateVm, scanningequipmentVM } from 'src/app/Shared/Models/Equipment';
import { EquipmentAttachments } from 'src/app/Shared/Models/EquipmentAttachments';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { Inventory } from 'src/app/Shared/Models/Inventory';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Origin } from 'src/app/Shared/Models/Origin';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Status } from 'src/app/Shared/Models/Status';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { User } from 'src/app/Shared/Models/User';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { InventoryService } from 'src/app/Shared/services/inventory.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventories: Inventory[]
  selectedProducts: Inventory[];
  currentUser: User;
  equipmentObj: Equipment;
  Attach: EquipmentAttachments;
  equipments: Equipment[]
  healthCareUnitsList: HealthCareUnit[];
  priorityList: Priority[];
  statusList: Status[];
  districtsList: HealthDistrict[]
  manufacturerList: Manufacturer[];
  originsList: Origin[];
  categoriesList: Category[];
  departmentsList: Department[];
  suppliersList: Supplier[];
  healthDirectoriesList: healthDirectory[]
  eqscann:scanningDateVm[]
  s: string = '';
  constructor(private inventoyservice: InventoryService,
    private router: Router, private userService: UserService,
    public translate: TranslateService,
    private equipmentService: EquipmentService,
    private sharedService: SharedService,
    private datePipe: DatePipe) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    // this.inventoyservice.getAllInventories().subscribe(data=>{this.inventories=data,console.log(this.inventories)})
    this.getAll();
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.sharedService.getAllstatuses().subscribe(data => { this.statusList = data });
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data, console.log(this.categoriesList) });
    this.sharedService.getAllDepartments().subscribe(data => { this.departmentsList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data, console.log("suppliers", this.suppliersList) });
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data, console.log("healthDirectoriesList", data) });
    // this.sharedService.getAllEmployees().subscribe(data => { this.employeesList = data, console.log("employeesList",this.employeesList) });
    this.sharedService.getAllHealthDistrict().subscribe(data => { this.districtsList = data });
    this.equipmentService.getScannedDateWithequipmentsgroups().subscribe(data=>{this.eqscann=data,console.log(data)
   
    })
    console.log("currentUser", this.currentUser);
    //this.getSelectedemployees();
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
    this.Attach = {
      id: 0,
      fileName: '',
      equipmentId: 0
    }
    this.equipmentObj.employeeIDs = [];
   
  }

  openLink() {
    this.router.navigate(['/pdfCreate']);
  }
  getAll() {

    this.equipmentService.GetAllEquipmentsforinventory().
      subscribe(data => { this.equipments = data, console.log(this.equipments) })

  }
}
