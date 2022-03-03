export class MasterEquipment {
    id: number;
    name: string;
    nameAr: string;
    masterCode: string;
    upaCode: string;
    originId: number;
    originCode:string;
    manufacturerId: number;
    manufacturerName:string;
    manufacturerNameAr:string;
    priorityId: number;
    equipmentDescriptionAr: string;
    modelNumber: string;
    versionNumber: string;
    expectedLifeTime: number;
    equipmentCategoryId: number;
    equipmentSubCategoryId?: number;
    AttachmentIDs:number[];
}
