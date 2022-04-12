import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'primeng/carousel';
import { NavbarComponent } from './Components/Layout/navbar/navbar.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { EquipmentListComponent } from './Components/equipment-list/equipment-list.component';
import { ButtonModule } from 'primeng/button';
import { EquipmentsListComponent } from './Components/equipment/equipments-list/equipments-list.component';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NewEquipmentComponent } from './Components/equipment/new-equipment/new-equipment.component';
import { SideBarComponent } from './Components/Layout/side-bar/side-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { ServiceRequestListComponent } from './Components/serviceRequest/service-request-list/service-request-list.component';
import { ServiceRequestAddComponent } from './Components/serviceRequest/service-request-add/service-request-add.component';
import { QrGeneratorComponent } from './Components/qr-generator/qr-generator.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { TechnicianListComponent } from './Components/technician-list/technician-list.component';
import { EmployeesListComponent } from './Components/employee/employees-list/employees-list.component';
import { NewEmployeeComponent } from './Components/employee/new-employee/new-employee.component';
import { UserListComponent } from './Components/user/user-list/user-list.component';
import { NewUserComponent } from './Components/user/new-user/new-user.component';
import { WorkOrderListComponent } from './Components/work-order-list/work-order-list/work-order-list.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { EquipmentCategoriesComponent } from './Components/EquipmentCategory/equipment-categories/equipment-categories.component';
import { NewCategoryComponent } from './Components/EquipmentCategory/new-category/new-category.component';
import { NewSubCategoryComponent } from './Components/SubCategories/new-sub-category/new-sub-category.component';
import { SubCategoriesComponent } from './Components/SubCategories/sub-categories/sub-categories.component';
import { NewOriginComponent } from './Components/origin/new-origin/new-origin.component';
import { OriginsListComponent } from './Components/origin/origins-list/origins-list.component';
import { ManufacturerListComponent } from './Components/Manufacturer/manufacturer-list/manufacturer-list.component';
import { NewManufacturerComponent } from './Components/Manufacturer/new-manufacturer/new-manufacturer.component';
import { NewPriorityComponent } from './Components/Priority/new-priority/new-priority.component';
import { PrioritiesListComponent } from './Components/Priority/priorities-list/priorities-list.component';
import { DepartmentsListComponent } from './Components/Department/departments-list/departments-list.component';
import { NewDepartmentComponent } from './Components/Department/new-department/new-department.component';
import { NewStatusComponent } from './Components/Status/new-status/new-status.component';
import { StatusesListComponent } from './Components/Status/statuses-list/statuses-list.component';
import { SuppliersListComponent } from './Components/Supplier/suppliers-list/suppliers-list.component';
import { NewSupplierComponent } from './Components/Supplier/new-supplier/new-supplier.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ModesListComponent } from './Components/Mode/modes-list/modes-list.component';
import { NewModeComponent } from './Components/Mode/new-mode/new-mode.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { NewMasterEquipmentComponent } from './Components/MasterEquipment/new-master-equipment/new-master-equipment.component';
import { MasterEquipmentListComponent } from './Components/MasterEquipment/master-equipment-list/master-equipment-list.component';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
//import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
//import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MasterequipmentService } from './Shared/services/masterequipment.service';
import esriConfig from "@arcgis/core/config.js";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

//import { MasterEquipmentService } from 'src/app/Shared/services/master-equipment.service';

//import { MasterEquipmentService } from 'src/app/Shared/services/master-equipment.service';

//import { MasterEquipmentService } from 'src/app/Shared/services/master-equipment.service';

import { AddWorkOrderComponent } from './Components/work-order-list/add-WorkOrder/add-work-order/add-work-order.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { AddWorkOrderWithoutRequestComponent } from './Components/work-order-list/add-work-order-without-request/add-work-order-without-request.component';


import { MatIconModule } from '@angular/material/icon';
import { SlaComponent } from './Components/Maintenence/sla/sla.component';
import { EquipmentMainteneceComponent } from './Components/Maintenence/equipment-maintenece/equipment-maintenece.component';
import { CaptchaModule } from 'primeng/captcha';
import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { ChartModule } from 'primeng/chart';
import {MatMenuModule} from '@angular/material/menu';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {MatTreeModule} from '@angular/material/tree';
import { CheckboxModule } from 'primeng/checkbox';
import {StepsModule} from 'primeng/steps';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

//import { AngularFontAwesomeModule } from 'angular-font-awesome';



//import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ContractsListComponent } from './Components/Contract/contracts-list/contracts-list.component';
import { HealthUnitsListComponent } from './Components/HealthCareUnits/health-units-list/health-units-list.component';
import { NewhealthUnitComponent } from './Components/HealthCareUnits/newhealth-unit/newhealth-unit.component';
import { TooltipModule } from 'primeng/tooltip';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ECRIComponent } from './Components/ecri-Code/ecri/ecri.component';
import { ECRIListComponent } from './Components/ecri-Code/ecri-list/ecri-list.component';
import { OrganizationListComponent } from './Components/Organization/organization-list/organization-list.component';
import { AddOrganizationComponent } from './Components/Organization/add-organization/add-organization.component';
import { SubOrganizationListComponent } from './Components/SubOrganization/sub-organization-list/sub-organization-list.component';
import { NewSubOrganizationComponent } from './Components/SubOrganization/new-sub-organization/new-sub-organization.component';
import { EquipmentDetailsComponent } from './Components/equipment/equipment-details/equipment-details.component';
// import { PdFCreateComponent } from './Components/pd-fcreate/pd-fcreate.component';
import { PdFCreateComponent } from './Components/pd-fcreate/pd-fcreate.component';
import { EquipmentDetailsAdminComponent } from './Components/equipment/equipment-details-admin/equipment-details-admin.component';
// import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
//import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { InventoryListComponent } from './Components/Inventory/inventory-list/inventory-list.component';
import { EquipmentRecallComponent } from './Components/equipment/equipment-recall/equipment-recall.component';

import { ContractRequestComponent } from './Components/ContractRequest/Add-request/contract-request/contract-request.component';
import {PickListModule} from 'primeng/picklist';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InformHospitalComponent } from './Components/InformHospital/inform-hospital/inform-hospital.component';
import {BadgeModule} from 'primeng/badge';
// import {NgxPaginationModule} from 'ngx-pagination';
import {PaginatorModule} from 'primeng/paginator';
import { RequestListComponent } from './Components/ContractRequest/request-list/request-list.component';
import { MapComponent } from './Components/Map/map/map.component';
import { Storage } from '@ionic/storage-angular';
import { AgmCoreModule } from '@agm/core';
// import { JwPaginationComponent } from 'jw-angular-pagination';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    EquipmentListComponent,
    EquipmentsListComponent,
    NewEquipmentComponent,
    SideBarComponent,
    ServiceRequestListComponent,
    ServiceRequestAddComponent,
    QrGeneratorComponent,
    LoginComponent,
    RegisterComponent,
    TechnicianListComponent,
    EmployeesListComponent,
    NewEmployeeComponent,
    UserListComponent,
    NewUserComponent,
    WorkOrderListComponent,
    ProfileComponent,
    SettingsComponent,
    EquipmentCategoriesComponent,
    NewCategoryComponent,
    NewSubCategoryComponent,
    SubCategoriesComponent,
    NewOriginComponent,
    OriginsListComponent,
    ManufacturerListComponent,
    NewManufacturerComponent,
    NewPriorityComponent,
    PrioritiesListComponent,
    DepartmentsListComponent,
    NewDepartmentComponent,
    NewStatusComponent,
    StatusesListComponent,
    SuppliersListComponent,
    NewSupplierComponent,
    ModesListComponent,
    NewModeComponent,
    NewMasterEquipmentComponent,
    MasterEquipmentListComponent,
    AddWorkOrderComponent,
    AddWorkOrderWithoutRequestComponent,
    SlaComponent,
    EquipmentMainteneceComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ContractsListComponent,
    HealthUnitsListComponent,
    NewhealthUnitComponent,
    DashboardComponent,
    ECRIComponent,
    ECRIListComponent,
    OrganizationListComponent,
    AddOrganizationComponent,
    SubOrganizationListComponent,
    NewSubOrganizationComponent,
    EquipmentDetailsComponent,
    // PdFCreateComponent,
    PdFCreateComponent,
    EquipmentDetailsAdminComponent,
    InventoryListComponent,
    EquipmentRecallComponent,
    // JwPaginationComponent,
    ContractRequestComponent,
      InformHospitalComponent,
      RequestListComponent,
      MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    CardModule,
    ToolbarModule,
    NgbModule,
    CarouselModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    MatDatepickerModule,
    FileUploadModule,
    NgxQRCodeModule,
    OverlayPanelModule,
    TabViewModule,
    MultiSelectModule,
    PanelMenuModule,
    DynamicDialogModule,
    MatIconModule,

    CaptchaModule,
    ToastModule,
    FullCalendarModule,
    SidebarModule,
    SlideMenuModule,
    TooltipModule,
    ChartModule,

    MessagesModule,
    MessageModule,
    TieredMenuModule,
    MatMenuModule,
    MenubarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    DropdownModule,
    MatTreeModule,
    CheckboxModule,
    PickListModule,
    StepsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BadgeModule,
    // NgxPaginationModule,
    PaginatorModule,
  //  AngularFontAwesomeModule,

    //  AngularFontAwesomeModule,
    //  AngularFontAwesomeModule,

    //  AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      // libraries: ["places"],
      apiKey: 'AIzaSyCxvNEG1CRZ0pzoriAujg07y101MbOkFrQ'
    }),
  ],
  providers: [MessageService,
    ConfirmationService,
    AuthGuard,
    DialogService,
    DatePipe,
    Storage,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]


  // providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}]
})
export class AppModule {
  model: NgbDateStruct;
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}