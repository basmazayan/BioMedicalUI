import { Component, NgZone, OnInit } from '@angular/core';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import Compass from '@arcgis/core/widgets/Compass';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import { MenuItem } from 'primeng/api';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { FeaturesMapService } from 'src/app/Shared/services/features-map.service';
import { modelIDsViewModel } from 'src/app/Shared/Models/modelIDsViewModel';
import { GetStaticApiService } from 'src/app/Shared/services/get-static-api.service';
import Request from '@arcgis/core/request';
import esriConfig from '@arcgis/core/config.js';
import Graphic from "@arcgis/core/Graphic";
import Point from '@arcgis/core/geometry/Point';
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer"
import { loadModules } from 'esri-loader';
import esri = __esri;
import { environment } from 'src/environments/environment';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { dateVM } from 'src/app/Shared/Models/dateVM';

// import * as L from 'leaflet';
// import 'esri-leaflet';
// import * as enFunc from '../../../../../assets';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  view: MapView;
  map: Map;
  // view?: esri.MapView;
  // map?: esri.Map;
  items: MenuItem[];
  text: string;
  title = 'ng-cli';
  tt = "BBBBB"
  txt: string;
  mohafazatCode: number[] = [];
  citycode: any[] = []
  ELSHARKYAArr: any[] = [];
  ADMIN_ELSHARKYAArr: any[] = [];
  ctyCode: string[] = [];
  hospitalCode: number[] = [];
  orginataions: any[] = [];
  subOrginataions: any = [];
  DepartmantsData: any[] = [];
  supplierNames: any = [];
  brands: any = [];
  HOSP_ELSHARKYAArr: any[] = [];
  organizationIds: number[] = [];
  subOrganizationIds: number[] = [];
  departmentIds: number[] = [];
  hosCodesInBrand: string[] = [];
  supplierIds: number[] = []
  healthDirectoriesList: healthDirectory[];
  getDeviceId: number;
  getDeviceName: string;
  i: number = 0;
  organizationIDS: number[] = [];
  bufferLayer: GraphicsLayer;
  homeWidget: Home;
  compass: Compass;
  scaleBar: ScaleBar;
  basemapToggle: BasemapToggle;
  graphicLayer: GraphicsLayer;
  defaultBaseMap: string;
  newData: string[] = [];
  opt: any;
  //hosCodes:any[]=[];
  hosCodeInDeprement:any[]=[];
  hosCodeInBrand:any[]=[];
  hosCodeInSupplier:any[]=[];
  hosCodeForPrice:any[]=[];
  hosCodeForDate:any[]=[];
  hcodesInSubOrganization:any[]=[];
  hosCodesInOrganization:any[]=[];
  hspitalCode:any[]=[];
  hospitalsInCity:HealthCareUnit[];
  fromPrice:number=0;
  toPrice:number=0;
  fromDate:Date;
  toDate:Date;
  dates:dateVM;
  model: modelIDsViewModel = {
    id: []
  }
  constructor(public translate: TranslateService, private zone: NgZone,
    private featureService: FeaturesMapService, private getStaticAPIService: GetStaticApiService) {
    this.defaultBaseMap = 'streets';
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'Ar') {
        document.getElementById('fdate1').style.marginRight="15%";
        document.getElementById('fdate2').style.marginRight="15%";
        document.getElementById('tdate1').style.marginRight="15%";
        document.getElementById('tdate2').style.marginRight="15%";
        if(this.fromPrice!=0 || this.toPrice!=0)
        {
          var frm=$('#fprice2').val();
          var to=$('#tprice2').val();
          if(frm!=undefined)
          {
            this.onFocusOutEvent(frm,'from');
          }
          if(to!=undefined)
          {
            this.onFocusOutEvent(to,'to');
          }
        }
        else if(this.dates.from!=null || this.dates.to!=null)
        {
          if(this.dates.to==null)
          {
            this.dates.from=new Date($('#fdate2').val().toString());
            this.getDate('fromdate');
          }
          else if(this.dates.from==null)
          {
            this.dates.to=new Date($('#tdate2').val().toString());
            this.getDate('todate');
          }
        }
        else if(this.supplierIds.length>0 && this.supplierIds!=null){
          this.selectSupplier();
        }
        else if(this.hosCodesInBrand.length > 0 && this.hosCodesInBrand !=null){
          this.selectBrand();
        }
        else if (this.departmentIds.length > 0 && this.departmentIds !=null ) {
          this.selectDepartmants();
        }
        else if(this.subOrganizationIds.length>0 && this.subOrganizationIds!=null){
          this.selectSubOrginataions();
        }
        else if (this.organizationIds != null && this.organizationIds.length != 0) {
          this.selectOrginataions();
        }
        else if (this.ctyCode != null && this.ctyCode.length != 0) {
          this.selectCity();
        }
        else {
          this.selectMohafza();
        }
      }
      else {
        if(this.fromPrice!=0 || this.toPrice!=0)
        {
          var frm=$('#fprice2').val();
          var to=$('#tprice2').val();
          if(frm!=undefined)
          {
            this.onFocusOutEvent(frm,'from');
          }
          if(to!=undefined)
          {
            this.onFocusOutEvent(to,'to');
          }
        }
        else if(this.dates.from!=null || this.dates.to!=null)
        {
          if(this.dates.to==null)
          {
            this.dates.from=new Date($('#fdate2').val().toString());
            this.getDate('fromdate');
          }
          else if(this.dates.from==null)
          {
            this.dates.to=new Date($('#tdate2').val().toString());
            this.getDate('todate');
          }
        }
        else if(this.supplierIds.length>0 && this.supplierIds!=null){
          this.selectSupplier();
        }
        else if(this.hosCodesInBrand.length > 0 && this.hosCodesInBrand !=null){
          this.selectBrand();
        }
        else if (this.departmentIds.length > 0 && this.departmentIds !=null ) {
          this.selectDepartmants();
        }
        else if(this.subOrganizationIds.length>0 && this.subOrganizationIds!=null){
          this.selectSubOrginataions();
        }
        else if (this.organizationIds != null && this.organizationIds.length != 0) {
          this.selectOrginataions();
        }
        else if (this.ctyCode != null && this.ctyCode.length != 0) {
          this.selectCity();
        }
        else {
          this.selectMohafza();
        }
      }
    });
  }
  ngOnInit(): void {
    this.dates = {
      from: null,
      to: null
    }
    this.generateSelectFeatures();
    esriConfig.assetsPath = './assets';
    const apiKey =
      'AAPK3dec25c93f77440089acb335a76a63aeRp1-RNQrf3ZDSmSdPcr0qALRsafRK1ieC5iBM7mNBcmj30-BjG0Bucuu5kwLCkLV';
    esriConfig.apiKey = apiKey;
    this.initializeMap();
    // this.featureService.doquery(this.map);
  }
  postQuery() {
    let query = {

    }
  }
  generateSelectFeatures() {
    let queryOption: any = {
      responseType: 'json',
      query: {
        f: 'json',
        // where: `Section = N'${name}'`,
        where: `1=1`,
        returnCountOnly: false,
        outFields: '*',
        returnGeometry: true,
      },
    };

    //get ELSHARKYa feature
    Request(this.featureService.ELSHARKYAUrl, queryOption).then(
      (response: any) => {
        for (let i = 0; i < response.data.features.length; i++) {
          let arr = [
            {
              enName: response.data.features[i].attributes.Gov_name_E,
              arName: response.data.features[i].attributes.Gov_name_A,
              code: response.data.features[i].attributes.MohafazaCode,
            },
          ];
          this.ELSHARKYAArr.push(...arr);
        }
      },
      (error: any) => {

      }
    );
  }

  initializeMap() {
    const bufferLayer = new GraphicsLayer({
      blendMode: 'hard-light',
    });
    (window as any)._bufferLayer = bufferLayer;
    //  const tileLayer=new TileLayer({
    //    blendMode:'hard-light'
    //  });
    //  (window as any)._bufferLayer = tileLayer;

    // let layer = new TileLayer({
    //   url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer"
    // });

    this.map = new Map({
      basemap: 'streets',
      layers: [bufferLayer]
    });
    (window as any)._map = this.map;
    const view = new MapView({
      map: this.map,
      container: 'viewDiv',
      center: [31.31652832030437, 30.417887641063995],
      zoom: 8,
      popup: {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: true,
          breakpoint: {
            width: 600,
            height: 1000,
          },
          position: 'top-left',
        },
      },
    });

    (window as any)._view = view;

    const homeWidget = new Home({
      view: (window as any)._view,
    });
    const compass = new Compass({
      view: (window as any)._view,
    });
    const scaleBar = new ScaleBar({
      view: (window as any)._view,
      unit: 'metric',
      style: 'ruler',
    });


    const basemapToggle = new BasemapToggle({
      view: (window as any)._view,
      nextBasemap: 'satellite',
    });

    (window as any)._view.ui.add([
      {
        component: homeWidget,
        position: 'top-left',
        index: 2,
      },
      {
        component: basemapToggle,
        position: 'bottom-right',
        index: 2,
      },
      {
        component: compass,
        position: 'top-left',
        index: 4,
      },
      {
        component: scaleBar,
        position: 'bottom-left',
        index: 2,
      },
    ]);

    let graphicLayer = new GraphicsLayer();
    (window as any)._map.add(graphicLayer);
    (window as any)._graphicLayer = graphicLayer;

    let point = new Point({ //Create a point
      // type: "point",
      longitude: 31.233334,
      latitude: 30.033333
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
    var formData = new FormData();
    let features = [{
          "attributes": {
            "EST_NAME": "مستشفى جديده117",
            "GOV_NAME": "القاهره الجديده17",
            "EDARA_NAME": "17الجديده",
            "COD": 205,
            "CityCode": "212017",
            "ESTEng_NAME": "newHost17",
            "GOVEng_NAME": "newCairo17",
            "EDAEng_NAME": "newNew17",
          },
          "geometry": {
            "x": 31.233334,
            "y": 30.033333
          },
        }]
    // Request("http://10.10.0.147/arcgis/rest/services/healthAPP/FeatureServer/0/addFeatures",{
    //   query:
    //   {
    //     rollbackOnFailure:true,
    //     features:JSON.stringify(features),
    //     f:"pjson",
    //   },
    //   responseType:"json",
    //   method:"post"
    // }).then((response:any) => 
    // {
    //   console.log("response1111",response)
    // },
    // error=>{
    //   console.log("res",error);
    // });
}
  selectMohafza() {
    this.map.remove(this.featureService.ELSHARKYA);
    this.map.remove(this.featureService.ELSHARKYA_En);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    this.map.remove(this.featureService.HOSP_ELSHARKYA);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
    this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
    if (this.mohafazatCode.length > 0) {
      this.organizationIds = [];
      this.ctyCode = [];
      if (this.translate.currentLang == "Ar") {
        this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
        this.featureService.FeatureELSHARKYA(
          this.map,
          1,
          `MohafazaCode in (${this.mohafazatCode})`
        );

        let queryOption: any = {
          responseType: 'json',
          query: {
            f: 'json',
            where: `MohafazaCode in (${this.mohafazatCode})`,
            returnCountOnly: false,
            outFields: '*',
            returnGeometry: true,
          },
        };
        //get ELSHARKYa admin feature
        Request(this.featureService.ADMIN_ELSHARKYAUrl, queryOption).then(
          (response: any) => {
            this.ADMIN_ELSHARKYAArr = [];
            for (let i = 0; i < response.data.features.length; i++) {
              let arr = [
                {
                  arName: response.data.features[i].attributes.EDARA_NAME,
                  enName: response.data.features[i].attributes.EDAEn_NAME,
                  code: response.data.features[i].attributes.COD,
                  cityCode: response.data.features[i].attributes.CityCode
                },
              ];
              this.ADMIN_ELSHARKYAArr.push(...arr);
            }

            let queryOptionCity: any = {
              responseType: 'json',
              query: {
                f: 'json',
                where: `MohafazaCode in (${this.mohafazatCode})`,
                returnCountOnly: false,
                outFields: '*',
                returnGeometry: true,
              },
            };
            //get cityCode feature
            Request(this.featureService.ADMIN_ELSHARKYAUrl, queryOptionCity).then(
              (response: any) => {
                this.citycode = []
                for (let i = 0; i < response.data.features.length; i++) {
                  this.citycode.push(response.data.features[i].attributes.CityCode)

                }

                //draw hospitals
                let queryOptionHospitals: any = {
                  responseType: 'json',
                  query: {
                    f: 'json',
                    where: `CityCode in (${this.citycode})`,
                    returnCountOnly: false,
                    outFields: '*',
                    returnGeometry: false,
                  },
                };
                //get cityCode feature
                Request(this.featureService.HOSP_ELSHARKYAUrl, queryOptionHospitals).then(
                  (response: any) => {
                   // let hspitalCode = []
                    for (let i = 0; i < response.data.features.length; i++) {
                      
                      this.hspitalCode.push(response.data.features[i].attributes.COD)
                    }
                    if(this.fromPrice!=0 || this.toPrice!=0)
                    {
                      var frm=$('#fprice2').val();
                      var to=$('#tprice2').val();
                      if(frm!=undefined)
                      {
                        this.onFocusOutEvent(frm,'from');
                      }
                      if(to!=undefined)
                      {
                        this.onFocusOutEvent(to,'to');
                      }
                    }
                    else if(this.dates.from!=null || this.dates.to!=null)
                    {
                      if(this.dates.to==null)
                      {
                        this.dates.from=new Date($('#fdate2').val().toString());
                        this.getDate('fromdate');
                      }
                      else if(this.dates.from==null)
                      {
                        this.dates.to=new Date($('#tdate2').val().toString());
                        this.getDate('todate');
                      }
                    }
                    else {this.selectHospital(true, this.hspitalCode)}
                  });
                  this.hspitalCode=[];
              })
          })
      }
      else if (this.translate.currentLang == "En") {
        
        this.map.remove(this.featureService.HOSP_ELSHARKYA);
        this.featureService.FeatureELSHARKYA_En(
          this.map,
          1,
          `MohafazaCode in (${this.mohafazatCode})`
        );

        let queryOption: any = {
          responseType: 'json',
          query: {
            f: 'json',
            where: `MohafazaCode in (${this.mohafazatCode})`,
            returnCountOnly: false,
            outFields: '*',
            returnGeometry: true,
          },
        };

        //get ELSHARKYa admin feature
        Request(this.featureService.ADMIN_ELSHARKYAUrl, queryOption).then(
          (response: any) => {
            this.ADMIN_ELSHARKYAArr = [];
            console.log("response.data.features",response.data.features)

            for (let i = 0; i < response.data.features.length; i++) {
              let arr = [
                {
                  arName: response.data.features[i].attributes.EDARA_NAME,
                  enName: response.data.features[i].attributes.EDAEn_NAME,
                  code: response.data.features[i].attributes.COD,
                  cityCode: response.data.features[i].attributes.CityCode
                },
              ];
              this.ADMIN_ELSHARKYAArr.push(...arr);
            }
            let queryOptionCity: any = {
              responseType: 'json',
              query: {
                f: 'json',
                where: `MohafazaCode in (${this.mohafazatCode})`,
                returnCountOnly: false,
                outFields: '*',
                returnGeometry: true,
              },
            };
            //get cityCode feature
            Request(this.featureService.ADMIN_ELSHARKYAUrl, queryOptionCity).then(
              (response: any) => {
                console.log("city",response.data.features)
                this.citycode = []
                for (let i = 0; i < response.data.features.length; i++) {              
                  this.citycode.push(response.data.features[i].attributes.CityCode)
                }
                //draw hospitals
                let queryOptionHospitals: any = {
                  responseType: 'json',
                  query: {
                    f: 'json',
                    where: `CityCode in (${this.citycode})`,
                    returnCountOnly: false,
                    outFields: '*',
                    returnGeometry: false,
                  },
                };
                //get cityCode feature
                Request(this.featureService.HOSP_ELSHARKYAUrl_En, queryOptionHospitals).then(
                  (response: any) => {
                    //let hspitalCode = []
                    for (let i = 0; i < response.data.features.length; i++) {
                      // console.log("hospitals",response.data.features)
                      this.hspitalCode.push(response.data.features[i].attributes.COD)
                    }
                    if(this.fromPrice!=0 || this.toPrice!=0)
                    {
                      var frm=$('#fprice2').val();
                      var to=$('#tprice2').val();
                      if(frm!=undefined)
                      {
                        this.onFocusOutEvent(frm,'from');
                      }
                      if(to!=undefined)
                      {
                        this.onFocusOutEvent(to,'to');
                      }
                    }
                    else if(this.dates.from!=null || this.dates.to!=null)
                    {
                      if(this.dates.to==null)
                      {
                        this.dates.from=new Date($('#fdate2').val().toString());
                        this.getDate('fromdate');
                      }
                      else if(this.dates.from==null)
                      {
                        this.dates.to=new Date($('#tdate2').val().toString());
                        this.getDate('todate');
                      }
                    }
                    else{this.selectHospital(true, this.hspitalCode)}
                  });
                  this.hspitalCode=[];
              })
          })
      }
    }
    else {
      if(this.fromPrice!=0 || this.toPrice!=0)
      {
        var frm=$('#fprice2').val();
        var to=$('#tprice2').val();
        if(frm!=undefined)
        {
          this.onFocusOutEvent(frm,'from');
        }
        if(to!=undefined)
        {
          this.onFocusOutEvent(to,'to');
        }
      }
      else if(this.dates.from!=null || this.dates.to!=null)
      {
        if(this.dates.to==null)
        {
          this.dates.from=new Date($('#fdate2').val().toString());
          this.getDate('fromdate');
        }
        else if(this.dates.from==null)
        {
          this.dates.to=new Date($('#tdate2').val().toString());
          this.getDate('todate');
        }
      }
      // this.hspitalCode=[];
     // else {this.selectHospital(true, this.hspitalCode)}
      this.orginataions = [];
      this.subOrginataions = [];
      this.DepartmantsData = [];
      this.brands = [];
      this.supplierNames = [];
      this.hospitalsInCity=[];
    }
  }
  selectCity() {
    // this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    // this.map.remove(this.featureService.HOSP_ELSHARKYA);
    if (this.ctyCode.length > 0) {
      if (this.translate.currentLang == "Ar") {
        this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
        this.featureService.FeatureADMIN_ELSHARKYA(
          this.map,
          1,
          `CityCode in (${this.ctyCode})`
        );
        this.hospitalCode = [];
        this.model.id = this.ctyCode
        this.getStaticAPIService.getHospitalInCity(this.ctyCode).subscribe(re => {
          this.hospitalsInCity=re;
            this.getStaticAPIService
              .GetOrginisations(this.model)
              .subscribe((res: any) => {
                this.orginataions = res;
              });

        });
        //draw hospitals
        let queryOptionHospitals: any = {
          responseType: 'json',
          query: {
            f: 'json',
            where: `CityCode in (${this.ctyCode})`,
            returnCountOnly: false,
            outFields: '*',
            returnGeometry: false,
          },
        };
        //get cityCode feature
        Request(this.featureService.HOSP_ELSHARKYAUrl, queryOptionHospitals).then(
          (response: any) => {
          //  let hspitalCode = []
            for (let i = 0; i < response.data.features.length; i++) {
              this.hspitalCode.push(response.data.features[i].attributes.COD)
            }
            if(this.fromPrice!=0 || this.toPrice!=0)
            {
              var frm=$('#fprice2').val();
              var to=$('#tprice2').val();
              if(frm!=undefined)
              {
                this.onFocusOutEvent(frm,'from');
              }
              if(to!=undefined)
              {
                this.onFocusOutEvent(to,'to');
              }
            }
            else if(this.dates.from!=null || this.dates.to!=null)
            {
              if(this.dates.to==null)
              {
                this.dates.from=new Date($('#fdate2').val().toString());
                this.getDate('fromdate');
              }
              else if(this.dates.from==null)
              {
                this.dates.to=new Date($('#tdate2').val().toString());
                this.getDate('todate');
              }
            }
            else{this.selectHospital(true, this.hspitalCode)}
          });
          this.hspitalCode=[];
      }
      else if (this.translate.currentLang == "En") {
        this.map.remove(this.featureService.HOSP_ELSHARKYA);
        this.featureService.FeatureADMIN_ELSHARKYA_En(
          this.map,
          1,
          `CityCode in (${this.ctyCode})`
        );
        this.hospitalCode = [];
        this.model.id = this.ctyCode
        this.getStaticAPIService.getHospitalInCity(this.ctyCode).subscribe(re => {
            this.getStaticAPIService
              .GetOrginisations(this.model)
              .subscribe((res: any) => {
                this.orginataions = res;
              });

        });

        //draw hospitals
        let queryOptionHospitals: any = {
          responseType: 'json',
          query: {
            f: 'json',
            where: `CityCode in (${this.ctyCode})`,
            returnCountOnly: false,
            outFields: '*',
            returnGeometry: false,
          },
        };
        //get cityCode feature
        Request(this.featureService.HOSP_ELSHARKYAUrl, queryOptionHospitals).then(
          (response: any) => {
          //  let hspitalCode = []
            for (let i = 0; i < response.data.features.length; i++) {
              this.hspitalCode.push(response.data.features[i].attributes.COD)
            }
            if(this.fromPrice!=0 || this.toPrice!=0)
            {
              var frm=$('#fprice2').val();
              var to=$('#tprice2').val();
              if(frm!=undefined)
              {
                this.onFocusOutEvent(frm,'from');
              }
              if(to!=undefined)
              {
                this.onFocusOutEvent(to,'to');
              }
            }
            else if(this.dates.from!=null || this.dates.to!=null)
            {
              if(this.dates.to==null)
              {
                this.dates.from=new Date($('#fdate2').val().toString());
                this.getDate('fromdate');
              }
              else if(this.dates.from==null)
              {
                this.dates.to=new Date($('#tdate2').val().toString());
                this.getDate('todate');
              }
            }
            else {this.selectHospital(true, this.hspitalCode)}
          });
          this.hspitalCode=[];
      }
    }
    else {
      this.orginataions = [];
      this.subOrginataions = [];
      this.DepartmantsData = [];
      this.brands = [];
      this.supplierNames = [];
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
      this.map.remove(this.featureService.HOSP_ELSHARKYA);
      this.hospitalCode = [];
      this.featureService.FeatureADMIN_ELSHARKYA(
        this.map,
        1,
        `CityCode in (${this.citycode})`
      );
      let queryOption: any = {
        responseType: 'json',
        query: {
          f: 'json',
          where: `CityCode in(${this.citycode})`,
          returnCountOnly: false,
          outFields: '*',
          returnGeometry: true,
        },
      };
      //get ELSHARKYa hospital feature
      Request(this.featureService.HOSP_ELSHARKYAUrl, queryOption).then(
        (response: any) => {
          this.HOSP_ELSHARKYAArr = [];
          for (let i = 0; i < response.data.features.length; i++) {
            let arr = [
              {
                arName: response.data.features[i].attributes.EST_NAME,
                code: response.data.features[i].attributes.COD,
              },
            ];
            this.HOSP_ELSHARKYAArr.push(...arr);
          }
        });
      //draw hospitals
      let queryOptionHospitals: any = {
        responseType: 'json',
        query: {
          f: 'json',
          where: `CityCode in (${this.citycode})`,
          returnCountOnly: false,
          outFields: '*',
          returnGeometry: false,
        },
      };
      //get cityCode feature
      Request(this.featureService.HOSP_ELSHARKYAUrl, queryOptionHospitals).then(
        (response: any) => {
         // let hspitalCode = []
          for (let i = 0; i < response.data.features.length; i++) {
            this.hspitalCode.push(response.data.features[i].attributes.COD)
          }
          if(this.fromPrice!=0 || this.toPrice!=0)
          {
            var frm=$('#fprice2').val();
            var to=$('#tprice2').val();
            if(frm!=undefined)
            {
              this.onFocusOutEvent(frm,'from');
            }
            if(to!=undefined)
            {
              this.onFocusOutEvent(to,'to');
            }
          }
          else if(this.dates.from!=null || this.dates.to!=null)
          {
            if(this.dates.to==null)
            {
              this.dates.from=new Date($('#fdate2').val().toString());
              this.getDate('fromdate');
            }
            else if(this.dates.from==null)
            {
              this.dates.to=new Date($('#tdate2').val().toString());
              this.getDate('todate');
            }
          }
          else{this.selectHospital(true, this.hspitalCode)}
        });
        this.hspitalCode=[];
    }

  }

  selectHospital(event, hospitalCode: any) {
    if (this.translate.currentLang == "Ar") {
      if (event == true) {
        this.hospitalCode = []
        this.hospitalCode.push(hospitalCode);
        this.map.remove(this.featureService.HOSP_ELSHARKYA);

        //popup
        var root = this;
        function buildPopupHOSPLayer(feature: any) {
          let ContainerDiv = document.createElement('div');
          ContainerDiv.innerHTML = `<div class="container">    </div>`;

          let gisData = document.createElement('div');
          gisData.innerHTML = ` <table class="popupTableInfo">
               <tr>
                 <td>المحافظه</td>
                 <td>${feature.graphic.attributes.GOV_NAME}</td>
               </tr>
               <tr>
                 <td>الاداره</td>
                 <td>${feature.graphic.attributes.EDARA_NAME}</td>
               </tr>
             </table>
           </br>`;

          let tabWrap = document.createElement('div');
          tabWrap.classList.add('tabTab');
          tabWrap.textContent = 'الأقسام';

          let tabContents = document.createElement('div');
          tabContents.classList.add('tab');

          root.getStaticAPIService
            .GetDepartmantData(feature.graphic.attributes.COD)
            .subscribe((success: any) => {

              let tabBody = document.createElement('div');
              tabBody.classList.add('tabcontent');

              if (success.length == 0) {
                let emptyData = document.createElement('div');
                emptyData.classList.add('tabTab');
                emptyData.textContent = 'لا يوجد اجهزه بالمستشفي';

                tabBody.classList.remove('tabcontent');
                tabWrap.innerHTML = '';
                tabContents.innerHTML = '';
                ContainerDiv.appendChild(emptyData);
              } else {
                for (let i = 0; i < success.length; i++) {
                  let createTapButtons: any = 'button' + success[i].departmentID;
                  createTapButtons = document.createElement('button');
                  createTapButtons.classList.add('tablinks');
                  createTapButtons.textContent = success[i].departmentArName;
                  createTapButtons.addEventListener(
                    'click',
                    function (event: any) {
                      var text = $(event.target).text();

                      root.generateContnetTable(
                        success[i].hospitalID,
                        success[i].departmentID,
                        tabBody,
                        text
                      );
                    }
                  );
                  tabContents.appendChild(createTapButtons);
                }
              }
              ContainerDiv.appendChild(gisData);
              ContainerDiv.appendChild(tabWrap);
              ContainerDiv.appendChild(tabContents);
              ContainerDiv.appendChild(tabBody);
            });
          return ContainerDiv;
        }
        var popupHOSPLayer = {
          title: '{EST_NAME}',
          content: buildPopupHOSPLayer,
        };

        this.featureService.FeatureHOSP_ELSHARKYA(
          this.map,
          1,
          popupHOSPLayer,
          `COD in (${hospitalCode})`
        );
      }
      else {

        const id = hospitalCode.indexOf(event.target.value); // 2
        const removedDrink = hospitalCode.splice(id, 1);

        this.map.remove(this.featureService.HOSP_ELSHARKYA);

        //popup
        var root = this;
        function buildPopupHOSPLayer(feature: any) {

          let ContainerDiv = document.createElement('div');
          ContainerDiv.innerHTML = `<div class="container">    </div>`;

          let gisData = document.createElement('div');
          gisData.innerHTML = ` <table class="popupTableInfo">
               <tr>
                 <td>المحافظة</td>
                 <td>${feature.graphic.attributes.GOV_NAME}</td>
               </tr>
               <tr>
                 <td>الاداره</td>
                 <td>${feature.graphic.attributes.EDARA_NAME}</td>
               </tr>
             </table>
           </br>`;

          let tabWrap = document.createElement('div');
          tabWrap.classList.add('tabTab');
          tabWrap.textContent = 'الأقسام';

          let tabContents = document.createElement('div');
          tabContents.classList.add('tab');

          root.getStaticAPIService
            .GetDepartmantData(feature.graphic.attributes.COD)
            .subscribe((success: any) => {

              let tabBody = document.createElement('div');
              tabBody.classList.add('tabcontent');

              if (success.length == 0) {
                let emptyData = document.createElement('div');
                emptyData.classList.add('tabTab');
                emptyData.textContent = 'لا يوجد اجهزه بالمستشفي';

                tabBody.classList.remove('tabcontent');
                tabWrap.innerHTML = '';
                tabContents.innerHTML = '';
                ContainerDiv.appendChild(emptyData);
              } else {
                for (let i = 0; i < success.length; i++) {
                  let createTapButtons: any = 'button' + success[i].departmentID;
                  createTapButtons = document.createElement('button');
                  createTapButtons.classList.add('tablinks');

                  createTapButtons.textContent = success[i].departmentArName;
                  createTapButtons.addEventListener(
                    'click',
                    function (event: any) {
                      var text = $(event.target).text();
                      root.generateContnetTable(
                        success[i].hospitalID,
                        success[i].departmentID,
                        tabBody,
                        text
                      );
                    }
                  );
                  tabContents.appendChild(createTapButtons);
                }
              }
              ContainerDiv.appendChild(gisData);
              ContainerDiv.appendChild(tabWrap);
              ContainerDiv.appendChild(tabContents);
              ContainerDiv.appendChild(tabBody);
            });
          return ContainerDiv;
        }

        var popupHOSPLayer = {
          title: '{EST_NAME}',
          content: buildPopupHOSPLayer,
        };

        this.featureService.FeatureHOSP_ELSHARKYA(
          this.map,
          1,
          popupHOSPLayer,
          `COD in (${hospitalCode})`
        );
      }
    }
    else if (this.translate.currentLang == "En") {
      if (event == true) {
        this.hospitalCode = []
        this.hospitalCode.push(hospitalCode);
        this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
        //popup
        var root = this;
        function buildPopupHOSPLayer(feature: any) {
          let ContainerDiv = document.createElement('div');
          ContainerDiv.innerHTML = `<div class="container">    </div>`;

          let gisData = document.createElement('div');
          gisData.innerHTML = ` <table class="popupTableInfo">
               <tr>
               <td>${feature.graphic.attributes.GOVEng_NAME}</td>
                 <td>Governorate</td>
               </tr>
               <tr>
               <td>${feature.graphic.attributes.EDAEng_NAME}</td>
                 <td>City</td>
               </tr>
             </table>
           </br>`;

          let tabWrap = document.createElement('div');
          tabWrap.classList.add('tabTab');
          tabWrap.textContent = 'Departments';

          let tabContents = document.createElement('div');
          tabContents.classList.add('tab');

          root.getStaticAPIService
            .GetDepartmantData(feature.graphic.attributes.COD)
            .subscribe((success: any) => {
              let tabBody = document.createElement('div');
              tabBody.classList.add('tabcontent');

              if (success.length == 0) {
                let emptyData = document.createElement('div');
                emptyData.classList.add('tabTab');
                emptyData.textContent = 'There is No Equipment in hospital';

                tabBody.classList.remove('tabcontent');
                tabWrap.innerHTML = '';
                tabContents.innerHTML = '';
                ContainerDiv.appendChild(emptyData);
              } else {
                for (let i = 0; i < success.length; i++) {
                  let createTapButtons: any = 'button' + success[i].departmentID;
                  createTapButtons = document.createElement('button');
                  createTapButtons.classList.add('tablinks');
                  createTapButtons.textContent = success[i].departmentEngName;
                  createTapButtons.addEventListener(
                    'click',
                    function (event: any) {
                      var text = $(event.target).text();
                      root.generateContnetTable(
                        success[i].hospitalID,
                        success[i].departmentID,
                        tabBody,
                        text
                      );
                    }
                  );
                  tabContents.appendChild(createTapButtons);
                }
              }
              ContainerDiv.appendChild(gisData);
              ContainerDiv.appendChild(tabWrap);
              ContainerDiv.appendChild(tabContents);
              ContainerDiv.appendChild(tabBody);
            });
          return ContainerDiv;
        }
        var popupHOSPLayer = {
          title: '{ESTEng_NAME}',
          content: buildPopupHOSPLayer,
        };

        this.featureService.FeatureHOSP_ELSHARKYA_En(
          this.map,
          1,
          popupHOSPLayer,
          `COD in (${hospitalCode})`
        );
      }
      else {

        const id = hospitalCode.indexOf(event.target.value); // 2
        const removedDrink = hospitalCode.splice(id, 1);

        this.map.remove(this.featureService.HOSP_ELSHARKYA);

        //popup
        var root = this;
        function buildPopupHOSPLayer(feature: any) {

          let ContainerDiv = document.createElement('div');
          ContainerDiv.innerHTML = `<div class="container">    </div>`;

          let gisData = document.createElement('div');
          gisData.innerHTML = ` <table class="popupTableInfo">
               <tr>
                 <td>المحافظة</td>
                 <td>${feature.graphic.attributes.GOV_NAME}</td>
               </tr>
               <tr>
                 <td>الاداره</td>
                 <td>${feature.graphic.attributes.EDARA_NAME}</td>
               </tr>
             </table>
           </br>`;

          let tabWrap = document.createElement('div');
          tabWrap.classList.add('tabTab');
          tabWrap.textContent = 'الأقسام';

          let tabContents = document.createElement('div');
          tabContents.classList.add('tab');

          root.getStaticAPIService
            .GetDepartmantData(feature.graphic.attributes.COD)
            .subscribe((success: any) => {

              let tabBody = document.createElement('div');
              tabBody.classList.add('tabcontent');

              if (success.length == 0) {
                let emptyData = document.createElement('div');
                emptyData.classList.add('tabTab');
                emptyData.textContent = 'لا يوجد اجهزه بالمستشفي';

                tabBody.classList.remove('tabcontent');
                tabWrap.innerHTML = '';
                tabContents.innerHTML = '';
                ContainerDiv.appendChild(emptyData);
              } else {
                for (let i = 0; i < success.length; i++) {
                  let createTapButtons: any = 'button' + success[i].departmentID;
                  createTapButtons = document.createElement('button');
                  createTapButtons.classList.add('tablinks');

                  createTapButtons.textContent = success[i].departmentArName;
                  createTapButtons.addEventListener(
                    'click',
                    function (event: any) {
                      var text = $(event.target).text();
                      root.generateContnetTable(
                        success[i].hospitalID,
                        success[i].departmentID,
                        tabBody,
                        text
                      );
                    }
                  );
                  tabContents.appendChild(createTapButtons);
                }
              }
              ContainerDiv.appendChild(gisData);
              ContainerDiv.appendChild(tabWrap);
              ContainerDiv.appendChild(tabContents);
              ContainerDiv.appendChild(tabBody);
            });
          return ContainerDiv;
        }

        var popupHOSPLayer = {
          title: '{EST_NAME}',
          content: buildPopupHOSPLayer,
        };

        this.featureService.FeatureHOSP_ELSHARKYA(
          this.map,
          1,
          popupHOSPLayer,
          `COD in (${hospitalCode})`
        );
      }
    }
  }

  selectOrginataions() {
    if (this.organizationIds.length > 0) {
     // if (this.translate.currentLang == "En") {
        this.map.remove(this.featureService.ADMIN_ELSHARKYA);
        this.map.remove(this.featureService.HOSP_ELSHARKYA);
        this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
        this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
        this.getStaticAPIService.getHospitalInCity(this.ctyCode).subscribe(hospitals => {
          this.getStaticAPIService.GetSubOrginisations(this.organizationIds).subscribe((res: any)=>{
            this.subOrginataions=res;
            this.subOrginataions.forEach(suborg=>{
            hospitals.forEach(hos=>{       
              if(hos.suborganizationId==suborg.id)
              {
                this.hosCodesInOrganization.push(hos.code);
              }
            })
            if(this.fromPrice!=0 || this.toPrice!=0)
            {
              var frm=$('#fprice2').val();
              var to=$('#tprice2').val();
              if(frm!=undefined)
              {
                this.onFocusOutEvent(frm,'from');
              }
              if(to!=undefined)
              {
                this.onFocusOutEvent(to,'to');
              }
            }
            else if(this.dates.from!=null || this.dates.to!=null)
            {
              if(this.dates.to==null)
              {
                this.dates.from=new Date($('#fdate2').val().toString());
                this.getDate('fromdate');
              }
              else if(this.dates.from==null)
              {
                this.dates.to=new Date($('#tdate2').val().toString());
                this.getDate('todate');
              }
            }
            else {this.selectHospital(true,this.hosCodesInOrganization);}
          })
        })
          this.hosCodesInOrganization=[];
        })
    }
    else {
      this.subOrginataions = [];
      this.DepartmantsData = [];
      this.brands = [];
      this.supplierNames = [];
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
      this.map.remove(this.featureService.HOSP_ELSHARKYA);
      this.selectCity();
    }
  }
  selectSubOrginataions() {
    //var hcodesInSubOrganization=[];
    if (this.subOrganizationIds.length > 0) {
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
        this.map.remove(this.featureService.HOSP_ELSHARKYA);
        this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
        this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
      this.getStaticAPIService.getHospitalInSubOrganization(this.subOrganizationIds).subscribe(hospitals => {
         hospitals.forEach(hos=>{
          this.hosCodesInOrganization.forEach(hosCode=>{
            if(hos.code==hosCode)
            {
              this.hcodesInSubOrganization.push(hos.code);
            }
          })
         })
      this.getStaticAPIService
        .GetDepartmantsData(this.subOrganizationIds)
        .subscribe((depts: any) => {
          depts.forEach(dept=>{
            this.hosCodesInOrganization.forEach(hos=>{
              if(hos==dept.hospitalCode)
              {
                if(!this.DepartmantsData.some(dep=>dep.departmentID==dept.departmentID))
                {
                  this.DepartmantsData.push(dept); 
                }
              }
            })     
          })
          if(this.fromPrice!=0 || this.toPrice!=0)
          {
            var frm=$('#fprice2').val();
            var to=$('#tprice2').val();
            if(frm!=undefined)
            {
              this.onFocusOutEvent(frm,'from');
            }
            if(to!=undefined)
            {
              this.onFocusOutEvent(to,'to');
            }
          }
          else if(this.dates.from!=null || this.dates.to!=null)
          {
            if(this.dates.to==null)
            {
              this.dates.from=new Date($('#fdate2').val().toString());
              this.getDate('fromdate');
            }
            else if(this.dates.from==null)
            {
              this.dates.to=new Date($('#tdate2').val().toString());
              this.getDate('todate');
            }
          }
          else{this.selectHospital(true, this.hcodesInSubOrganization)}
        })
      })
      this.DepartmantsData=[];
      this.hcodesInSubOrganization=[];
    }
    else {
      this.DepartmantsData = [];
      this.brands = [];
      this.supplierNames = [];
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
      this.map.remove(this.featureService.HOSP_ELSHARKYA);
      this.selectOrginataions();
    }
  }
  selectDepartmants() {
    this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    this.map.remove(this.featureService.HOSP_ELSHARKYA);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
    this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
    if (this.departmentIds.length > 0) {
      this.getStaticAPIService.GetHospitalsInDepartment(this.departmentIds).subscribe(hos=>{
        hos.forEach(h=>{
          this.hosCodesInOrganization.forEach(hcode=>{
            if(h.code==hcode)
            {
              this.hosCodeInDeprement.push(hcode)
            }
          })
        });
        if(this.fromPrice!=0 || this.toPrice!=0)
        {
          var frm=$('#fprice2').val();
          var to=$('#tprice2').val();
          if(frm!=undefined)
          {
            this.onFocusOutEvent(frm,'from');
          }
          if(to!=undefined)
          {
            this.onFocusOutEvent(to,'to');
          }
        }
        else if(this.dates.from!=null || this.dates.to!=null)
        {
          if(this.dates.to==null)
          {
            this.dates.from=new Date($('#fdate2').val().toString());
            this.getDate('fromdate');
          }
          else if(this.dates.from==null)
          {
            this.dates.to=new Date($('#tdate2').val().toString());
            this.getDate('todate');
          }
        }
        else{this.selectHospital(true, this.hosCodeInDeprement)}
      })
      this.hosCodeInDeprement=[];
      this.getStaticAPIService.GetBrands(this.departmentIds)
        .subscribe(res => {
          this.brands = res
        })
    }
    else {
      this.brands = [];
      this.supplierNames = [];
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
      this.map.remove(this.featureService.HOSP_ELSHARKYA);
      this.selectSubOrginataions();
    }
  }
  selectBrand() {
    this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    this.map.remove(this.featureService.HOSP_ELSHARKYA);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
    this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
    if (this.hosCodesInBrand.length > 0) {
      this.getStaticAPIService
        .GetSuppliers(this.hosCodesInBrand)
        .subscribe((res: any) => {
          this.supplierNames = res;
          this.supplierNames.forEach(s=>{
            if(!this.hosCodeInBrand.some(i=>i==s.hospitalCode))
            {
              this.hosCodeInBrand.push(s.hospitalCode)
            }
          })
          if(this.fromPrice!=0 || this.toPrice!=0)
          {
            var frm=$('#fprice2').val();
            var to=$('#tprice2').val();
            if(frm!=undefined)
            {
              this.onFocusOutEvent(frm,'from');
            }
            if(to!=undefined)
            {
              this.onFocusOutEvent(to,'to');
            }
          }
          else if(this.dates.from!=null || this.dates.to!=null)
          {
            if(this.dates.to==null)
            {
              this.dates.from=new Date($('#fdate2').val().toString());
              this.getDate('fromdate');
            }
            else if(this.dates.from==null)
            {
              this.dates.to=new Date($('#tdate2').val().toString());
              this.getDate('todate');
            }
          }
          else{this.selectHospital(true,this.hosCodeInBrand)}
        });
        this.hosCodeInBrand=[];
    }
    else {
      this.supplierNames = [];
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
      this.map.remove(this.featureService.HOSP_ELSHARKYA);
      this.selectDepartmants();
    }
  }
  selectSupplier()
  {
    this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    this.map.remove(this.featureService.HOSP_ELSHARKYA);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
    this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
    // let hosCodeInSupplier=[];
    if(this.supplierIds.length>0)
    {
      this.getStaticAPIService.GetHospitalsBySupplier(this.supplierIds).subscribe(hospital=>{
        this.hosCodeInBrand.forEach(hoscode=>{
          hospital.forEach(h=>{
            if(hoscode==h.code)
            {
              if(!this.hosCodeInSupplier.some(i=>i==h.code))
              {
                this.hosCodeInSupplier.push(h.code)
              }
            }
          })
          if(this.fromPrice!=0 || this.toPrice!=0)
          {
            var frm=$('#fprice2').val();
            var to=$('#tprice2').val();
            if(frm!=undefined)
            {
              this.onFocusOutEvent(frm,'from');
            }
            if(to!=undefined)
            {
              this.onFocusOutEvent(to,'to');
            }
          }
          else if(this.dates.from!=null || this.dates.to!=null)
          {
            if(this.dates.to==null)
            {
              this.dates.from=new Date($('#fdate2').val().toString());
              this.getDate('fromdate');
            }
            else if(this.dates.from==null)
            {
              this.dates.to=new Date($('#tdate2').val().toString());
              this.getDate('todate');
            }
          }
          else{this.selectHospital(true,this.hosCodeInSupplier)}
        })
      })
      this.hosCodeInSupplier=[];
    }
    else
    {
      this.map.remove(this.featureService.ADMIN_ELSHARKYA);
      this.map.remove(this.featureService.HOSP_ELSHARKYA);
      this.selectBrand();
    }
  }
  generateContnetTable(hospitalId, departmantId, tabBody, departmentName) {
    var root = this;
    this.getStaticAPIService
      .GetHealthData(hospitalId, departmantId)
      .subscribe((success: any) => {
        if (success == null) {
          return null;
        } else {
          if (success.length != 0) {
            if (this.translate.currentLang == "Ar") {
              let displayDepartmentName = document.createElement('h4');
              displayDepartmentName.textContent = departmentName;
              displayDepartmentName.classList.add('displayDepartmentName');

              let deviceTable: any = 'd' + success.devicePrice;
              deviceTable = document.createElement('table');
              deviceTable.classList.add('popupTableInfo');

              let divDevicesTrTH = document.createElement('tr');

              let diviceNameTh = document.createElement('th');
              diviceNameTh.textContent = 'اسم الجهاز';

              let diviceFact = document.createElement('th');
              diviceFact.textContent = 'الموديل';

              let purchaseDate = document.createElement('th');
              purchaseDate.textContent = 'تاريخ الشراء';

              let diviceThDate = document.createElement('th');
              diviceThDate.textContent = 'تاريخ التركيب';

              divDevicesTrTH.appendChild(diviceNameTh);
              divDevicesTrTH.appendChild(diviceFact);
              divDevicesTrTH.appendChild(purchaseDate);
              divDevicesTrTH.appendChild(diviceThDate);

              deviceTable.appendChild(divDevicesTrTH);

              for (let i = 0; i < success.length; i++) {
                let divDevicesTrBody = document.createElement('tr');

                let divDevicesTdNameValue: any = document.createElement('td');
                divDevicesTdNameValue.textContent = success[i].deviceArName;
                divDevicesTdNameValue.setAttribute('deviceId', success[i].deviceId);
                divDevicesTdNameValue.style.cursor = 'pointer';
                divDevicesTdNameValue.addEventListener('click', function (event) {
                  var text = $(event.target).text();
                  var deviceId = $(event.target).attr('deviceId');
                  root.getDeviceName = text;
                  let bufferBar = <HTMLInputElement>(
                    document.getElementById('bufferBar')
                  );
                  bufferBar.style.display = 'block';
                  let bufferPrint = <HTMLInputElement>(
                    document.getElementById('bufferPrint')
                  );
                  bufferPrint.style.display = 'block';
                  bufferPrint.style.cursor = 'pointer';
                  let bufferViewPrint = <HTMLInputElement>(
                    document.getElementById('bufferViewPrint')
                  );
                  bufferViewPrint.style.display = 'block';
                  bufferViewPrint.style.cursor = 'pointer';
                });
                let divicetdFact = document.createElement('td');
                divicetdFact.textContent = success[i].deviceModel;
                let diviceTdDate = document.createElement('td');
                diviceTdDate.textContent = success[i].deviceInternData;
                let purchaseDateTD = document.createElement('td');
                purchaseDateTD.textContent = success[i].purchaseDate;
                divDevicesTrBody.appendChild(divDevicesTdNameValue);
                divDevicesTrBody.appendChild(divicetdFact);
                divDevicesTrBody.appendChild(diviceTdDate);
                divDevicesTrBody.appendChild(purchaseDateTD);
                deviceTable.appendChild(divDevicesTrBody);
              }
              let br = document.createElement('br');
              tabBody.innerHTML = '';
              tabBody.appendChild(br);
              tabBody.appendChild(displayDepartmentName);
              tabBody.appendChild(deviceTable);
            }
            else if (this.translate.currentLang == "En") {
              let displayDepartmentName = document.createElement('h4');
              displayDepartmentName.textContent = departmentName;
              displayDepartmentName.classList.add('displayDepartmentName');

              let deviceTable: any = 'd' + success.devicePrice;
              deviceTable = document.createElement('table');
              deviceTable.classList.add('popupTableInfo');

              let divDevicesTrTH = document.createElement('tr');

              let diviceNameTh = document.createElement('th');
              diviceNameTh.textContent = 'Equipment Name';

              let diviceFact = document.createElement('th');
              diviceFact.textContent = 'Model';

              let purchaseDate = document.createElement('th');
              purchaseDate.textContent = 'Purchase Date';

              let diviceThDate = document.createElement('th');
              diviceThDate.textContent = 'Installation Date';

              divDevicesTrTH.appendChild(diviceThDate);
              divDevicesTrTH.appendChild(purchaseDate);
              divDevicesTrTH.appendChild(diviceFact);
              divDevicesTrTH.appendChild(diviceNameTh);

              deviceTable.appendChild(divDevicesTrTH);

              for (let i = 0; i < success.length; i++) {
                let divDevicesTrBody = document.createElement('tr');

                let divDevicesTdNameValue: any = document.createElement('td');
                divDevicesTdNameValue.textContent = success[i].deviceEngName;
                divDevicesTdNameValue.setAttribute('deviceId', success[i].deviceId);
                divDevicesTdNameValue.style.cursor = 'pointer';
                divDevicesTdNameValue.addEventListener('click', function (event) {
                  var text = $(event.target).text();
                  var deviceId = $(event.target).attr('deviceId');
                  root.getDeviceName = text;
                  let bufferBar = <HTMLInputElement>(
                    document.getElementById('bufferBar')
                  );
                  bufferBar.style.display = 'block';
                  let bufferPrint = <HTMLInputElement>(
                    document.getElementById('bufferPrint')
                  );
                  bufferPrint.style.display = 'block';
                  bufferPrint.style.cursor = 'pointer';
                  let bufferViewPrint = <HTMLInputElement>(
                    document.getElementById('bufferViewPrint')
                  );
                  bufferViewPrint.style.display = 'block';
                  bufferViewPrint.style.cursor = 'pointer';
                });
                let divicetdFact = document.createElement('td');
                divicetdFact.textContent = success[i].deviceModel;
                let diviceTdDate = document.createElement('td');
                diviceTdDate.textContent = success[i].deviceInternData;
                let purchaseDateTD = document.createElement('td');
                purchaseDateTD.textContent = success[i].purchaseDate;

                divDevicesTrBody.appendChild(diviceTdDate);
                divDevicesTrBody.appendChild(purchaseDateTD);
                divDevicesTrBody.appendChild(divicetdFact);
                divDevicesTrBody.appendChild(divDevicesTdNameValue);
                deviceTable.appendChild(divDevicesTrBody);
              }
              let br = document.createElement('br');
              tabBody.innerHTML = '';
              tabBody.appendChild(br);
              tabBody.appendChild(displayDepartmentName);
              tabBody.appendChild(deviceTable);
            }
          }
        }
      });
  }

  onFocusOutEvent(event,arg){
    if(event.target.value=="")
    {
      event.target.value=0;
    }
    this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    this.map.remove(this.featureService.HOSP_ELSHARKYA);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
    this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
    if(event.target!=undefined){
      if(arg=='from'){
        this.fromPrice=event.target.value;
        this.toPrice=Number($('#tprice2').val());
      }
      else if(arg=='to'){
        this.toPrice=event.target.value;
        this.fromPrice=Number($('#fprice2').val());
      }
    }
    else if(event.target==undefined){
      if(arg=='from'){
        this.fromPrice=event;
        this.toPrice=Number($('#tprice2').val());
      }
      else if(arg=='to'){
        this.toPrice=event;
        this.fromPrice=Number($('#fprice2').val());
      }
    }
    this.getStaticAPIService.GetPriceRange(this.fromPrice,this.toPrice).subscribe(hos=>{
      if(this.supplierIds.length>0 && this.supplierIds!=null){
        this.hosCodeInSupplier.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForPrice.some(code=>code==hCode))
              {
                this.hosCodeForPrice.push(hCode);
              }
            }
          })
        });
      }
      else if(this.hosCodesInBrand.length > 0 && this.hosCodesInBrand !=null){
        this.hosCodesInBrand.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForPrice.some(code=>code==hCode))
              {
                this.hosCodeForPrice.push(hCode);
              }
            }
          })
        });
      }
      else if (this.departmentIds.length > 0 && this.departmentIds !=null ) {
        this.hosCodeInDeprement.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForPrice.some(code=>code==hCode))
              {
                this.hosCodeForPrice.push(hCode);
              }
            }
          })
        });
      }
      else if(this.subOrganizationIds.length>0 && this.subOrganizationIds!=null){
        this.hcodesInSubOrganization.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForPrice.some(code=>code==hCode))
              {
                this.hosCodeForPrice.push(hCode);
              }
            }
          })
        });
      }
      else if (this.organizationIds != null && this.organizationIds.length != 0) {
        this.hosCodesInOrganization.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForPrice.some(code=>code==hCode))
              {
                this.hosCodeForPrice.push(hCode);
              }
            }
          })
        });
      }
      else if (this.ctyCode != null && this.ctyCode.length != 0) {
        this.hspitalCode.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForPrice.some(code=>code==hCode))
              {
                this.hosCodeForPrice.push(hCode);
              }
            }
          })
        });
      }
      else{
        if(this.hspitalCode.length>0)
        {
          this.hspitalCode.forEach(hCode=>{
            hos.forEach(hos=>{
               if(hos.code==hCode)
               {
                if(!this.hosCodeForPrice.some(code=>code==hos.code))
                {
                  this.hosCodeForPrice.push(hos.code);
                }
              }
            })
          });
        }
        else
        {
          hos.forEach(hos=>{
             if(!this.hosCodeForPrice.some(code=>code==hos.code))
             {
               this.hosCodeForPrice.push(hos.code);
             }
         })
        }
      }
      this.selectHospital(true,this.hosCodeForPrice)
      this.hosCodeForPrice=[];
    })
  }
  getDate(arg)
  {
    this.map.remove(this.featureService.ADMIN_ELSHARKYA);
    this.map.remove(this.featureService.HOSP_ELSHARKYA);
    this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
    this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
    if(arg=='fromdate')
    {
      this.dates.from=new Date($('#fdate2').val().toString());
      this.dates.to=null;
    }
    else if(arg=='todate')
    {
      this.dates.to=new Date($('#tdate2').val().toString());
      this.dates.from=null;
    }
    this.getStaticAPIService.GetDateRange(this.dates).subscribe(hos=>{
      if(this.supplierIds.length>0 && this.supplierIds!=null){
        this.hosCodeInSupplier.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForDate.some(code=>code==hCode))
              {
                this.hosCodeForDate.push(hCode);
              }
            }
          })
        });
      }
      else if(this.hosCodesInBrand.length > 0 && this.hosCodesInBrand !=null){
        this.hosCodesInBrand.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForDate.some(code=>code==hCode))
              {
                this.hosCodeForDate.push(hCode);
              }
            }
          })
        });
      }
      else if (this.departmentIds.length > 0 && this.departmentIds !=null ) {
        this.hosCodeInDeprement.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForDate.some(code=>code==hCode))
              {
                this.hosCodeForDate.push(hCode);
              }
            }
          })
        });
      }
      else if(this.subOrganizationIds.length>0 && this.subOrganizationIds!=null){
        this.hcodesInSubOrganization.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForDate.some(code=>code==hCode))
              {
                this.hosCodeForDate.push(hCode);
              }
            }
          })
        });
      }
      else if (this.organizationIds != null && this.organizationIds.length != 0) {
        this.hosCodesInOrganization.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForDate.some(code=>code==hCode))
              {
                this.hosCodeForDate.push(hCode);
              }
            }
          })
        });
      }
      else if (this.ctyCode != null && this.ctyCode.length != 0) {
        this.hspitalCode.forEach(hCode=>{
          hos.forEach(hos=>{
            if(hos.code==hCode)
            {
              if(!this.hosCodeForDate.some(code=>code==hCode))
              {
                this.hosCodeForDate.push(hCode);
              }
            }
          })
        });
      }
      else{
        if(this.hspitalCode.length>0)
        {
          this.hspitalCode.forEach(hCode=>{
            hos.forEach(hos=>{
               if(hos.code==hCode)
               {
                if(!this.hosCodeForDate.some(code=>code==hos.code))
                {
                  this.hosCodeForDate.push(hos.code);
                }
              }
            })
          });
        }
        else
        {
          hos.forEach(hos=>{
             if(!this.hosCodeForDate.some(code=>code==hos.code))
             {
               this.hosCodeForDate.push(hos.code);
             }
         })
        }
      }
      this.selectHospital(true,this.hosCodeForDate)
      this.hosCodeForDate=[];
    })
  }
  clearDate(arg)
  {
    if(arg=='f')
    {
      $('#fdate2').val('');
      this.dates.from=null;
    }
    else if(arg=='t')
    {
      $('#tdate2').val('');
      this.dates.to=null;
    }
      this.getStaticAPIService.GetDateRange(this.dates).subscribe(hos=>{
        if(this.supplierIds.length>0 && this.supplierIds!=null){
          this.selectHospital(true,this.hosCodeInSupplier);
        }
        else if(this.hosCodesInBrand.length > 0 && this.hosCodesInBrand !=null){
          this.selectHospital(true,this.hosCodesInBrand);
        }
        else if (this.departmentIds.length > 0 && this.departmentIds !=null ) {
          this.selectHospital(true,this.hosCodeInDeprement);
        }
        else if(this.subOrganizationIds.length>0 && this.subOrganizationIds!=null){
          this.selectHospital(true,this.hcodesInSubOrganization);
        }
        else if (this.organizationIds != null && this.organizationIds.length != 0) {
          this.selectHospital(true,this.hosCodesInOrganization);
        }
        else if (this.ctyCode != null && this.ctyCode.length != 0) {
            this.selectHospital(true,this.hspitalCode);
        }
        else if(this.mohafazatCode.length>0){
          this.selectHospital(true,this.hspitalCode);
        }
        else{
          this.map.remove(this.featureService.ADMIN_ELSHARKYA);
          this.map.remove(this.featureService.HOSP_ELSHARKYA);
          this.map.remove(this.featureService.ADMIN_ELSHARKYA_En);
          this.map.remove(this.featureService.HOSP_ELSHARKYA_En);
        }
      });
  }
}


