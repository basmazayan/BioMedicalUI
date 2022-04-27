// import { StringifyOptions } from "node:querystring";
import { EquipmentEmployees } from "./EquipmentEmployees";

export class Equipment {

    id: number;
    equipmentName: string;
    equipmentNameAr: string;
    installationDate: Date;
    healthCareUnit: string;
    equipmentDescription: string;
    equipmentDescriptionAr: string;
    remarks: string;
    modelNumber: string;
    versionNumber: string;
    serialNumber: string;
    internalCode: string;
    upaCode: string;
    barcode: string;
    purchaseDate: Date;
    price: number;
    expectedLifeTime: number;
    length: number;
    height: number;
    weight: number;
    color: string;
    colorAr: string;
   
    // customizedField:string;
    priorityId: number;
    equipmentCategoryId: number;
    equipmentSubCategoryId: number;
    equipmentStatuSId: number;
    statusName: string;
    statusNameAr: string;
    manufacturerId: number;
    manufacturerName: string;
    manufacturerNameAr: string;
    originId: number;
    healthCareUnitId: number;
    healthCareUnitName: string;
    healthCareUnitNameAr: string;
    healthDirectoryId: number;
    healthDirectoryName: string;
    healthDirectoryNameAr: string;
    healthDistrictId: number;
    healthDistrictName: string;
    healthDistrictNameAr: string;
    supplierId: number;
    supplierName: string;
    supplierNameAr: string;
    departmentId: number;
    departmentName: string;
    departmentNameAr: string;
    room: number;
    floor: number;
    employeeIDs:string[];
    AttachmentIDs:number[];
    masterEquipmentId:number;
    qrImgPath:string;
    createdAt:Date;
    organizationName:string;
    organizationNameAr:string;
    organizationId:number;
    time:string;
    recallDate?:Date;
    recallNumber:number;

    contractRequestId:number;
    organizationrequestid:number;
    contractid:number;
    DepreciationRate:number;
}

export class BrandVM {
    id: number
    brandName: string;
    brandNameAr: string;
    listEquipment: Equipment[];
}


export class EquipmentVM {
    id: number
    name: string;
    nameAr: string;
    brandName: string;
    brandNameAr: string;
    govName: string;
    govNameAr: string;
    districtName: string;
    districtNameAr: string;
    hospitalName: string;
    hospitalNameAr: string;
    organizationName: string;
    organizationNameAr: string;
    supplierName: string;
    supplierNameAr: string;
    purchaseDate: Date;
}
export class HospitalVM {
    id: number
    name: string;
    nameAr: string;
    listEquipment: Equipment[];
}
export class scanningDateVm {
    id: number;
    createdAt: Date;
    listEquipment: Equipment[]
}

    export class GovernorateVM
    {
        id :number;
        name:string;
        nameAr :string;
        listEquipment:Equipment[];
    }
    export class CityVM
    {
        id :number;
        name:string;
        nameAr :string;
        listEquipment:Equipment[];
    }
    export class OrganizationVM
    {
        id :number;
        name:string;
        nameAr :string;
        listEquipment:Equipment[];
    }
    export class SupplierVM
    {
        id :number;
        name:string;
        nameAr :string;
        listEquipment:Equipment[];
    }
    export class filterDto
    {
        id :number;
        name :string;
        brandName :string;
        cityName :string;
        hosName :string;
        govName:string;
        supplierName:string;
        purchaseDate :Date;
    }
    export class scanningequipmentVM{
        id:number;
        equipmentId :number;
        listEquipment:Equipment[]
    }
