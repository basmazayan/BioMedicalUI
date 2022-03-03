import { Component, OnInit } from '@angular/core';
import { EquipmentCoverage } from 'src/app/Shared/Models/Equipment-Coverage';
import { EquipmentCoverageService } from 'src/app/Shared/services/equipment-coverage.service';

@Component({
  selector: 'app-equipment-maintenece',
  templateUrl: './equipment-maintenece.component.html',
  styleUrls: ['./equipment-maintenece.component.css']
})
export class EquipmentMainteneceComponent implements OnInit {
  eqCoverage:EquipmentCoverage
  contractDialog:boolean
  constructor(private equipmentCoverageService:EquipmentCoverageService) { }
  ngOnInit() {
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
    this.contractDialog=true
  }
hideDialog(){
this.contractDialog=false
}

saveObject() {
  this.saveEquipmentCoverage();
}
saveEquipmentCoverage(){
  this.equipmentCoverageService.addNewEquipmentCoverage(this.eqCoverage).subscribe(data=>{this.eqCoverage=data,console.log(this.eqCoverage)})

}
}
