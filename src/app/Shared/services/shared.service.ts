import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthCareUnit } from '../Models/HealthCareUnit';
import { Status } from '../Models/Status';
import { Priority } from '../Models/Priority';
import { Manufacturer } from '../Models/Manufacturer';
import { Origin } from '../Models/Origin';
import { Category } from '../Models/Category';
import { SubCategory } from '../Models/SubCategory';
import { Department } from '../Models/Department';
import { Supplier } from '../Models/Supplier';
import { Employee } from '../Models/Employee';
import { healthDirectory } from '../Models/healthDirectory';
import { Mode } from '../Models/Mode';
import { HealthDistrict } from '../Models/HealthDistrict';
import { Miantenance } from '../Models/Miantenance';
import { SparePart } from '../Models/SparePart';
import { EcriCode } from '../Models/ecri-code';
import { Paging } from '../Models/Paging';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  getAllunits(): Observable<HealthCareUnit[]> {
    return this.httpClient.get<HealthCareUnit[]>(`${environment.GetAllHealthCareUnits}`, this.httpHeader);
  }
  getunitById(id:Number): Observable<HealthCareUnit> {
    return this.httpClient.get<HealthCareUnit>(`${environment.GetAllHealthCareUnitById}${id}`, this.httpHeader);
  }
  getAllunitsByDistrictId(id:Number): Observable<HealthCareUnit[]> {
    return this.httpClient.get<HealthCareUnit[]>(`${environment.GetAllHealthCareUnitsByDistrictId}${id}`, this.httpHeader);
  }
  // getDistrictBydistrictId(id:Number): Observable<HealthDistrict> {
  //   return this.httpClient.get<HealthDistrict>(`${environment.GetByDistrictId}${id}`, this.httpHeader);
  // }
  getDirectorybydirectoryId(id:number):Observable<healthDirectory>{
    return this.httpClient.get<healthDirectory>(`${environment.GetByDirectoryId}${id}`,this.httpHeader)
  }
  getAllstatuses(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(`${environment.GetAllStatuses}`, this.httpHeader);
  }
  getUserscount():Observable<number>
  {
    return this.httpClient.get<number>(`${environment.getUserscount}`);
  }
  getAllUserswithpaging(page:Paging):Observable<User[]>
  {
    return this.httpClient.put<User[]>(`${environment.getAllUserswithpaging}`,page,this.httpHeader);
  }
  getAllpriorities(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(`${environment.GetAllPriorities}`, this.httpHeader);
  }
  getAllmanufacturer(): Observable<Manufacturer[]> {
    return this.httpClient.get<Manufacturer[]>(`${environment.GetAllManufacturers}`, this.httpHeader);
  }
  getAllOrigins(): Observable<Origin[]> {
    return this.httpClient.get<Origin[]>(`${environment.GetAllOrigins}`, this.httpHeader);
  }
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.GetAllCategories}`, this.httpHeader);
  }
  getSubCategories(): Observable<SubCategory[]> {
    return this.httpClient.get<SubCategory[]>(`${environment.GetSubCategories}`, this.httpHeader);
  }
  getAllSubCategories(id:Number): Observable<SubCategory[]> {
    return this.httpClient.get<SubCategory[]>(`${environment.GetAllSubCategories}${id}`, this.httpHeader);
  }
  getAllDepartments() {
    return this.httpClient.get<Department[]>(`${environment.GetAllDepartments}`, this.httpHeader);
  }
  getAllSuppliers() {
    return this.httpClient.get<Supplier[]>(`${environment.GetAllSuppliers}`, this.httpHeader);
  }
  // getAllEmployees() {
  //   return this.httpClient.get<Employee[]>(`${environment.GetAllEmployees}`, this.httpHeader);
  // }
  getAllHealthDirectories() {
    return this.httpClient.get<healthDirectory[]>(`${environment.GetAllHealthDirectories}`, this.httpHeader);
  }
  // getAllHealthDistricts() {
  //   return this.httpClient.get<HealthDistrict[]>(`${environment.GetAllHealthDitricts}`, this.httpHeader);
  // }
  getAllHealthDistricts(id:Number) {
    return this.httpClient.get<HealthDistrict[]>(`${environment.GetAllHealthDitricts}${id}`, this.httpHeader);
  }
  getAllHealthDistrictsByDirectoryName(name:string) {
    return this.httpClient.get<HealthDistrict[]>(`${environment.GetAllHealthDitrictsByDirectoryName}${name}`, this.httpHeader);
  }
  getDirectoryIdByname(name:string)
  {
    return this.httpClient.get<number>(`${environment.GetHealthDirectoryIdByName}${name}`, this.httpHeader);
  }
  GetHealthDistrictsIdbyName(name:string)
  {
    return this.httpClient.get<number>(`${environment.GetHealthDistrictsIdbyName}${name}`, this.httpHeader);
  }
  getAllHealthDistrict() {
    return this.httpClient.get<HealthDistrict[]>(`${environment.GetHealthDitricts}`, this.httpHeader);
  }
  getAllModes() {
    return this.httpClient.get<Mode[]>(`${environment.GetAllModes}`, this.httpHeader);
  }
  addNewCategory(newCategory: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.AddNewCategory}`, newCategory, this.httpHeader);
  }
  updateCategory(id: Number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${environment.updateCategory}${id}`, category, this.httpHeader);
  }
  deleteCategory(id: Number) {
    return this.httpClient.delete<Category>(`${environment.deleteCategory}${id}`, this.httpHeader);
  }
  addNewSubCategory(newSubCategory: SubCategory): Observable<SubCategory> {
    return this.httpClient.post<SubCategory>(`${environment.AddNewSubCategory}`, newSubCategory, this.httpHeader);
  }
  updateSubCategory(id: Number, subCat: SubCategory): Observable<SubCategory> {
    return this.httpClient.put<SubCategory>(`${environment.updateSubCategory}${id}`, subCat, this.httpHeader);
  }
  deleteSubCategory(id: Number) {
    return this.httpClient.delete<SubCategory>(`${environment.deleteSubCategory}${id}`, this.httpHeader);
  }
  addNewOrigin(originObj: Origin): Observable<Origin> {
    return this.httpClient.post<Origin>(`${environment.addNewOrigin}`, originObj, this.httpHeader);
  }
  updateOrigin(id: Number, originObj: Origin): Observable<Origin> {
    return this.httpClient.put<Origin>(`${environment.updateOrigin}${id}`, originObj, this.httpHeader);
  }
  deleteOrigin(id: Number) {
    return this.httpClient.delete<Origin>(`${environment.deleteOrigin}${id}`, this.httpHeader);
  }
  addNewManufacturer(newManufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.post<Manufacturer>(`${environment.addNewManufacturer}`, newManufacturer, this.httpHeader);
  }
  updateManufacturer(id: Number, manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.put<Manufacturer>(`${environment.updateManufacturer}${id}`, manufacturer, this.httpHeader);
  }
  deleteManufacturer(id: Number) {
    return this.httpClient.delete<Manufacturer>(`${environment.deleteManufacturer}${id}`, this.httpHeader);
  }
  addNewStatus(equipmentStatusObj: Status): Observable<Status> {
    return this.httpClient.post<Status>(`${environment.addNewStatus}`, equipmentStatusObj, this.httpHeader);
  }
 updateStatus(id: Number, equipmentStatusObj: Status): Observable<Status> {
    return this.httpClient.put<Status>(`${environment.updateStatus}${id}`, equipmentStatusObj, this.httpHeader);
  }
  deleteStatus(id: Number) {
    return this.httpClient.delete<Status>(`${environment.deleteStatus}${id}`, this.httpHeader);
  }
    addNewPriority(priorityObj: Priority): Observable<Priority> {
    return this.httpClient.post<Priority>(`${environment.addNewPriority}`, priorityObj, this.httpHeader);
  }
  updatePriority(id: Number, priorityObj: Priority): Observable<Priority> {
    return this.httpClient.put<Priority>(`${environment.updatePriority}${id}`, priorityObj, this.httpHeader);
  }
  deletePriority(id: Number) {
    return this.httpClient.delete<Priority>(`${environment.deletePriority}${id}`, this.httpHeader);
  }
  addNewDepartment(departmentObj: Department): Observable<Department> {
    return this.httpClient.post<Department>(`${environment.addNewDepartment}`, departmentObj, this.httpHeader);
  }
  updateDepartment(id: Number, department: Department): Observable<Department> {
    return this.httpClient.put<Department>(`${environment.updateDepartment}${id}`, department, this.httpHeader);
  }

  deleteDepartment(id: Number) {
    return this.httpClient.delete<Department>(`${environment.deleteDepartment}${id}`, this.httpHeader);
  }
  addNewSupplier(NewSupplier: Supplier): Observable<Supplier> {
    return this.httpClient.post<Supplier>(`${environment.addNewSupplier}`, NewSupplier, this.httpHeader);
  }
  updateSupplier(id: Number, supplier: Supplier): Observable<Supplier> {
    return this.httpClient.put<Supplier>(`${environment.updateSupplier}${id}`, supplier, this.httpHeader);
  }
  deleteSupplier(id: Number) {
    return this.httpClient.delete<Supplier>(`${environment.deleteSupplier}${id}`, this.httpHeader);
  }
  addNewMode(NewMode: Mode): Observable<Mode> {
    return this.httpClient.post<Mode>(`${environment.addNewMode}`, NewMode, this.httpHeader);
  }
  updateMode(id: Number, mode: Mode): Observable<Mode> {
    return this.httpClient.put<Mode>(`${environment.updateMode}${id}`, mode, this.httpHeader);
  }
  deleteMode(id: Number) {
    return this.httpClient.delete<Mode>(`${environment.deleteMode}${id}`, this.httpHeader);
  }
  // getemployee(id:Number){
  //   return this.httpClient.get<Employee>(`${environment.GetEmployee}${id}`, this.httpHeader);
  // }
  AddMaintenance(newMaintenance:Miantenance):Observable<Miantenance>
  {
    return this.httpClient.post<Miantenance>(`${environment.AddNewMaintenance}`, newMaintenance, this.httpHeader);
  }
  AddSparePart(newSparePart:SparePart):Observable<SparePart>
  {
    return this.httpClient.post<SparePart>(`${environment.AddNewSparePart}`, newSparePart, this.httpHeader);
  }
  deleteHealthUnit(id:number){
    return this.httpClient.delete<HealthCareUnit>(`${environment.DeleteHealthCareUnit}${id}`,this.httpHeader)
  }
  updateUnit(id:number,unit:HealthCareUnit): Observable<HealthCareUnit> {
    return this.httpClient.put<HealthCareUnit>(`${environment.updateHealthCareUnit}${id}`,unit,this.httpHeader)
  }
  addNewHealthCareUnit(newUnit:HealthCareUnit)
  {
    return this.httpClient.post<HealthCareUnit>(`${environment.addNewUnit}`,newUnit,this.httpHeader)
  }
getAllEcricodes():Observable<EcriCode[]> {
    return this.httpClient.get<EcriCode[]>(`${environment.GetAllecriCodes}`, this.httpHeader);
}
updateEcriCode(id:number,ecriCode:EcriCode): Observable<EcriCode> {
  return this.httpClient.put<EcriCode>(`${environment.updateEcriCode}${id}`,ecriCode,this.httpHeader)
}
deleteEcriCode(id:number){
  return this.httpClient.delete<EcriCode>(`${environment.deleteEcriCode}${id}`,this.httpHeader)

}
addEcriCode(ecri:EcriCode):Observable<EcriCode>{
  return this.httpClient.post<EcriCode>(`${environment.addNewecri}`,ecri,this.httpHeader)
}
getHospitalscount():Observable<number>
{
  return this.httpClient.get<number>(`${environment.GetHospitalsCount}`);
}
getAllHospitalswithpaging(page:Paging):Observable<HealthCareUnit[]>
{
  return this.httpClient.put<HealthCareUnit[]>(`${environment.GetAllHospitalsWithPaging}`,page,this.httpHeader);
}
}
