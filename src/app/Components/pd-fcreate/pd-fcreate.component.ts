import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BrandVM, CityVM, Equipment, filterDto, GovernorateVM, HospitalVM, OrganizationVM, SupplierVM } from 'src/app/Shared/Models/Equipment';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { TranslateService } from '@ngx-translate/core';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { UserService } from 'src/app/Shared/services/user.service';
import { User } from 'src/app/Shared/Models/User';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './../../../assets/fonts/Cairo-Regular-normal.js';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';
import { relative } from 'path';

@Component({
  selector: 'app-pd-fcreate',
  templateUrl: './pd-fcreate.component.html',
  styleUrls: ['./pd-fcreate.component.css']
})
export class PdFCreateComponent implements OnInit {

  public rightAlign: object = {
    'text-align': 'right'
  };

  @ViewChild('header') header: ElementRef;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  equipments: Equipment[];
  equipmentObj: Equipment;
  healthCareUnitsList: HealthCareUnit[];
  healthCareUnits: HealthCareUnit[];
  EquipmentHospitalList: HospitalVM[];
  filteredObj: filterDto;
  EquipmentGovList: GovernorateVM[];
  EquipmentCityList: CityVM[];
  EquipmentOrgList: OrganizationVM[];
  EquipmentSupplierList: SupplierVM[];
  CareUnits: HealthCareUnit[];
  manufacturerList: Manufacturer[];
  suppliersList: Supplier[];
  healthDirectoriesList: healthDirectory[];
  HealthDistrictsList: HealthDistrict[];
  districtsList: HealthDistrict[];
  currentUser: User;
  districts: Equipment[];
  manufacturerList2: Manufacturer[];
  Lang: any;
  href: any;
  imgUrl: string;
  equipmentElements: any[];
  equipmentElementsAr: any;
  masterEquipmentList: MasterEquipment[];
  selectedElement: string;
  lstBrandEquipment: BrandVM[];
  newRows: string[];
  temp: string[];
  errorMsg: string;
  toggle: boolean = false;
  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  toggle4: boolean = false;
  newLang: any;
  newEquipmentList: Equipment[];
  constructor(private equipmentService: EquipmentService,
    private router: Router,
    private sharedService: SharedService,
    public translate: TranslateService,
    private masterEquipmentService: MasterequipmentService,
    private userService: UserService, private datepipe: DatePipe) {
    this.currentUser = this.userService.currentUserValue;
    translate.addLangs(['En', 'Ar']);
    localStorage.setItem("lang", "En");
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/En|Ar/) ? browserLang : 'En');
    translate.setDefaultLang('En');
  }

  ngOnInit(): void {
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data });
    this.sharedService.getAllHealthDistrict().subscribe(data => { this.districtsList = data });
    this.getAll();
    this.equipmentElements = ["Brand", "Governorate", "District", "Hospital", "Organization", "Supplier"];
    this.equipmentElementsAr = ["الصانع", "المحافظه", "المدينه", "الوحده الصحيه", "المنظمه", "المورد"];

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
      time:'',
      recallNumber:0,
      recallDate:new Date(),
      organizationId:0,
   
      contractRequestId:0,
      organizationrequestid:0,
      contractid:0,
      DepreciationRate:0
    }

    this.filteredObj = {
      id: 0,
      name: '',
      brandName: '',
      cityName: '',
      hosName: '',
      govName: '',
      supplierName: '',
      purchaseDate: null
    }
    document.getElementById('clcbtn').style.display = "none";
    document.getElementById("clcgroupingbtn").style.display = "none";
  }

  getAll() {
    this.equipmentService.getAllEquipments().subscribe(data => { this.equipments = data, this.newEquipmentList = data });

  }
  fillDistrict(name: string) {
    this.sharedService.getDirectoryIdByname(name).subscribe(data => {
      this.sharedService.getAllHealthDistricts(data).subscribe(data => {
        this.HealthDistrictsList = data
      });
    });

  }
  fillHospital(name: string) {
    this.sharedService.GetHealthDistrictsIdbyName(name).subscribe(data => {
      this.sharedService.getAllunitsByDistrictId(data).subscribe(data => {
        this.healthCareUnits = data;
      })
    })
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


  exportPdf() {
    //var tble = document.getElementById('pdfTable')
    this.equipments = []
    let PDF = new jsPDF('p', 'mm', [297, 250]);
    PDF.addFont("../assets/fonts/ARIALUNI.TTF", "ARIALUNI", "normal");
    PDF.setFont('ARIALUNI');
    var img = new Image();
    img.src = '../assets/images/biologo.png';
    if (this.translate.currentLang == "En") {
      PDF.addImage(img, 'png', 10, 10, 23, 23)
      PDF.text("Equipments", 50, 25);
    }
    else if (this.translate.currentLang == "Ar") {
      PDF.addImage(img, 'png', 210, 10, 23, 23)
      PDF.text("الآلات", 180, 25);
    }
    var y = 0;
    var rows = [];
    this.newRows = [];
    if (this.selectedElement === "Brand" || this.selectedElement === "الصانع") {
      this.lstBrandEquipment.forEach(elem => {
        if (elem.listEquipment.length > 0) {
          if (this.translate.currentLang == "En") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
              this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `Brand : ${elem.brandName}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, font: 'ARIALUNI', }],
              ["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' },
            });
            rows = [];
          }
          else if (this.translate.currentLang == "Ar") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.organizationName, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr, equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `الصانع : ${elem.brandNameAr}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
              ["المنظمه", "تاريخ الشراء", "الصانع", "الوحدهالصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }

        }
      });
      PDF.save("table.pdf");
    }

    else if (this.selectedElement === "Hospital" || this.selectedElement === "الوحده الصحيه") {
      this.EquipmentHospitalList.forEach(elem => {
        if (elem.listEquipment.length > 0) {
          if (this.translate.currentLang == "En") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
              this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `Hospital : ${elem.name}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, font: 'ARIALUNI', }],
              ["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
          else if (this.translate.currentLang == "Ar") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.organizationNameAr, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr,
              equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `الوحده الصحيه : ${elem.nameAr}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
              ["المنظمه", "تاريخ الشراء", "الصانع", "الوحده الصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
        }
      });
      PDF.save("table.pdf");
    }

    else if (this.selectedElement === "Governorate" || this.selectedElement === "المحافظه") {
      this.EquipmentGovList.forEach(elem => {
        if (elem.listEquipment.length > 0) {
          if (this.translate.currentLang == "En") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
              this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `Governorate : ${elem.name}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, font: 'ARIALUNI', }],
              ["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
          else if (this.translate.currentLang == "Ar") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.organizationName, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr,
              equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `المحافظه : ${elem.nameAr}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
              ["المنظمه", "تاريخ الشراء", "الصانع", "الوحده الصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
        }
      });
      PDF.save("table.pdf");
    }
    else if (this.selectedElement === "District" || this.selectedElement === "المدينه") {
      this.EquipmentCityList.forEach(elem => {
        if (elem.listEquipment.length > 0) {
          if (this.translate.currentLang == "En") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
              this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `District : ${elem.name}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, font: 'ARIALUNI', }],
              ["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
          else if (this.translate.currentLang == "Ar") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.organizationName, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr,
              equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `المدينه : ${elem.nameAr}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
              ["المنظمه", "تاريخ الشراء", "الصانع", "الوحده الصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
        }
      });
      PDF.save("table.pdf");
    }
    else if (this.selectedElement === "Organization" || this.selectedElement === "المنظمه") {
      this.EquipmentOrgList.forEach(elem => {
        if (elem.listEquipment.length > 0) {
          if (this.translate.currentLang == "En") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
              this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `Organization : ${elem.name}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, font: 'ARIALUNI', }],
              ["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
          else if (this.translate.currentLang == "Ar") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.organizationName, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr,
              equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `المنظمه : ${elem.nameAr}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
              ["المنظمه", "تاريخ الشراء", "الصانع", "الوحده الصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
        }
      });
      PDF.save("table.pdf");
    }
    else if (this.selectedElement === "Supplier" || this.selectedElement === "المورد") {
      this.EquipmentSupplierList.forEach(elem => {
        if (elem.listEquipment.length > 0) {
          if (this.translate.currentLang == "En") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
              this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `Supplier : ${elem.name}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, font: 'ARIALUNI', }],
              ["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' }
            });
            rows = [];
          }
          else if (this.translate.currentLang == "Ar") {
            elem.listEquipment.forEach(equip => {
              this.temp = [equip.organizationName, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr,
              equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
              rows.push(this.temp);
            });
            (PDF as any).autoTable({
              head: [[{ content: `المورد : ${elem.nameAr}`, colSpan: 8, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
              ["المنظمه", "تاريخ الشراء", "الصانع", "الوحده الصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
              startY: y += 40,
              body: rows,
              styles: { font: 'ARIALUNI' },
            });
            rows = [];
          }
        }
      });
      PDF.save("table.pdf");
    }
    else {
      if (this.filteredObj.name != null) {
        this.filterByName(this.filteredObj.name);
      }
      if (this.filteredObj.brandName != null) {
        this.filterByBrand(this.filteredObj.brandName);
      }
      if (this.filteredObj.govName != null) {
        this.filterByGov(this.filteredObj.govName);
      }
      if (this.filteredObj.cityName != null) {
        this.filterByCity(this.filteredObj.cityName);
      }
      if (this.filteredObj.hosName != null) {
        this.filterByHos(this.filteredObj.hosName);
      }
      if (this.filteredObj.supplierName != null) {
        this.filterBySupplier(this.filteredObj.supplierName);
      }
      if (this.filteredObj.purchaseDate != null) {
        this.filterByPurchaseDate(this.filteredObj.purchaseDate);
      }
      if (this.newEquipmentList.length > 0) {
        if (this.translate.currentLang == "En") {
          this.newEquipmentList.forEach(equip => {
            this.temp = [equip.equipmentName, equip.manufacturerName, equip.healthDirectoryName, equip.healthDistrictName, equip.healthCareUnitName, equip.supplierName,
            this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.organizationName];
            rows.push(this.temp);
          });
          (PDF as any).autoTable({
            head: [["Name", "Brand", "Governorate", "District", "Hospital", "Supplier", "Purchase Date", "Organization"]],
            startY: y += 40,
            body: rows,
            styles: { font: 'ARIALUNI' }
          });
          rows = [];
        }
        else if (this.translate.currentLang == "Ar") {
          this.newEquipmentList.forEach(equip => {
            this.temp = [equip.organizationName, this.datepipe.transform(equip.purchaseDate, 'yyyy-MM-dd'), equip.supplierNameAr,
            equip.healthCareUnitNameAr, equip.healthDistrictNameAr, equip.healthDirectoryNameAr, equip.manufacturerNameAr, equip.equipmentNameAr];
            rows.push(this.temp);
          });
          (PDF as any).autoTable({
            head: [["المنظمه", "تاريخ الشراء", "الصانع", "الوحده الصحيه", "المدينه", "المحافظه", "الصانع", "الاسم"]],
            startY: y += 40,
            body: rows,
            styles: { font: 'ARIALUNI' }
          });
          rows = [];
        }
        PDF.save("table.pdf");
      }
    }
  }
  filterByName(elem) {
    this.filteredObj.name = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  filterByBrand(elem) {
    this.filteredObj.brandName = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  filterByGov(elem) {
    this.filteredObj.govName = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  filterByCity(elem) {
    this.filteredObj.cityName = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  filterByHos(elem) {
    this.filteredObj.hosName = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  filterBySupplier(elem) {
    this.filteredObj.supplierName = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  filterByPurchaseDate(elem) {
    if (elem != "") {
      document.getElementById('clcbtn').style.display = "block";
      document.getElementById('clcbtn').style.marginTop = "-1.2rem";
      document.getElementById('clcbtn').style.marginLeft = "6rem";
    }
    this.filteredObj.purchaseDate = elem;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  checkValue() {
   // console.log("vaaal",$('#installationDate').val())
    $('#installationDate').val("");
    document.getElementById('clcbtn').style.display = "none";
    this.filteredObj.purchaseDate = null;
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newEquipmentList = this.equipments;
    });
  }
  checkGroupingValue() {
    // $('#equipElementtt').val("--select--")
    document.getElementById('clcgroupingbtn').style.display = "none";
    this.selectedElement = null
    this.equipmentService.FilterData(this.filteredObj).subscribe(data => {
      this.equipments = data;
      this.newEquipmentList = this.equipments;
      console.log("this.newEquipmentList", this.newEquipmentList);
    });
  }
  openLink() {
    window.open("http://localhost:4200/home/pdfCreate");
  }
  switchLang(lang: string) {
    console.log("this.translate.currentLang", lang);
    localStorage.setItem('lang', lang)
    this.Lang = lang;
    this.href = this.router.url;
    this.translate.use(lang);
    if (lang== "En") {
      document.getElementById('clcgroupingbtn').style.marginLeft = "-5rem";
    }
    else if (lang == "Ar") {
      document.getElementById('clcgroupingbtn').style.marginRight = "10rem";
    }
  }

  selectElement(elem) {
    this.selectedElement = elem;
    if (elem != "") {
        document.getElementById('clcgroupingbtn').style.display = "block";
        document.getElementById('clcgroupingbtn').style.marginTop = "0.3rem";
        document.getElementById('clcgroupingbtn').style.zIndex = "1";
        document.getElementById('clcgroupingbtn').style.marginLeft = "-5rem";
    }
    //document.getElementById('clcgroupingbtn').style.display = "none";
    console.log("this.selectElement", this.selectedElement);
    if (elem === "Brand" || elem === "الصانع") {
      this.masterEquipmentService.getMasterByBrand(this.equipments).subscribe(data => {
        this.lstBrandEquipment = data;
      })
    }
    else if (elem === "Hospital" || elem === "الوحده الصحيه") {
      this.equipmentService.GetAllByHospital(this.equipments).subscribe(data => {
        this.EquipmentHospitalList = data;
      });
    }
    else if (elem === "Governorate" || elem === "المحافظه") {
      this.equipmentService.GetEquipmentsOnGovernorate(this.equipments).subscribe(data => {
        this.EquipmentGovList = data;
      });
    }
    else if (elem === "District" || elem === "المدينه") {
      this.equipmentService.GetEquipmentsOnDistrict(this.equipments).subscribe(data => {
        this.EquipmentCityList = data;
      });
    }
    else if (elem === "Organization" || elem === "المنظمه") {
      this.equipmentService.GetEquipmentsOnOrganization(this.equipments).subscribe(data => {
        this.EquipmentOrgList = data;
      });
    }
    else if (elem === "Supplier" || elem === "المورد") {
      this.equipmentService.GetEquipmentsOnSupplier(this.equipments).subscribe(data => {
        this.EquipmentSupplierList = data;
      });
    }
    else {

    }
  }
}

