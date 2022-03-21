import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category';
import { Department } from 'src/app/Shared/Models/Department';
import { Employee } from 'src/app/Shared/Models/Employee';
import { healthDirectory } from 'src/app/Shared/Models/healthDirectory';
import { Manufacturer } from 'src/app/Shared/Models/Manufacturer';
import { Origin } from 'src/app/Shared/Models/Origin';
import { Priority } from 'src/app/Shared/Models/Priority';
import { Status } from 'src/app/Shared/Models/Status';
import { SubCategory } from 'src/app/Shared/Models/SubCategory';
import { Supplier } from 'src/app/Shared/Models/Supplier';
import { Equipment } from 'src/app/Shared/Models/Equipment';
import { HealthCareUnit } from 'src/app/Shared/Models/HealthCareUnit';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';




// import { StatusServiceService } from '../../Shared/services/status-service.service'

import { MasterequipmentService } from 'src/app/Shared/services/masterequipment.service';


import { SharedService } from 'src/app/Shared/services/shared.service';
import { HealthDistrict } from 'src/app/Shared/Models/HealthDistrict';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MasterEquipment } from 'src/app/Shared/Models/MasterEquipment';

import { UserService } from 'src/app/Shared/services/user.service';
import { User } from 'src/app/Shared/Models/User';
import { EquipmentAttachments } from 'src/app/Shared/Models/EquipmentAttachments';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Inventory } from 'src/app/Shared/Models/Inventory';
import { environment } from 'src/environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';




@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`]
})
export class NewEquipmentComponent implements OnInit {
  equipmentDialog: boolean;
  equipments: Equipment[];
  masterEquipment: MasterEquipment[];
  equipmentObj: Equipment;
  submitted: boolean;
  healthCareUnitsList: HealthCareUnit[];
  healthCareUnitsListByDistrictId: HealthCareUnit[];
  statusList: Status[];
  priorityList: Priority[];
  manufacturerList: Manufacturer[];
  originsList: Origin[];
  categoriesList: Category[];
  subCategoriesList: SubCategory[];
  departmentsList: Department[];
  suppliersList: Supplier[];
  employees: any[] = [];
  employee: Employee;
  employeesList: Employee[];
  EquipmentEmployessList: Employee[];
  healthDirectoriesList: healthDirectory[];
  HealthDistrictsList: HealthDistrict[];
  healthDirectory: healthDirectory;
  uploadedFiles: string[] = [];
  opened: boolean;
  items = [];
  index: number = 0;
  isNextvalid: boolean = false;
  isPrevvalid: boolean = true;
  lang: string;
  IDs: number[] = [];
  Names: any[];
  EquipAttachs: EquipmentAttachments[];
  equipmentform: FormGroup;
  public progress: number;
  public message: string;
  public response: { dbPath: '' };
  currentUser: User
  users: User[];
  TecniciensList = [];
  public value;
  eqId: number;
  invent: Inventory
  private baseUrl: 'http://localhost:51368/api/QRCoder/Index/'
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient, private equipmentService: EquipmentService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private masterEquipmentService: MasterequipmentService,
    private userService: UserService,

    // private masterEquipmentService:MasterEquipmentService,

    // private masterEquipmentService:MasterEquipmentService,

    // private masterEquipmentService:MasterEquipmentService,
    private translate: TranslateService) {
    this.currentUser = this.userService.currentUserValue;
    this.items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
    // this.fillSubCategory();

    // private fb: FormBuilder,
    //  private messageService: MessageService
    //   this.fillSubCategory();
  }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  dropdownSettings:IDropdownSettings;
  ngOnInit() {
    this.TecniciensList = []
    this.EquipmentEmployessList = [];
    this.employeesList = []
    console.log('Ay7aga', this.equipmentObj);
    this.equipmentObj = {
      id: 0,
      equipmentDescription: '',
      equipmentName: "",
      equipmentDescriptionAr: '',
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
      employeeIDs: [],
      AttachmentIDs: [],
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
      masterEquipmentId: 0,
      qrImgPath: '',
      createdAt:new Date(),

      organizationName:'',
      organizationNameAr:'',
      time:'',
      recallNumber:0,
      recallDate:new Date(),
      organizationId:0,
      contractRequestId:0,
      organizationrequestid:0,
      contractid:0
    }
    // this.invent = {

    //   equipmentId: 0,
    //   id: 0,
    //   userId: '',
    //   userName:'',
    //   equipmentCode: '',
    //   createdAt: new Date

    // };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };   
    // console.log(this.equipmentObj.imgPath)
    this.openNew()
    this.show()

  }
  onItemSelect(item: User) {
    console.log(item);
    this.equipmentObj.employeeIDs.push(item.id);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(item){
    console.log(item)
    for(var i=0;i<this.equipmentObj.employeeIDs.length;i++){
      if(this.equipmentObj.employeeIDs[i]==item.id){
        this.equipmentObj.employeeIDs.splice(i,1)
  
        console.log(this.equipmentObj.employeeIDs.length)
      }
    }
    console.log(this.equipmentObj.employeeIDs)
  }
  // checkCheckBoxvalue(event) {
  //   //  console.log("object", this.equipmentObj.employeeIDs);
  //   var index = this.equipmentObj.employeeIDs.length;
  //   if (event.value.length === index + 1) {
  //     if (event.itemValue.id === event.value[index].id) {
  //       this.equipmentObj.employeeIDs.push(event.value[index].id);
  //       //     console.log("after push", this.equipmentObj.employeeIDs);
  //     }
  //   }
  //   else {
  //     var ind = this.equipmentObj.employeeIDs.indexOf(event.itemValue.id);
  //     this.equipmentObj.employeeIDs.splice(ind, 1);
  //     //   console.log("after remove", this.equipmentObj.employeeIDs);
  //   }
  // }
  openNew() {
    this.TecniciensList=[]
    this.value = this.equipmentObj.serialNumber
    this.equipmentDialog = true
    this.submitted = false;
    this.sharedService.getAllunits().subscribe(data => { this.healthCareUnitsList = data,
      console.log("this.healthCareUnitsList",this.healthCareUnitsList) });
    // this.equipmentform = this.fb.group({
    //   'equipmentName': new FormControl('', Validators.required)
    // })

    this.sharedService.getAllstatuses().subscribe(data => { this.statusList = data });
    this.sharedService.getAllpriorities().subscribe(data => { this.priorityList = data });
    this.sharedService.getAllmanufacturer().subscribe(data => { this.manufacturerList = data });
    this.sharedService.getAllOrigins().subscribe(data => { this.originsList = data });
    this.sharedService.getAllCategories().subscribe(data => { this.categoriesList = data });
    this.sharedService.getAllDepartments().subscribe(data => { this.departmentsList = data ,console.log("this.departmentsList",this.departmentsList)});
    this.sharedService.getAllSuppliers().subscribe(data => { this.suppliersList = data });
    this.userService.getUsers().subscribe(data => {
      this.users = data,
      console.log(this.users,this.currentUser.roleName)
        this.users.forEach(element => {
          if (this.currentUser.roleName == 'Hospital') {
            console.log(element.healthCareUnitId,this.currentUser.healthCareUnitId)
            if ((element.healthCareUnitId == this.currentUser.healthCareUnitId) && element.roleName == 'Technician') {
              console.log(element.roleName)
              this.TecniciensList.push(element)
              this.users = this.TecniciensList
              console.log("iiiiiii",this.TecniciensList)
            }
           
          }
        })
    });
    this.sharedService.getAllHealthDirectories().subscribe(data => { this.healthDirectoriesList = data });

    this.masterEquipmentService.getAll().subscribe(data => {
      this.masterEquipment = data;
      //console.log("masterEquipment", this.masterEquipment) 
    });

  }
  hideDialog() {
    //   console.log("inside hide");
    this.equipmentDialog = false;
    this.submitted = false;
    this.router.navigate(['/home/equipmentsList/'])
  }
  show() {
    this.opened = false;
  }
  saveProduct(myform: NgForm) {
    //  console.log("inside Save");
    this.submitted = true;
    this.equipmentDialog = false;
    //this.addEquipment();

    // window.location.reload();
  }

  addEquipment() {
    console.log(this.equipmentObj)
    // this.equipmentService.getAllAttachWithNoEquipment().subscribe(data => {
    //   this.EquipAttachs = data;
    //   this.EquipAttachs.forEach(element => {
    //     this.IDs.push(element.id);
    //   });
    //  this.equipmentObj.AttachmentIDs = this.IDs;

    if(this.currentUser.roleName=="Hospital" || this.currentUser.roleName=="Technician")
    {
      console.log("this.currentUser.healthCareUnitId",this.currentUser.healthCareUnitId)
      this.equipmentObj.healthCareUnitId=this.currentUser.healthCareUnitId;
    }
      this.equipmentService.addNewEquipments(this.equipmentObj).subscribe(data => {
        this.equipmentObj = data,
          this.eqId = this.equipmentObj.id
      //  this.router.navigate(['/home/equipmentsList/']);
      });
    // });

  }

  fillDistrictAndDirectory(id: number) {

    //this.sharedService.getAllHealthDistricts(id).subscribe(data => { this.HealthDistrictsList = data });
  }
  fillSubCategory(id: number) {
    this.sharedService.getAllSubCategories(id).subscribe(data => {
      this.subCategoriesList = data;
      // console.log("subcat", this.subCategoriesList);
    });
  }

  fillHealthCareUnit() {
    this.sharedService.getAllunitsByDistrictId(this.equipmentObj.healthDistrictId).subscribe(data => {
       this.healthCareUnitsListByDistrictId = data, console.log("units by districtId", data) });

  }
  // onDrop(event: any) {
  //   console.log(event);
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // your code goes here after droping files or any
  // }

  // onDragOver(evt) {
  //   console.log(evt);

  //   evt.preventDefault();
  //   evt.stopPropagation();
  // }

  // onDragLeave(evt) {
  //   console.log(evt);

  //   evt.preventDefault();
  //   evt.stopPropagation();
  // }

  // upload(event:any) {
  // //  console.log("file",event);
  //   for (let file of event.files) {
  //       this.uploadedFiles.push(file.name);
  //       //  const formData= new FormData();
  //       //  formData.append('file', event.files[0]);
  //       //  console.log("formData",formData);      
  //  }
  //   this.equipmentService.getEquipmentAttachmentIDs(this.uploadedFiles).subscribe(data=>{
  //     this.IDs=data;
  //     console.log("IDDDDs",this.IDs);
  //   });
  // //  let fileToUpload = <File>files[0];
  //   console.log("fileToUpload",this.uploadedFiles);
  //  // console.log("elements",this.uploadedFiles);

  //   //this.equipmentObj.AttachmentIDs=
  // }

  // public upload = (files) => {
  //   console.log("in upload files");
  //   if (files.length === 0) {
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   this.http.post('http://localhost:51368/api/ImgUpload/', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       console.log("subscribe");
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //         console.log("filesssss",fileToUpload.name);
  //       }
  //       console.log("files",fileToUpload.name);
  //     });

  // }
  // upload($event)
  // {
  //   console.log("eeeevent",$event);
  // }
  // public createImgPath = (serverPath: string) => {
  //   return `http://localhost:51368/api/Attachments/upload/${serverPath}`;
  // }
  // public uploadFinished = (event) => {
  //   console.log("finished upload");
  //   this.response = event;
  // }
  Next() {
    this.index++;
    if (this.index === 4) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
   
  }
  Previous() {
    this.index--;
    if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }
 
  }
  handleChange(e) {
    this.index = e.index;
    if (this.index === 4) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
    else if (this.index === 0) {
      this.isNextvalid = false;
      this.isPrevvalid = true;
    }

  }
  NextAndSave()
  {
    console.log("in save")
    this.index++;
    this.addEquipment();
    if (this.index === 4) {
      this.isNextvalid = true;
      this.isPrevvalid = false;
    }
  }
  onSelectEvent(event) {
    console.log("Selected files", event);
  }
}


