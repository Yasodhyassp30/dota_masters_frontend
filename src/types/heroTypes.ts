export interface hero {
    id:number;
    gpm:number;
    position:number;
    name:string;
}

export interface heroListItems {
    id:number;
    gpm:number;
    position:number;

}

interface prediction{
    radiant:number;
    dire:number
}

export interface matches{
    _id:{$oid:string}
    radiant:hero[];
    dire:hero[];
    feedback:number;
    create:string;
    prediction:prediction;
}