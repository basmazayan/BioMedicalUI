export class MasterEquipment {
    id: number;
    name: string;
    nameAr: string;
    masterCode: string;
    upaCode: string;
    originId: number;
    originCode:string;
    brandId: number;
    brandName:string;
    brandNameAr:string;
    priorityId: number;
    descriptionAr: string;
    modelNumber: string;
    versionNumber: string;
    expectedLifeTime: number;
    categoryId: number;
    subCategoryId?: number;
    AttachmentIDs:number[];
    Length ?: number;
    Height ?: number;
    Width ?: number;
    Weight ?: number;
    Power : string;
    Voltage : string;
    Ampair : string;
    Frequency : string;
    ElectricRequirement : string;
    PMColor : string;
    PMBGColor : string;

}
