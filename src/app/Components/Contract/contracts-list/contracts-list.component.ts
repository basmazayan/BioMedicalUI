import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { Contract } from 'src/app/Shared/Models/Contract';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { EquipmentCoverage } from 'src/app/Shared/Models/Equipment-Coverage';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { SparePart } from 'src/app/Shared/Models/SparePart';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { EquipmentCoverageService } from 'src/app/Shared/services/equipment-coverage.service';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { SparePartsService } from 'src/app/Shared/services/spare-parts.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit,OnDestroy {
  contractObj: Contract;
  contracts: Contract[];
  selectedContracts: Contract[];
  contractDialog: boolean;
  eqCoverage: EquipmentCoverage;
  manufacturerList: Manufacturer[]
  suppliersList: Supplier[]
  healthCareUnitsList: HealthCareUnit[]
  sparePartsList: SparePart[]
  equipmentList: Equipment[]
  submitted: boolean;
  eqCovrageDialog:boolean
  contractsList: Contract[];
  contractsObgs:any;
  lstIDS=[];
  index:number=0;
  isNextvalid:boolean=false;
  isPrevvalid:boolean=true;

  constructor(private contractService: ContractService,
    private translate: TranslateService,
    private router: Router,
    private sharedService: SharedService,
    private sparePartService: SparePartsService,
   private equipmentCoverageService:EquipmentCoverageService,
    private equipmentService: EquipmentService) { }
  ngOnDestroy(): void {
    this.contractsObgs.unsubscribe()
    console.log("unsub")
  }

  ngOnInit() {
    this.contractObj = {
      id: 0,
      contents: '',
      endDate: new Date,
      healthCareUnitId: 0,
      startDate: new Date,
      subject: '',
      supplierId: 0,
      supplierName:'',
      supplierNameAr:'',
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
   this.contractsObgs  =this.contractService.getAllContracts().subscribe(data => { this.contracts = data })
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data });
    this.sparePartService.getAllSpareParts().subscribe(data => {
      this.sparePartsList = data,
      console.log("SPAREpART", this.sparePartsList)
    })
    this.equipmentService.getAllEquipments().subscribe(data => { this.equipmentList = data })
  }

  deleteContract(contractId) {
    this.contractService.deleteContract(contractId).subscribe(data => { this.contractObj = data, this.getAllContract(),console.log(this.contractObj, "deleted") })
 

  }
  openNew(conObj, EqCoverageObg) {

    this.contractObj = conObj
    this.eqCoverage = EqCoverageObg
    console.log(this.contractObj, this.eqCoverage, "objs")

    this.contractDialog = true;
    this.submitted = false;
  }
  hideDialog() {
    this.contractDialog = false;
  
  }
  updateContract() {
    this.submitted = true;
    this.contractDialog = false
    this.contractService.updateContract(this.contractObj.id, this.contractObj).subscribe(data => {this.hideDialog(), console.log(this.contractObj) })
  
  }
  saveObject() {
    this.saveEquipmentCoverage();
  }
  saveEquipmentCoverage(){
    this.equipmentCoverageService.addNewEquipmentCoverage(this.eqCoverage).subscribe(data=>{this.eqCoverage=data,console.log(this.eqCoverage)})
    console.log("lstIDS",this.lstIDS)
  }
  addEqContract(){
    this.eqCovrageDialog = true
  }
  getAllContract(){
    this.contractService.getAllContracts().subscribe(data => { this.contractsList = data, console.log("contract", this.contractsList)  });
  }
  Next()
  {
     this.index++;
     if(this.index==1)
     {
       this.isNextvalid=true;
       this.isPrevvalid=false;
     }
    else
    {
      this.isNextvalid=false;
      this.isPrevvalid=false;
    }
    console.log("indexNext",this.index);
  }
   Previous()
   {
      this.index--;
      if(this.index==0)
      {
        this.isNextvalid=false;
        this.isPrevvalid=true;    
      }   
      else
      {
        this.isNextvalid=false;
        this.isPrevvalid=false;
      } 
      console.log("indexPrev1",this.index);
   }
   handleChange(e) {
     this.index = e.index;
     if(this.index==1)
     {
       this.isNextvalid=true;
       this.isPrevvalid=false;
     }
     else if(this.index==0)
     {
       this.isNextvalid=false;
       this.isPrevvalid=true;
       console.log("Zeeero",this.index);
     }
    else
    { this.isNextvalid=false;
      this.isPrevvalid=false;
    }
     console.log("index from onchange tab",this.index);
   }
}
