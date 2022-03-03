export const environment = {
  production: true,

  GetAllEquipments: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/',
  GetOneEquipment: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/',
  AddNewEquipments: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/',
  DeleteEquipment: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/',
  UpdateEquipment: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/',
  GetAllHealthCareUnits: 'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/',
  DeleteHealthCareUnit: 'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/',
  updateHealthCareUnit: 'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/',
  GetAllHealthCareUnitsByDistrictId: 'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/GetHealthCareUnitsByDistrictId/',
  // GetByDistrictId: 'http://10.10.0.147/BioMedicalAPI/api/employees/getHealthDistrictsByempDistrictId/',
  GetByDirectoryId: 'http://10.10.0.147/BioMedicalAPI/api/HealthDistricts/getHealthDirectoryBydirId/',
  addNewUnit: 'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/',
  GetAllStatuses: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentStatus/',
  GetAllPriorities: 'http://10.10.0.147/BioMedicalAPI/api/Priorities/',
  GetAllManufacturers: 'http://10.10.0.147/BioMedicalAPI/api/Manufacturers/',
  GetAllOrigins: 'http://10.10.0.147/BioMedicalAPI/api/Origins/',
  GetAllCategories: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCategories/',
  GetSubCategories: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentSubCategories/',
  GetAllSubCategories: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentSubCategories/AllSubCategoriesBycategoryId/',
  GetAllDepartments: 'http://10.10.0.147/BioMedicalAPI/api/Departments/',
  GetAllSuppliers: 'http://10.10.0.147/BioMedicalAPI/api/Suppliers/',
  // GetAllEmployees: 'http://10.10.0.147/BioMedicalAPI/api/employees/',
  // AddEmployee: 'http://10.10.0.147/BioMedicalAPI/api/employees/',
  // DeleteEmployee: 'http://10.10.0.147/BioMedicalAPI/api/employees/',
  // UpdateEmployee: 'http://10.10.0.147/BioMedicalAPI/api/employees/',
  GetEquipment: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/',
  UploadImg: 'http://10.10.0.147/BioMedicalAPI/api/ImgUpload/',
  GetAllServiceRequests: 'http://10.10.0.147/BioMedicalAPI/api/ServiceRequests/',
  GetAllRequestsByDirectory: 'http://10.10.0.147/BioMedicalAPI/api/ServiceRequests/GetAllRequestsByDirectory/',
  MakeRequest: 'http://10.10.0.147/BioMedicalAPI/api/ServiceRequests',
  UpdateRequest: 'http://10.10.0.147/BioMedicalAPI/api/ServiceRequests/',
  DeleteRequest: 'http://10.10.0.147/BioMedicalAPI/api/ServiceRequests/',
  Register: 'http://10.10.0.147/BioMedicalAPI/api/authenticate/register/',
  Login: 'http://10.10.0.147/BioMedicalAPI/api/authenticate/Login',
  GetUsers: 'http://10.10.0.147/BioMedicalAPI/api/User/',

  getUserById: 'http://10.10.0.147/BioMedicalAPI/api/User/GetUserById/',
  DeleteUser: 'http://10.10.0.147/BioMedicalAPI/api/User/',
  GetUnregisteredUsers: 'http://10.10.0.147/BioMedicalAPI/api/User/GetUnregisteredUsers/',
  GetAllRoles: 'http://10.10.0.147/BioMedicalAPI/api/User/GetAllRoles/',
  getRoleById: 'http://10.10.0.147/BioMedicalAPI/api/User/GetRoleById/',
  // getEmployeeByMail: 'http://10.10.0.147/BioMedicalAPI/api/Employees/GetEmployeeNyMail/',
  UpdateRole: 'http://10.10.0.147/BioMedicalAPI/api/authenticate/ChangeRole/',
  GetAllHealthDirectories: 'http://10.10.0.147/BioMedicalAPI/api/HealthDirectories/',
  GetAllHealthDitricts: 'http://10.10.0.147/BioMedicalAPI/api/HealthDistricts/AllHealthDistrictsByhealthDirectoryId/',
  GetHealthDitricts: 'http://10.10.0.147/BioMedicalAPI/api/HealthDistricts/',
  GetAllHealthCareUnitById: 'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/',
  GetAllModes: 'http://10.10.0.147/BioMedicalAPI/api/Mode/',
  // GetAllEquimentsByEmp: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetAllEquimentsByEmp/',
  AddNewCategory: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCategories/',
  updateCategory: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCategories/',
  deleteCategory: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCategories/',
  AddNewSubCategory: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentSubCategories/',
  updateSubCategory: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentSubCategories/',
  deleteSubCategory: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentSubCategories/',
  addNewOrigin: 'http://10.10.0.147/BioMedicalAPI/api/Origins/',
  updateOrigin: 'http://10.10.0.147/BioMedicalAPI/api/Origins/',
  deleteOrigin: 'http://10.10.0.147/BioMedicalAPI/api/Origins/',
  addNewManufacturer: 'http://10.10.0.147/BioMedicalAPI/api/Manufacturers/',
  updateManufacturer: 'http://10.10.0.147/BioMedicalAPI/api/Manufacturers/',
  deleteManufacturer: 'http://10.10.0.147/BioMedicalAPI/api/Manufacturers/',
  addNewStatus: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentStatus/',
  updateStatus: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentStatus/',
  deleteStatus: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentStatus/',
  addNewPriority: 'http://10.10.0.147/BioMedicalAPI/api/Priorities/',
  updatePriority: 'http://10.10.0.147/BioMedicalAPI/api/Priorities/',
  deletePriority: 'http://10.10.0.147/BioMedicalAPI/api/Priorities/',
  addNewDepartment: 'http://10.10.0.147/BioMedicalAPI/api/Departments/',
  updateDepartment: 'http://10.10.0.147/BioMedicalAPI/api/Departments/',
  deleteDepartment: 'http://10.10.0.147/BioMedicalAPI/api/Departments/',
  addNewSupplier: 'http://10.10.0.147/BioMedicalAPI/api/Suppliers/',
  updateSupplier: 'http://10.10.0.147/BioMedicalAPI/api/Suppliers/',
  deleteSupplier: 'http://10.10.0.147/BioMedicalAPI/api/Suppliers/',
  addNewMode: 'http://10.10.0.147/BioMedicalAPI/api/Mode/',
  updateMode: 'http://10.10.0.147/BioMedicalAPI/api/Mode/',
  deleteMode: 'http://10.10.0.147/BioMedicalAPI/api/Mode/',
  // GetEmployee: 'http://10.10.0.147/BioMedicalAPI/api/employees/',
  // GetEquipmentEmployee: 'http://10.10.0.147/BioMedicalAPI/api/Employees/GetEquipmentemployees/',
  CreateRoles: 'http://10.10.0.147/BioMedicalAPI/api/User/CreateRoles/',
  AddNewMasterEquipments: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/',
  GetAllMasterEquipment: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/',
  UpdateMasterEquipment: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/',
  DeleteMasterEquipment: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/',
  GetVendors: 'http://10.10.0.147/BioMedicalAPI/api/Vendor',
  AddNewWorkOrder: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder',
  AddNewMaintenance: 'http://10.10.0.147/BioMedicalAPI/api/Maintenance',
  AddNewSparePart: 'http://10.10.0.147/BioMedicalAPI/api/SparePart',
  GetAllRequestStatus: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/GetAllRequestStatus',
  deleteWorkOrder: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/',
  createNewStatus: 'http://10.10.0.147/BioMedicalAPI/api/ServiceRequests/createRequestStatus',
  getAllOworkOrders: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/',
  GetMaintenance: 'http://10.10.0.147/BioMedicalAPI/api/Maintenance/',
  getOneWorkOrder: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/',
  GetSparePart: 'http://10.10.0.147/BioMedicalAPI/api/SparePart/',
  UpdateWorkOrder: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/',
  UpdateMaintenance: 'http://10.10.0.147/BioMedicalAPI/api/Maintenance/',
  DeleteWorkOrder: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/',
  AddWorkOrderWithoutRequest: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/AddWorkOrderWithoutRequest',
  getOrdersWithoutRequest: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/GetAllOrdersWithoutRequest',
  Closeorder: 'http://10.10.0.147/BioMedicalAPI/api/WorkOrder/CloseWorkOrder/',
  forgetPassword: 'http://10.10.0.147/BioMedicalAPI/api/Authenticate/forgetPassword/',
  resetpassword: 'http://10.10.0.147/BioMedicalAPI/api/Authenticate/ResetPassword/',
  GetAllContracts: 'http://10.10.0.147/BioMedicalAPI/api/contract/',
  AddContract: 'http://10.10.0.147/BioMedicalAPI/api/contract/',
  DeleteContract: 'http://10.10.0.147/BioMedicalAPI/api/contract/',
  UpdateContract: 'http://10.10.0.147/BioMedicalAPI/api/contract/',
  GetAllEquipmentCoverages: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCoverage/',
  AddEquipmentCoverage: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCoverage/',
  DeleteEquipmentCoverage: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCoverage/',
  UpdateEquipmentCoverage: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentCoverage/',
  GetAllSpareParts: 'http://10.10.0.147/BioMedicalAPI/api/SparePart/',
  AddSparePart: 'http://10.10.0.147/BioMedicalAPI/api/SparePart/',
  DeleteSparePart: 'http://10.10.0.147/BioMedicalAPI/api/SparePart/',
  UpdateSparePart: 'http://10.10.0.147/BioMedicalAPI/api/SparePart/',
  GetAllecriCodes: 'http://10.10.0.147/BioMedicalAPI/api/ecri/',
  updateEcriCode: 'http://10.10.0.147/BioMedicalAPI/api/ecri/',
  deleteEcriCode: 'http://10.10.0.147/BioMedicalAPI/api/ecri/',
  addEcriCode: 'http://10.10.0.147/BioMedicalAPI/api/ecri/',
  addNewecri: 'http://10.10.0.147/BioMedicalAPI/api/ecri/',
  GetAllOrganization: 'http://10.10.0.147/BioMedicalAPI/api/Organization/',
  AddOrganization: 'http://10.10.0.147/BioMedicalAPI/api/Organization/',
  DeleteOrganization: 'http://10.10.0.147/BioMedicalAPI/api/Organization/',
  UpdateOrganization: 'http://10.10.0.147/BioMedicalAPI/api/Organization/',
  GetOrganization: 'http://10.10.0.147/BioMedicalAPI/api/Organization/',
  GetHealthDirectoryIdByName: 'http://10.10.0.147/BioMedicalAPI/api/HealthDirectories/GetHealthDirectoryIdByName/',
  GetAllUsersByOrganizationId: 'http://10.10.0.147/BioMedicalAPI/api/AllUsersByOrganizationId/',
  GetAllUsersByHealthcareunitId: 'http://10.10.0.147/BioMedicalAPI/api/AllUsersByHealthcareunitId/',
  GetAllUsersByhealthDirectoryId: 'http://10.10.0.147/BioMedicalAPI/api/AllUsersByhealthDirectoryId/',
  GetAllUsersByhealthDistrictId: 'http://10.10.0.147/BioMedicalAPI/api/AllUsersByhealthDistrictId/',
  GetAllHealthDitrictsByDirectoryName: 'http://10.10.0.147/BioMedicalAPI/api/HealthDistricts/AllHealthDistrictsByhealthDirectoryName/',
  GetEquipmentAttachmentIDs: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentAttachments/upload/',
  GetEquipmentAttachments: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentAttachments/getEquipAttachmentsWithNoEquipment',
  GetImagePath: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentAttachments/getPathOfImage/',
  DeleteAttach: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentAttachments/',
  GetAttachmentsForMasterEquipment: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipmentAttachment/getAttachmentsWithNoMasterEquipment/',
  GetMasterEquipmentAttachmentIDs: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipmentAttachment/Masterupload/',
  GetAttachmentsForMEquipment: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipmentAttachment/getAttachmentsForMasterEquipment/',
  DeleteMasterAttach: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipmentAttachment/',
  getMasterByBrand: "http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/GetMasterByBrands/",
  GetEquipmentBymaster: "http://10.10.0.147/BioMedicalAPI/api/Equipments/GetmasterEquipment/",
  GetALLSubOrganization: 'http://10.10.0.147/BioMedicalAPI/api/subOrganization/',
  AddNewSubOrganization: 'http://10.10.0.147/BioMedicalAPI/api/subOrganization/',
  updateSubOrganization: 'http://10.10.0.147/BioMedicalAPI/api/subOrganization/',
  deleteSubOrganization: 'http://10.10.0.147/BioMedicalAPI/api/subOrganization/',
  GetSubOrganization: 'http://10.10.0.147/BioMedicalAPI/api/subOrganization/',
  GetAttachmentsForEquipment: 'http://10.10.0.147/BioMedicalAPI/api/EquipmentAttachments/getEquipAttachmentsForEquipment/',
  GetEquipmentEmployee: 'http://10.10.0.147/BioMedicalAPI/api/User/GetEquipmentemployees/',
  GetUsersByEquipmentId: 'http://10.10.0.147/BioMedicalAPI/api/user/GetEquipmentemployees/',
  GetAllByHospital: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipmentByHospital/',
  CreateQr: 'http://10.10.0.147/BioMedicalAPI/api/QRCoder/Index/',
  AddInInventory:'http://10.10.0.147/BioMedicalAPI/api/Inventory/',
  getAllInventories:'http://10.10.0.147/BioMedicalAPI/api/Inventory/',
  GetEquipmentsOnGovernorate:'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipByGovernorate/',
  GetEquipmentsOnCity:'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipByDistrict/',
  GetEquipmentsOnOrganization:'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipByOrganization/',
  GetEquipmentsOnSupplier:'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipBySupplier/',
  FilterData:'http://10.10.0.147/BioMedicalAPI/api/Equipments/FilterEquipment/',
  GetHealthDistrictsIdbyName:'http://10.10.0.147/BioMedicalAPI/api/HealthDistricts/GetHealthDistrictsIdbyName/',
  GetAllEquipmentswithscanningDate:'http://10.10.0.147/BioMedicalAPI/api/Equipments/scanningDate/',
  GetAllscannedequipments:'http://10.10.0.147/BioMedicalAPI/api/Equipments/group',
  GetAllEquipmentsforinventory: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/inventories/', 
  addEquipmentRecall:'http://10.10.0.147/BioMedicalAPI/api/EquipmentRecall',
  GetAllRecalledEquipments:'http://10.10.0.147/BioMedicalAPI/api/Equipments/recalledEqs',
  getEquipmentInHospital:'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipmentInHospital/',
  AddContractRequest:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/',
  AddOrganizationContractRequest:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/AddOrganizationRequest/',
  getHosForOrganization:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/GethospitalsInOrganization/',
  getRequestbetweenDates:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/getRequestBetweenDates/',
  getRequestForUPA:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/getRequestForUPA/',
  getEquipmentInContract:'http://10.10.0.147/BioMedicalAPI/api/Equipments/getEquipmentInContract/',
  getOneContract:'http://10.10.0.147/BioMedicalAPI/api/Contract/',
  EquipmentInContract:'http://10.10.0.147/BioMedicalAPI/api/Equipments/EquipmentInContract/',
  getEquipmentsInContract:'http://10.10.0.147/BioMedicalAPI/api/Equipments/getEquipmentsInContract/',
  getRequestInHospitals:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/GetRequestInHospital/',
  getCountOfRequestInHospital:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/getcount/',
  updateRequestStatus:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/UpdateRequestStatus/',
  getRequest:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/getRequest/',
  updateContractRequest:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/PutContractRequest/',
  getEquipmentInHospitalToEdit:'http://10.10.0.147/BioMedicalAPI/api/Equipments/getEquipmentInHospitalToEdit/',
  delete:'http://10.10.0.147/BioMedicalAPI/api/ContractRequest/Delete/',
  getEquipmentcount:'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/getcount/',
  GetAllEquipmentWithPaging: 'http://10.10.0.147/BioMedicalAPI/api/Equipments/GetEquipmentsWithPaging/',
  arcgisServerUrl: 'http://10.10.0.147/arcgis/rest/services/',
  GetAllMasterEquipmentWithPaging: 'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/GetMasterEquipmentsWithPaging/',
  getcount:'http://10.10.0.147/BioMedicalAPI/api/MasterEquipment/getcount/',
  getOrganizationscount:'http://10.10.0.147/BioMedicalAPI/api/Organization/getcount',
  GetAllOrganizationWithPaging:'http://10.10.0.147/BioMedicalAPI/api/Organization/GetOrganizationsWithPaging/',
  getUserscount:'http://10.10.0.147/BioMedicalAPI/api/User/getcount/',
  getAllUserswithpaging:'http://10.10.0.147/BioMedicalAPI/api/User/GetUsersWithPaging/',
  GetHospitalsCount:'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/getcount/',
  GetAllHospitalsWithPaging:'http://10.10.0.147/BioMedicalAPI/api/HealthCareUnits/GetHospitalsWithPaging',
  getSubOrgscount:'http://10.10.0.147/BioMedicalAPI/api/subOrganization/getcount',
  GetAllSubOrgsWithPaging:'http://10.10.0.147/BioMedicalAPI/api/subOrganization/GetSubOrgsWithPaging/',
  APIUrl: 'http://10.10.0.147/BioMedicalAPI/api/',
  // Drug: 'http://localhost:51563/api/drugs/',
  /********************************************************************/


  // GetAllEquipments: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/',
  // GetOneEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/',
  // GetEquipmentAttachmentIDs:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/upload/',
  // //upload:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/upload/',
  // GetEquipmentAttachments:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/getEquipAttachmentsWithNoEquipment',
  // AddNewEquipments: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/',
  // DeleteEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/',
  // UpdateEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/',
  // GetAllHealthCareUnits: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthCareUnits/',
  // DeleteHealthCareUnit: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthCareUnits/',
  // updateHealthCareUnit: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthCareUnits/',
  // GetAllHealthCareUnitsByDistrictId: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthCareUnits/GetHealthCareUnitsByDistrictId/',
  // GetByDirectoryId:'http://biomedicalupd-001-site1.itempurl.com/api/HealthDistricts/getHealthDirectoryBydirId/',
  // addNewUnit: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthCareUnits/',
  // GetAllStatuses: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentStatus/',
  // GetAllPriorities: 'http://biomedicalupd-001-site1.itempurl.com/api/Priorities/',
  // GetAllManufacturers: 'http://biomedicalupd-001-site1.itempurl.com/api/Manufacturers/',
  // GetAllOrigins: 'http://biomedicalupd-001-site1.itempurl.com/api/Origins/',
  // GetAllCategories: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCategories/',
  // GetSubCategories: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentSubCategories/',
  // GetAllSubCategories: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentSubCategories/AllSubCategoriesBycategoryId/',
  // GetAllDepartments: 'http://biomedicalupd-001-site1.itempurl.com/api/Departments/',
  // GetAllSuppliers: 'http://biomedicalupd-001-site1.itempurl.com/api/Suppliers/',
  // GetEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/',
  // UploadImg: 'http://biomedicalupd-001-site1.itempurl.com/api/ImgUpload/',
  // GetAllServiceRequests: 'http://biomedicalupd-001-site1.itempurl.com/api/ServiceRequests/',
  // GetAllRequestsByDirectory: 'http://biomedicalupd-001-site1.itempurl.com/api/ServiceRequests/GetAllRequestsByDirectory/',
  // MakeRequest: 'http://biomedicalupd-001-site1.itempurl.com/api/ServiceRequests',
  // UpdateRequest: 'http://biomedicalupd-001-site1.itempurl.com/api/ServiceRequests/',
  // DeleteRequest: 'http://biomedicalupd-001-site1.itempurl.com/api/ServiceRequests/',
  // Register: 'http://biomedicalupd-001-site1.itempurl.com/api/authenticate/register/',
  // Login: 'http://biomedicalupd-001-site1.itempurl.com/api/authenticate/login/',
  // GetUsers: 'http://biomedicalupd-001-site1.itempurl.com/api/User/',
  // getUserscount:'http://biomedicalupd-001-site1.itempurl.com/api/User/getcount/',
  // getAllUserswithpaging:'http://biomedicalupd-001-site1.itempurl.com/api/User/GetUsersWithPaging/',
  // getUserById: 'http://biomedicalupd-001-site1.itempurl.com/api/User/GetUserById/',
  // DeleteUser: 'http://biomedicalupd-001-site1.itempurl.com/api/User/',
  // GetUnregisteredUsers: 'http://biomedicalupd-001-site1.itempurl.com/api/User/GetUnregisteredUsers/',
  // GetAllRoles: 'http://biomedicalupd-001-site1.itempurl.com/api/User/GetAllRoles/',
  // getRoleById: 'http://biomedicalupd-001-site1.itempurl.com/api/User/GetRoleById/',
  // getEmployeeByMail: 'http://biomedicalupd-001-site1.itempurl.com/api/Employees/GetEmployeeNyMail/',
  // UpdateRole: 'http://biomedicalupd-001-site1.itempurl.com/api/authenticate/ChangeRole/',
  // GetAllHealthDirectories: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthDirectories/',
  // GetAllHealthDitricts: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthDistricts/AllHealthDistrictsByhealthDirectoryId/',
  // GetAllHealthDitrictsByDirectoryName: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthDistricts/AllHealthDistrictsByhealthDirectoryName/',
  // GetHealthDirectoryIdByName:'http://biomedicalupd-001-site1.itempurl.com/api/HealthDirectories/GetHealthDirectoryIdByName/',
  // GetHealthDistrictsIdbyName:'http://biomedicalupd-001-site1.itempurl.com/api/HealthDistricts/GetHealthDistrictsIdbyName/',
  // GetHealthDitricts: 'http://biomedicalupd-001-site1.itempurl.com/api/HealthDistricts/',
  // GetAllHealthCareUnitById:'http://biomedicalupd-001-site1.itempurl.com/api/HealthCareUnits/',
  // GetAllModes: 'http://biomedicalupd-001-site1.itempurl.com/api/Mode/',
  // GetAllEquimentsByEmp: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetAllEquimentsByEmp/',
  // AddNewCategory: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCategories/',
  // updateCategory: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCategories/',
  // deleteCategory: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCategories/',
  // AddNewSubCategory: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentSubCategories/',
  // updateSubCategory: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentSubCategories/',
  // deleteSubCategory: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentSubCategories/',
  // addNewOrigin: 'http://biomedicalupd-001-site1.itempurl.com/api/Origins/',
  // updateOrigin: 'http://biomedicalupd-001-site1.itempurl.com/api/Origins/',
  // deleteOrigin: 'http://biomedicalupd-001-site1.itempurl.com/api/Origins/',
  // addNewManufacturer: 'http://biomedicalupd-001-site1.itempurl.com/api/Manufacturers/',
  // updateManufacturer: 'http://biomedicalupd-001-site1.itempurl.com/api/Manufacturers/',
  // deleteManufacturer: 'http://biomedicalupd-001-site1.itempurl.com/api/Manufacturers/',
  // addNewStatus: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentStatus/',
  // updateStatus: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentStatus/',
  // deleteStatus: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentStatus/',
  // addNewPriority: 'http://biomedicalupd-001-site1.itempurl.com/api/Priorities/',
  // updatePriority: 'http://biomedicalupd-001-site1.itempurl.com/api/Priorities/',
  // deletePriority: 'http://biomedicalupd-001-site1.itempurl.com/api/Priorities/',
  // addNewDepartment: 'http://biomedicalupd-001-site1.itempurl.com/api/Departments',
  // updateDepartment: 'http://biomedicalupd-001-site1.itempurl.com/api/Departments/',
  // deleteDepartment: 'http://biomedicalupd-001-site1.itempurl.com/api/Departments/',
  // addNewSupplier: 'http://biomedicalupd-001-site1.itempurl.com/api/Suppliers/',
  // updateSupplier: 'http://biomedicalupd-001-site1.itempurl.com/api/Suppliers/',
  // deleteSupplier: 'http://biomedicalupd-001-site1.itempurl.com/api/Suppliers/',
  // addNewMode: 'http://biomedicalupd-001-site1.itempurl.com/api/Mode/',
  // updateMode: 'http://biomedicalupd-001-site1.itempurl.com/api/Mode/',
  // deleteMode: 'http://biomedicalupd-001-site1.itempurl.com/api/Mode/',
  // CreateRoles: 'http://biomedicalupd-001-site1.itempurl.com/api/User/CreateRoles/',
  // AddNewMasterEquipments: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/',
  // GetAllMasterEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/',
  // UpdateMasterEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/',
  // DeleteMasterEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/',
  // GetVendors: 'http://biomedicalupd-001-site1.itempurl.com/api/Vendor',
  // AddNewWorkOrder: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder',
  // AddNewMaintenance: 'http://biomedicalupd-001-site1.itempurl.com/api/Maintenance',
  // AddNewSparePart: 'http://biomedicalupd-001-site1.itempurl.com/api/SparePart',
  // GetAllRequestStatus: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/GetAllRequestStatus',
  // deleteWorkOrder: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/',
  // createNewStatus: 'http://biomedicalupd-001-site1.itempurl.com/api/ServiceRequests/createRequestStatus',
  // getAllOworkOrders: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/',
  // GetMaintenance: 'http://biomedicalupd-001-site1.itempurl.com/api/Maintenance/',
  // getOneWorkOrder: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/',
  // GetSparePart: 'http://biomedicalupd-001-site1.itempurl.com/api/SparePart/',
  // UpdateWorkOrder: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/',
  // UpdateMaintenance: 'http://biomedicalupd-001-site1.itempurl.com/api/Maintenance/',
  // DeleteWorkOrder: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/',
  // AddWorkOrderWithoutRequest: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/AddWorkOrderWithoutRequest',
  // getOrdersWithoutRequest: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/GetAllOrdersWithoutRequest',
  // Closeorder: 'http://biomedicalupd-001-site1.itempurl.com/api/WorkOrder/CloseWorkOrder/',
  // forgetPassword: 'http://biomedicalupd-001-site1.itempurl.com/api/Authenticate/forgetPassword/',
  // resetpassword: 'http://biomedicalupd-001-site1.itempurl.com/api/Authenticate/ResetPassword/',
  // GetAllContracts: 'http://biomedicalupd-001-site1.itempurl.com/api/contract/',
  // AddContract: 'http://biomedicalupd-001-site1.itempurl.com/api/contract/',
  // DeleteContract: 'http://biomedicalupd-001-site1.itempurl.com/api/contract/',
  // UpdateContract: 'http://biomedicalupd-001-site1.itempurl.com/api/contract/',
  // GetAllEquipmentCoverages: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCoverage/',
  // AddEquipmentCoverage: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCoverage/',
  // DeleteEquipmentCoverage: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCoverage/',
  // UpdateEquipmentCoverage: 'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentCoverage/',
  // GetAllSpareParts: 'http://biomedicalupd-001-site1.itempurl.com/api/SparePart/',
  // AddSparePart: 'http://biomedicalupd-001-site1.itempurl.com/api/SparePart/',
  // DeleteSparePart: 'http://biomedicalupd-001-site1.itempurl.com/api/SparePart/',
  // UpdateSparePart: 'http://biomedicalupd-001-site1.itempurl.com/api/SparePart/',
  // GetAllecriCodes:'http://biomedicalupd-001-site1.itempurl.com/api/ecri/',
  // updateEcriCode:'http://biomedicalupd-001-site1.itempurl.com/api/ecri/',
  // deleteEcriCode:'http://biomedicalupd-001-site1.itempurl.com/api/ecri/',
  // addEcriCode:'http://biomedicalupd-001-site1.itempurl.com/api/ecri/',
  // addNewecri:'http://biomedicalupd-001-site1.itempurl.com/api/ecri/',
  // GetAllOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/Organization/',
  // AddOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/Organization/',
  // DeleteOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/Organization/',
  // UpdateOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/Organization/', 
  // GetOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/Organization/',
  // GetAllUsersByHealthcareunitId:'http://biomedicalupd-001-site1.itempurl.com/api/AllUsersByHealthcareunitId/',
  // GetAllUsersByhealthDirectoryId:'http://biomedicalupd-001-site1.itempurl.com/api/AllUsersByhealthDirectoryId/',
  // GetAllUsersByhealthDistrictId:'http://biomedicalupd-001-site1.itempurl.com/api/AllUsersByhealthDistrictId/',
  // GetAllUsersByOrganizationId:'http://biomedicalupd-001-site1.itempurl.com/api/AllUsersByOrganizationId/',
  // GetAllEcris:'http://biomedicalupd-001-site1.itempurl.com/api/Ecri/GetAllEcris',
  // GetALLSubOrganization:' http://biomedicalupd-001-site1.itempurl.com/api/subOrganization/',
  // AddNewSubOrganization: 'http://biomedicalupd-001-site1.itempurl.com/api/subOrganization/',
  // updateSubOrganization: 'http://biomedicalupd-001-site1.itempurl.com/api/subOrganization/',
  // deleteSubOrganization: 'http://biomedicalupd-001-site1.itempurl.com/api/subOrganization/',
  // GetSubOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/subOrganization/',
  // GetAttachmentsForEquipment:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/getEquipAttachmentsForEquipment/',
  // GetEquipmentEmployee: 'http://biomedicalupd-001-site1.itempurl.com/api/User/GetEquipmentemployees/',
  // GetImagePath:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/getPathOfImage/',
  // DeleteAttach:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/',
  // GetAttachmentsForMasterEquipment:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentAttachments/getEquipAttachmentsWithNoEquipment/',
  // GetMasterEquipmentAttachmentIDs:'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipmentAttachment/Masterupload/',
  // GetAttachmentsForMEquipment: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipmentAttachment/getAttachmentsForMasterEquipment/',
  // DeleteMasterAttach: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipmentAttachment/',
  // getMasterByBrand: "http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/GetMasterByBrands/",
  // GetEquipmentBymaster: "http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetmasterEquipment/",
  // GetUsersByEquipmentId: 'http://biomedicalupd-001-site1.itempurl.com/api/user/GetEquipmentemployees/',
  // GetAllByHospital: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetEquipmentByHospital/',
  // CreateQr: 'http://biomedicalupd-001-site1.itempurl.com/api/QRCoder/Index/',
  // AddInInventory:'http://biomedicalupd-001-site1.itempurl.com/api/Inventory/',
  // getAllInventories:'http://biomedicalupd-001-site1.itempurl.com/api/Inventory/',
  // GetEquipmentsOnGovernorate:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetEquipByGovernorate/',
  // GetEquipmentsOnCity:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetEquipByDistrict/',
  // GetEquipmentsOnOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetEquipByOrganization/',
  // GetEquipmentsOnSupplier:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetEquipBySupplier/',
  // FilterData:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/FilterEquipment/',
  // GetAllEquipmentswithscanningDate:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/scanningDate/',
  // GetAllscannedequipments:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/group',
  // GetAllEquipmentsforinventory: 'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/inventories/', 
  // addEquipmentRecall:'http://biomedicalupd-001-site1.itempurl.com/api/EquipmentRecall',
  // GetAllRecalledEquipments:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/recalledEqs',
  // getEquipmentInHospital:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/GetEquipmentInHospital/',
  // AddContractRequest:'http://biomedicalupd-001-site1.itempurl.com/api/ContractRequest/',
  // AddOrganizationContractRequest:'http://biomedicalupd-001-site1.itempurl.com/api/ContractRequest/AddOrganizationRequest/',
  // getHosForOrganization:'http://biomedicalupd-001-site1.itempurl.com/api/ContractRequest/GethospitalsInOrganization/',
  // getRequestbetweenDates:'http://biomedicalupd-001-site1.itempurl.com/api/ContractRequest/getRequestBetweenDates/',
  // getRequestForUPA:'http://biomedicalupd-001-site1.itempurl.com/api/ContractRequest/getRequestForUPA/',
  // getEquipmentInContract:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/getEquipmentInContract/',
  // getOneContract:'http://biomedicalupd-001-site1.itempurl.com/api/Contract/',
  // EquipmentInContract:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/EquipmentInContract/',
  // getEquipmentsInContract:'http://biomedicalupd-001-site1.itempurl.com/api/Equipments/getEquipmentsInContract/',
  // GetAllMasterEquipmentWithPaging: 'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/GetMasterEquipmentsWithPaging/',
  // getcount:'http://biomedicalupd-001-site1.itempurl.com/api/MasterEquipment/getcount/',
};