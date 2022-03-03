import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
// import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];
  filteredEquipments: Equipment[] = [];

  constructor(private equimentService: EquipmentService) {
  }

  ngOnInit() {
    this.GetAllEquipments()
  }
  GetAllEquipments() {
    this.equimentService.getAllEquipments().subscribe(data => { this.equipments = data})
  }
}
