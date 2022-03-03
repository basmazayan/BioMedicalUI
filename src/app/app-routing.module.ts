import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { EquipmentsListComponent } from './Components/equipment/equipments-list/equipments-list.component';
// import { EquipmentListComponent } from './Components/equipment-list/equipment-list.component';
import { NavbarComponent } from './Components/Layout/navbar/navbar.component';
import { NewEquipmentComponent } from './Components/equipment/new-equipment/new-equipment.component';
import { ServiceRequestAddComponent } from './Components/serviceRequest/service-request-add/service-request-add.component';
import { ServiceRequestListComponent } from 'src/app/Components/serviceRequest/service-request-list/service-request-list.component';
import { QrGeneratorComponent } from 'src/app/Components/qr-generator/qr-generator.component';
import { RegisterComponent } from 'src/app/Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { EquipmentListComponent } from './Components/equipment-list/equipment-list.component';
import { EmployeesListComponent } from './Components/employee/employees-list/employees-list.component';
import { NewEmployeeComponent } from './Components/employee/new-employee/new-employee.component';
import { UserListComponent } from './Components/user/user-list/user-list.component';
import { NewUserComponent } from './Components/user/new-user/new-user.component';
import { WorkOrderListComponent } from './Components/work-order-list/work-order-list/work-order-list.component';
import { AuthGuard } from './auth/auth.guard';
import { EquipmentUserGuard } from './equipment_user/equipment-user.guard'
import { ProfileComponent } from './Components/profile/profile.component';
import { EquipmentCategoriesComponent } from './Components/EquipmentCategory/equipment-categories/equipment-categories.component';
import { NewCategoryComponent } from './Components/EquipmentCategory/new-category/new-category.component';
import { SubCategoriesComponent } from './Components/SubCategories/sub-categories/sub-categories.component';
import { NewSubCategoryComponent } from './Components/SubCategories/new-sub-category/new-sub-category.component';
import { OriginsListComponent } from './Components/origin/origins-list/origins-list.component';
import { NewOriginComponent } from './Components/origin/new-origin/new-origin.component';
import { ManufacturerListComponent } from './Components/Manufacturer/manufacturer-list/manufacturer-list.component';
import { NewManufacturerComponent } from './Components/Manufacturer/new-manufacturer/new-manufacturer.component';
import { PrioritiesListComponent } from './Components/Priority/priorities-list/priorities-list.component';
import { NewPriorityComponent } from './Components/Priority/new-priority/new-priority.component';
import { DepartmentsListComponent } from './Components/Department/departments-list/departments-list.component';
import { NewDepartmentComponent } from './Components/Department/new-department/new-department.component';
import { StatusesListComponent } from './Components/Status/statuses-list/statuses-list.component';
import { NewStatusComponent } from './Components/Status/new-status/new-status.component';
import { SuppliersListComponent } from './Components/Supplier/suppliers-list/suppliers-list.component';
import { NewSupplierComponent } from './Components/Supplier/new-supplier/new-supplier.component';
import { ModesListComponent } from './Components/Mode/modes-list/modes-list.component';
import { NewModeComponent } from './Components/Mode/new-mode/new-mode.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { MasterEquipment } from './Shared/Models/MasterEquipment';
import { NewMasterEquipmentComponent } from './Components/MasterEquipment/new-master-equipment/new-master-equipment.component';
import { MasterEquipmentListComponent } from './Components/MasterEquipment/master-equipment-list/master-equipment-list.component';
import { AddWorkOrderComponent } from './Components/work-order-list/add-WorkOrder/add-work-order/add-work-order.component';
import { AddWorkOrderWithoutRequestComponent } from './Components/work-order-list/add-work-order-without-request/add-work-order-without-request.component';
import { SlaComponent } from './Components/Maintenence/sla/sla.component';
import { EquipmentMainteneceComponent } from './Components/Maintenence/equipment-maintenece/equipment-maintenece.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ContractsListComponent } from './Components/Contract/contracts-list/contracts-list.component';
import { HealthUnitsListComponent } from './Components/HealthCareUnits/health-units-list/health-units-list.component';
import { NewhealthUnitComponent } from './Components/HealthCareUnits/newhealth-unit/newhealth-unit.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ECRIListComponent } from './Components/ecri-Code/ecri-list/ecri-list.component';
import { ECRIComponent } from './Components/ecri-Code/ecri/ecri.component';
import { AddOrganizationComponent } from './Components/Organization/add-organization/add-organization.component';
import { OrganizationListComponent } from './Components/Organization/organization-list/organization-list.component';
import { NewSubOrganizationComponent } from './Components/SubOrganization/new-sub-organization/new-sub-organization.component';
import { SubOrganizationListComponent } from './Components/SubOrganization/sub-organization-list/sub-organization-list.component';
import { EquipmentDetailsComponent } from './Components/equipment/equipment-details/equipment-details.component';
//import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { PdFCreateComponent } from './Components/pd-fcreate/pd-fcreate.component';
import { EquipmentDetailsAdminComponent } from './Components/equipment/equipment-details-admin/equipment-details-admin.component';
import { InventoryListComponent } from './Components/Inventory/inventory-list/inventory-list.component';
import { EquipmentRecallComponent } from './Components/equipment/equipment-recall/equipment-recall.component';
import { ContractRequestComponent } from './Components/ContractRequest/Add-request/contract-request/contract-request.component';
import { InformHospitalComponent } from './Components/InformHospital/inform-hospital/inform-hospital.component';
import { RequestListComponent } from './Components/ContractRequest/request-list/request-list.component';
import { MapComponent } from './Components/Map/map/map.component';
const routes: Routes = [
  // { component: EquipmentsListComponent, path: "home" },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: "equipmentsList",
        component: EquipmentsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "getRequests",
        component: ServiceRequestListComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: "emps",
      //   component: EmployeesListComponent,
      //   canActivate:[AuthGuard]
      // },
      {
        path: "users",
        component: UserListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addEquipment",
        component: NewEquipmentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "makeRequest",
        component: ServiceRequestAddComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: "addEmployee",
      //   component: NewEmployeeComponent,
      //   canActivate:[AuthGuard]
      // },
      {
        path: "addUser",
        component: NewUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "qrcode",
        component: QrGeneratorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "workOrders",
        component: WorkOrderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "equipmentCategories",
        component: EquipmentCategoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addCategory",
        component: NewCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addSubCategory",
        component: NewSubCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "equipmentSubCategories",
        component: SubCategoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "origins",
        component: OriginsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addOrigin",
        component: NewOriginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "Manfacturers",
        component: ManufacturerListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addManufacturer",
        component: NewManufacturerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "priorities",
        component: PrioritiesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addpriority",
        component: NewPriorityComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "Statuses",
        component: StatusesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addStatus",
        component: NewStatusComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "Departments",
        component: DepartmentsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addDepartment",
        component: NewDepartmentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "Suppliers",
        component: SuppliersListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addSupplier",
        component: NewSupplierComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "Modes",
        component: ModesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addMode",
        component: NewModeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "workOrders",
        component: WorkOrderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "MasterEquipmentList",
        component: MasterEquipmentListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "AddMasterEquipment",
        component: NewMasterEquipmentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "AddWorkOrder/:id",
        component: AddWorkOrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "AddWorkOrder",
        component: AddWorkOrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "WorkOrderList",
        component: WorkOrderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "AddWorkOrderWithoutRequest",
        component: AddWorkOrderWithoutRequestComponent,
        canActivate: [AuthGuard]

      },

      {
        path: "sla",
        component: SlaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "equipment_Maintenance",
        component: EquipmentMainteneceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "contractsList",
        component: ContractsListComponent,
        canActivate: [AuthGuard]
      }
      , {
        path: "healthUnitsList",
        component: HealthUnitsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "ecrisList",
        component: ECRIListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "addecri",
        component: ECRIComponent,
        canActivate: [AuthGuard]
      }
      , {
        path: "addUnit",
        component: NewhealthUnitComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "AddOganization",
        component: AddOrganizationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "OrganizationList",
        component: OrganizationListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "AddSubOrganization",
        component: NewSubOrganizationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "SubOrganizationList",
        component: SubOrganizationListComponent,
        canActivate: [AuthGuard]
      },
    {
      path:"equipmentRecall",
      component:EquipmentRecallComponent,
      canActivate: [AuthGuard]
    },
      {
        path: "EquipmentDetails/:id",
        component: EquipmentDetailsComponent,
        //canActivate: [AuthGuard]
        // data:{
        //   EquipmentUserGuard
        // }
        canActivate: [EquipmentUserGuard]
      },
      {
        path: "EquipmentDetailsAdminComponent/:id",
        component: EquipmentDetailsAdminComponent,
        //canActivate: [AuthGuard]
        // data:{
        //   EquipmentUserGuard
        // }
        canActivate: [AuthGuard]
      },
      {
        path: "qrCoder",
        component: QrGeneratorComponent
      },

      {
        path: "Inventories",
        component: InventoryListComponent
      },
      {
        path: "ContractRequest",
        component: RequestListComponent
      },
      {
        path: "AddContractRequest",
        component: ContractRequestComponent
      },
      {
        path: "AddContractRequest/:id",
        component: ContractRequestComponent
      },
      {
        path: "AddContractRequest/:id/:vewid",
        component: ContractRequestComponent
      },
      {
        path:"Informhospital",
        component:InformHospitalComponent
      },
      {
        path:"map",
        component:MapComponent
      }
    ]
  }
  ,
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "Register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forgetPassword",
    component: ForgetPasswordComponent
  },
  {
    path: "resetPassword",
    component: ResetPasswordComponent
  },
  {
    path: "pdfCreate",
    component: PdFCreateComponent
  }
  // },
  // {
  //   path:"pdfCreate",
  //   component:PdFCreateComponent
  // }

];
// const JWT_Module_Options: JwtModuleOptions = {
//   config: {
//     tokenGetter: () => {
//       return localStorage.getItem('access_token');
//     },
//     allowedDomains: ['localhost:4200'],
//   }
// };
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }


