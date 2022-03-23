import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { SharedService } from 'src/app/Shared/services/shared.service';

@Component({
  selector: 'app-new-manufacturer',
  templateUrl: './new-manufacturer.component.html',
  styleUrls: ['./new-manufacturer.component.css']
})
export class NewManufacturerComponent implements OnInit {
  manufacturer:Manufacturer;
  manufacturerDialog:boolean;
  submitted:boolean;
  error:string;
  errorDisplay:boolean=false;

  constructor(private sharedService:SharedService,private router:Router) { }

  ngOnInit() {
    this.manufacturer = {
      id: 0,
      name: '',
      nameAr: '',
      code:''
    }
    this.openNew()
  }

  openNew() {
    this.manufacturerDialog = true
    this.submitted = false;
  }

  hideDialog() {
    this.manufacturerDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/Manfacturers/'])
  }

  saveManufacturer() {
    this.submitted = true;
    this.addManufacturer();
  }

  addManufacturer() {
    this.sharedService.addNewManufacturer(this.manufacturer).subscribe(
      data => {
        this.router.navigate(['/home/Manfacturers/']) 
    }
      ,error=>{
        this.errorDisplay=true;
        this.error=error.error.message;
      });
  }
}
