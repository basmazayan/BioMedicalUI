import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { SharedService } from 'src/app/Shared/services/shared.service';

// import { Chart } from 'chartjs'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  basicData: any;
  healthUnits: HealthCareUnit[]
  basicOptions: any;
  data: any;
  equipments: Equipment[]
  suppliers: Supplier[]
  manufacturers: Manufacturer[]
  equs: number
  healthUnitsno: number
  supliersNo: number
  equipmentsNo: number
  manufacturersNo: number
  polar: any
  constructor(private equipmentService: EquipmentService,
    private sharedService: SharedService) { }
  public chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 2,
          beginAtZero: true
        }
      }]
    }
  }
  ngOnInit() {
    this.sharedService.getAllunits().subscribe(
      data => { this.healthUnits = data, this.healthUnitsno = this.healthUnits.length })

    this.sharedService.getAllSuppliers().subscribe(
      data => { this.suppliers = data, this.supliersNo = this.suppliers.length })

    this.sharedService.getAllmanufacturer().subscribe(
      data => { this.manufacturers = data, this.manufacturersNo = this.manufacturers.length })



    this.equs = 0
    this.equipmentService.getAllEquipments().
      subscribe(data => {
        this.equipments = data, this.equs = this.equipments.length, this.data = {
          labels: ['Equipments'],
          datasets: [
            {
              data: [this.equs],

              backgroundColor: [
                "#90cd93",
                "#fdd87d",
                "#61d5e4"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }],
        }, this.basicData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'request',
              backgroundColor: '#91e2ed',
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: 'work order',
              backgroundColor: '#42A5F5',
              data: [28, 48, 40, 19, 86, 27, 90]
            }
          ]
        }, this.polar = {
          datasets: [{
            data: [
              11,
              16,
              7,
              3,
              14
            ],
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ],
            label: 'My dataset'
          }],
          labels: [
            "Red",
            "Green",
            "Yellow",
            "Grey",
            "Blue"
          ]
        }, console.log("equipments", this.equs)
      });



  }
}