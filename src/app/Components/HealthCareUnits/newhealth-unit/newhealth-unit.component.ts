import { Component,NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { Organization } from 'src/app/Shared/Models/Organization';
import { SubOrganization } from 'src/app/Shared/Models/subOrganization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { SubSubOrganizationService } from 'src/app/Shared/services/sub-organization.service';
import { environment } from 'src/environments/environment';
import Request from '@arcgis/core/request';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

@Component({
  selector: 'app-newhealth-unit',
  templateUrl: './newhealth-unit.component.html',
  styleUrls: ['./newhealth-unit.component.css']
})
export class NewhealthUnitComponent implements OnInit {
  healthUnitDialog:boolean
  submitted:boolean
  healthUnitobj:HealthCareUnit
  healthDistricts:HealthDistrict[];
  subOrganizationList:SubOrganization[];
  healthDirectories:healthDirectory[];
  index:number=0;
  isNextvalid:boolean=false;
  isPrevvalid:boolean=true;
  errorDialog: boolean;
  error:string;   
  address:string;
  option:string;             
  // lat =  30.033333;
  // lng =  31.233334;
  constructor(private sharedService:SharedService,
    private subOrganizationService: SubSubOrganizationService,
    private translate:TranslateService,private ngZone: NgZone,
    private router:Router,private organizationService:OrganizationService) { }

  ngOnInit(): void {
    this.healthUnitobj={
      id:0,
      code:'',
      name:'',
      nameAr:'',
      cityId:0,
      governorateId:0,
      suborganizationId:0,
      subOrganizationName:'',
      subOrganizationNameAr:'',
      cityName:'',
      cityNameAr:'',
      governorateName:'',
      governorateNameAr:'',
      address:'',
      director:'',
      phone:'',
      mobile:'',
      email:'',
      long:31.233334,
      lat:30.033333
    }
   this.openNew()
  }
  openNew() {
    this.healthUnitDialog = true
    this.submitted = false;
   // this.sharedService.getAllHealthDistrict().subscribe(data=>{this.healthDistricts=data});
    this.sharedService.getAllHealthDirectories().subscribe(data=>{this.healthDirectories=data});
    this.subOrganizationService.getAllSubOrganization().subscribe(data=>{this.subOrganizationList=data
    });
  }
  saveHealthUnit(){
  //  this.sharedService.addNewHealthCareUnit(this.healthUnitobj).subscribe(
      //data=>{
        let graphicLayer = new GraphicsLayer();
        // (window as any)._map.add(graphicLayer);
        // (window as any)._graphicLayer = graphicLayer;
        let point = new Point({
          longitude: this.healthUnitobj.long,
          latitude: this.healthUnitobj.lat
        });
        let simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        };
        let pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol
        });
        graphicLayer.add(pointGraphic);
        const features: any =
      {
        responseType: 'html',
        method:'Post',
        "attributes": {
          "EST_NAME": this.healthUnitobj.nameAr,
          "GOV_NAME":  this.healthUnitobj.governorateNameAr,
          "EDARA_NAME": this.healthUnitobj.cityNameAr,
          "COD": this.healthUnitobj.code,
          "CityCode": "212111",
          "ESTEng_NAME": this.healthUnitobj.name,
          "GOVEng_NAME": this.healthUnitobj.governorateName,
          "EDAEng_NAME": this.healthUnitobj.cityName,
        },
        "geometry": {
          "x": this.healthUnitobj.long,
          "y": this.healthUnitobj.lat
        }
      };
      this.option = features;
      let url = environment.arcgisServerUrl + 'healthAPP/FeatureServer/0/addFeatures';
      let options: any = {
        feature: features,
        Format: JSON
      }
      Request(url, this.option).then(response => {
        console.log("result",response)
        this.router.navigate(['/home/healthUnitsList'])
      },
        error => {
          console.log("error",error)
        }
      );
    //  }, 
      // error=>{
      //   this.errorDialog=true,
      //   this.error=error.error.message;
        
      // }
      //);
    
  }
  hideDialog(){
    this.healthUnitDialog = false
    this.router.navigate(['/home/healthUnitsList'])
  }
  loadDistricts(DirectoryId:number)
  {
    this.sharedService.getAllHealthDistricts(DirectoryId).subscribe(data => { this.healthDistricts = data});
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
  mapClicked(event)
  {
    this.healthUnitobj.lat = event.coords.lat;
    this.healthUnitobj.long = event.coords.lng;
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(this.healthUnitobj.lat, this.healthUnitobj.long);
    const request: google.maps.GeocoderRequest = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        this.address = results[0].formatted_address;
        this.healthUnitobj.address = this.address;
      });
    });
  }

}
