import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';
import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';
import { Contract } from 'src/app/Shared/Models/Contract'
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { EquipmentCoverage } from 'src/app/Shared/Models/Equipment-Coverage';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { SparePartsService } from 'src/app/Shared/services/spare-parts.service';
import { EquipmentCoverageService } from 'src/app/Shared/services/equipment-coverage.service';
import { SparePart } from 'src/app/Shared/Models/SparePart';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { EquipmentMainteneceComponent } from '../equipment-maintenece/equipment-maintenece.component';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { Router } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.css']
})

export class SlaComponent implements OnInit {
  header: string = 'Service Level Agreement'
  MasterEquipments: MasterEquipment[];
  contractObj: Contract;
  uploadedFiles: any[] = [];
  manufacturerList: Manufacturer[];
  suppliersList: Supplier[];
  healthCareUnitsList: HealthCareUnit[];
  eqCoverage: EquipmentCoverage;
  contractsList: Contract[];
  lstIDS=[]
  sparePartsList: SparePart[];
  equipmentList:Equipment[];
  selectedEquipments:Equipment[];
  contractDialog:boolean;
  eqCovrageDialog:boolean;
  index:number=0;
  isNextvalid:boolean=false;
  isPrevvalid:boolean=true;
  constructor(private masterEquipmentService: MasterequipmentService,
    private sharedService: SharedService,
    private translate: TranslateService,
    private contractService: ContractService,
    private sparePartService: SparePartsService,
    private equipmentCoverageService:EquipmentCoverageService,
    private equipmentService:EquipmentService,
    private router:Router
    ) {
  }

  ngOnInit() {
    this.contractObj = {
      id: 0,
      endDate: new Date,
      subject: '',
      healthCareUnitId: 0,
      startDate: new Date,
      supplierId: 0,
      supplierName:'',
      supplierNameAr:'',
      contents:'',
      number:0,
      equipmentIDs:[]
    }
    this.eqCoverage = {
      equipmentCoverageId: 0,
      contractId: 0,
      description: '',
      descriptionAr: '',
      equipmentsIDs: [],
      numberOfVisits: 0,
      responseTime: 0,
      sparePartId: 0
    }

    this.eqCovrageDialog=false
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.masterEquipmentService.getAll().subscribe(data => { this.MasterEquipments = data });
    this.contractService.getAllContracts().subscribe(data => { this.contractsList = data, console.log("contract", this.contractsList)  });
    this.sparePartService.getAllSpareParts().subscribe(data => { this.sparePartsList = data, 
      console.log("SPAREpART", this.sparePartsList) 
    })
    this.equipmentService.getAllEquipments().subscribe(data=>{this.equipmentList=data})
    this.openNew();
  }
  //  exportPdf(){
  //    console.log("download")
  //  }
  

  exportPdf(action = 'open') {
    let docDefinition = {
      header: this.header,
      content: [
        // Previous Configuration  
        {
          text: 'S.L.A',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        }
        , {
          ul: [
            'This contract agreement for Equipment Maintenance services between _____________ (hereafter referred to as Client and ______________ (hereafter referred to as "Contractor") is made and entered into upon the following date: ____/____/____.<br> The following equipment shall be maintained:<br>',
            'The Client owns or has legal control of the above mentioned equipment and it is hereby incorporated into this    Maintenance Agreement by reference.  Under this agreement the Client would like the Equipment to be maintained in good working order. Such   required     level of maintenance services will include periodic inspections that are routine along with scheduled  repairs and the replacement of parts on an as needed basis. Emergency repairs will also be made when necessary whenever the Equipment becomes inoperable unexpectedly. The Contractor is in the business of providing equipment maintenance services, and hereby agrees to provide the following maintenance services to Client:',

          ],

        },
        {
          text: 'Equipment Schedules',
          fontSize: 16,
          alignment: 'left',

        },
        {
          text: 'All of the Equipment described above shall be inspected and repaired on a regular basis, as suggested by the Equipments maintenance manual supplied by the manufacturer for each specific piece of equipment.',
          fontSize: 14,
          alignment: 'left',
          color: '#495057'
        },
        {
          text: 'Speed of Response',
          fontSize: 16,
          alignment: 'left',

        },
        {
          text: 'The Contractor shall respond to any of Clients requests for Emergency repairs  within _____ hours of receiving a request from Client.',
          fontSize: 14,
          alignment: 'left',
          color: '#495057'
        },
        {
          text: 'Trust',
          fontSize: 16,
          alignment: 'left',

        },
        {
          text: 'Contractor shall make sure that all services that are provided under the terms of this agreement are to be performed by properly trained and certified individuals. The before mentioned employees shall be Certified by an accredited school or official manufacturer training program.',
          fontSize: 14,
          alignment: 'left',
          color: '#495057'
        },
        {
          text: 'Techniciens Qualifications',
          fontSize: 16,
          alignment: 'left',

        },
        {
          text: 'Contractor also certifies that all employees that will be maintaining Clients Equipment are legally eligible to work in the United States and that the Contractor is in compliance with all Federal and State wage and employment laws and with any additional applicable laws and regulations that are required administer the above mentioned services to the Client.',
          fontSize: 14,
          alignment: 'left',
          color: '#495057'
        },
      ],


    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    } 
  }

  upload(event) {
    for (let file of event.files) {
      console.log(event)
      this.uploadedFiles.push(file);
    }
  }
  saveObject() {
    this.saveEquipmentCoverage();
  }
  saveEquipmentCoverage(){
    this.equipmentCoverageService.addNewEquipmentCoverage(this.eqCoverage).subscribe(data=>{this.eqCoverage=data,console.log(this.eqCoverage)})
    console.log("lstIDS",this.lstIDS)
  }
  saveContract(){
    this.contractService.addNewContract(this.contractObj).subscribe(data=>{this.contractObj=data,console.log("contract",this.contractObj)})  
  //   this.router.navigateByUrl('/home/sla/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/contractsList/']);
  // });
  }
  getAllContract(){
    this.contractService.getAllContracts().subscribe(data => { this.contractsList = data, console.log("contract", this.contractsList)  });

  }
  openNew(){
    this.contractDialog=true
  }

  hideDialog()
  {
    this.contractDialog=false;
    this.router.navigate(['/home/contractsList/'])
  }
  addEqcoverage(){
    this.eqCovrageDialog=true
  }
  Next()
 {
    this.index++;
    if(this.index===1)
    {
      this.isNextvalid=true;
      this.isPrevvalid=false;
    }
 }
  Previous()
  {
     this.index--;
     if(this.index===0)
     {
       this.isNextvalid=false;
       this.isPrevvalid=true;    
     }        
  }
  handleChange(e) {
    this.index = e.index;
    if(this.index===1)
    {
      this.isNextvalid=true;
      this.isPrevvalid=false;
    }
    else if(this.index===0)
    {
      this.isNextvalid=false;
      this.isPrevvalid=true;
    }
  }
}