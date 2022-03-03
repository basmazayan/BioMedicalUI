import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { EquipmentRecall } from 'src/app/Shared/Models/equipment-recall';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { User } from 'src/app/Shared/Models/User';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { UserService } from 'src/app/Shared/services/user.service';
import { Organization } from 'src/app/Shared/Models/Organization';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './../../../../assets/fonts/Cairo-Regular-normal.js';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-equipment-recall',
  templateUrl: './equipment-recall.component.html',
  styleUrls: ['./equipment-recall.component.css']
})
export class EquipmentRecallComponent implements OnInit {
  currentUser: User;
  equipments: Equipment[];
  supequipments: Equipment[];
  hospitals: Equipment[];
  masterEquipment: MasterEquipment[];
  recallObj: EquipmentRecall;
  suppliersList: Supplier[];
  suppliers: Equipment[];
  healthCareUnitsList: HealthCareUnit[]
  organizations: Organization[];
  adminList: Equipment[];
  orgs: Equipment[];
  newRows: string[];
  temp: any[];
  constructor(private userService: UserService,
    public translate: TranslateService,
    private equipmentService: EquipmentService,
    private masterEquipmentService: MasterequipmentService,
    private sharedService: SharedService,
    private organizationService: OrganizationService,
    private router: Router,
    private messageService: MessageService,
    private datepipe: DatePipe) { this.currentUser = this.userService.currentUserValue; }

  ngOnInit(): void {
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.organizationService.getAllOrganization().subscribe(data => { this.organizations = data })
    this.recallObj = {
      id: 0,
      masterEquipmentId: 0,
      recallDate: new Date(),
      recallNumber: 0,
      recallSubject: '',
      modelNumber: 0,
      versionNumber: 0,
      description: '',
      equipmentsIDs: [],
      supplierId: 0
    }

    this.hospitals = []
    this.suppliers = [];
    this.orgs = []
    this.getAll();
    this.masterEquipmentService.getAll().subscribe(data => {
      this.masterEquipment = data;
      //console.log("masterEquipment", this.masterEquipment) 
    });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data })
  }
  saveProduct(myform: NgForm) {
    this.recallObj.supplierId = this.currentUser.supplierId
    console.log(myform)
    this.equipmentService.addEquipmentRecall(this.recallObj).subscribe(data => {
      if (this.translate.currentLang == 'En') {
        this.messageService.add({ severity: 'info', detail: 'Equipment Recall Request saved successfully' });


      }
      else {
        this.messageService.add({ severity: 'info', detail: 'تم إضافة الطلب بنجاح' });

      }

    });
    this.recallObj = {
      id: 0,
      masterEquipmentId: 0,
      recallDate: new Date(),
      recallNumber: 0,
      recallSubject: '',
      modelNumber: 0,
      versionNumber: 0,
      description: '',
      equipmentsIDs: [],
      supplierId: 0
    }

    console.log("yomna")
  }
  exportPdf() {
    //var tble = document.getElementById('pdfTable')

    let PDF = new jsPDF('p', 'mm', [297, 250]);
    PDF.addFont("../assets/fonts/ARIALUNI.TTF", "ARIALUNI", "normal");
    PDF.setFont('ARIALUNI');
    var img = new Image();
    img.src = '../assets/images/biologo.png';
    if (this.translate.currentLang == "En") {
      PDF.addImage(img, 'png', 10, 10, 23, 23)
      PDF.text("Recalled Equipments", 50, 25);
    }
    else if (this.translate.currentLang == "Ar") {
      PDF.addImage(img, 'png', 210, 10, 23, 23)
      PDF.text("الآلات المستدعاه", 180, 25);
    }
    var y = 0;
    var rows = [];
    this.newRows = [];

    if (this.equipments.length > 0) {
      if (this.translate.currentLang == "En") {
        this.equipments.forEach(equip => {
          this.temp = [equip.supplierName, equip.recallNumber,
          this.datepipe.transform(equip.recallDate, 'yyyy-MM-dd'),
          equip.manufacturerName,equip.equipmentName,equip.modelNumber,equip.versionNumber,
          equip.serialNumber,equip.healthCareUnitName,
          equip.organizationName];
          rows.push(this.temp);
        });
        (PDF as any).autoTable({
          head: [[
            {
            content: "", colSpan: 10, styles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0]
            }, font: 'ARIALUNI',
          }],
          ["Supplier Name", "Recall Number", "Recall Date", "Brand", "Equipment Name",
           "model #", "version #", "Serial #", "Hospital", "Organization"]],
          startY: y += 40,
          body: rows,
          styles: { font: 'ARIALUNI' },
        });
        rows = [];
      }
      else if (this.translate.currentLang == "Ar") {
        this.equipments.forEach(equip => {
          this.temp = [equip.supplierNameAr, equip.recallNumber,
            this.datepipe.transform(equip.recallDate, 'yyyy-MM-dd'),
            equip.manufacturerNameAr,equip.equipmentNameAr,equip.modelNumber,equip.versionNumber,
            equip.serialNumber,equip.healthCareUnitNameAr,
            equip.organizationNameAr];
          rows.push(this.temp);
        });
        (PDF as any).autoTable({
          head: [[{ content: "", colSpan: 10, styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'right' }, font: 'ARIALUNI', }],
          ["المنظمه", "المستشفي ", "الرقم المتسلسل", "رقم الاصدار", "رقم الموديل", "الاسم ", "الصانع", "تاريخ الطلب","رقم الطلب", "المورد"]],
          startY: y += 40,
          body: rows,
          styles: { font: 'ARIALUNI' }
        });
        rows = [];
      }

    }
    ;
    PDF.save("table.pdf");





  }
  getAll() {
    if (this.currentUser.roleName == 'Admin') {
      this.adminList = [];
      this.equipmentService.GetAllRecalledEquipments().
        subscribe(data => {
          this.equipments = data, console.log(this.equipments)


        })
    }

    if (this.currentUser.roleName == 'Supplier') {
      this.equipmentService.GetAllRecalledEquipments().
        subscribe(data => {
          this.equipments = data, console.log(this.equipments)
          this.equipments.forEach(element => {
            if (element.supplierId == this.currentUser.supplierId) {
              this.suppliers.push(element)
            }
            if (this.currentUser.roleName == 'Supplier') {
              this.equipments = this.suppliers
              console.log(this.suppliers)
            }
          });
        })
    }
    if (this.currentUser.roleName == 'Organization') {
      console.log(this.currentUser)
      console.log("Organization")
      this.equipmentService.GetAllRecalledEquipments().
        subscribe(data => {
          this.equipments = data,
            this.equipments.forEach(element => {
              if (element.organizationId == this.currentUser.organizationId) {
                this.orgs.push(element)
              }
              if (this.currentUser.roleName == 'Hospital') {
                this.equipments = this.orgs
                console.log(this.orgs)
              }
            })
        });
    }

    if (this.currentUser.roleName == 'Hospital') {
      console.log(this.currentUser)
      console.log("hospital")
      this.equipmentService.GetAllRecalledEquipments().
        subscribe(data => {
          this.equipments = data,
            this.equipments.forEach(element => {
              if (element.healthCareUnitId == this.currentUser.healthCareUnitId) {
                this.hospitals.push(element)
              }
              if (this.currentUser.roleName == 'Hospital') {
                this.equipments = this.hospitals
                console.log(this.hospitals)
              }
            })
        });
    }




  }
  getEquipments(id: number) {
    this.suppliers = []
    this.supequipments = []
    console.log("uni", this.supequipments, "sub", this.suppliers)
    console.log("oooo", this.recallObj)
    if (this.currentUser.roleName == 'Supplier')
      this.equipmentService.GetAllBymaster(id).
        subscribe(data => {
          this.supequipments = data, console.log(this.supequipments)

          this.supequipments.forEach(element => {
            console.log(this.currentUser.supplierId, element.supplierId)
            if (element.supplierId == this.currentUser.supplierId) {
              this.suppliers.push(element)
              console.log(this.suppliers)
            }
            if (this.currentUser.roleName == 'Supplier') {
              this.supequipments = this.suppliers
              console.log(this.suppliers)
            }
          });
        })
  }
  // checkCheckBoxvalue(event){
  //   var index = this.recallObj.equipmentsIDs.length;
  //   if (event.value.length === index + 1) {
  //     if (event.itemValue.id === event.value[index].id) {
  //       this.recallObj.equipmentsIDs.push(event.value[index].id);
  //       //     console.log("after push", this.equipmentObj.employeeIDs);
  //     }
  //   }
  //   else {
  //     var ind = this.recallObj.equipmentsIDs.indexOf(event.itemValue.id);
  //     this.recallObj.equipmentsIDs.splice(ind, 1);
  //     //   console.log("after remove", this.equipmentObj.employeeIDs);

  // }
  // }
}
