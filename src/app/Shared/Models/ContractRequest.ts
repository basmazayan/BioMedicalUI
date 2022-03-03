import { Equipment } from "./Equipment";

export class ContractRequest {
    id :number;
    number:number;
    date:Date;
    comments:string;
    hospitalId:number;
    status: number;
    equipmentIDs:number[];
}
export class ContractRequestVM {
    id :number;
    number:number;
    date:Date;
    comments:string;
    hospitalId:number;
    status: number;
    numberOfEquipment: number;
    equipments:Equipment[];
}
export class ContractVM
{
    id: number;
    hospitalId: number;
    hospitalName :string;
    hospitalNameAr :string;
    contractRequests :ContractRequest[]
}
export class OrganizationRequests
{
    id:number;
    organizationid:number;
    organizationname:string;
    organizationnamear:number;
    orgRequests:OrganizationContractRequest[];
}
export class OrganizationContractRequest
{
    id :number;
    number:number;
    date :Date;
    equipments:Equipment[]
}