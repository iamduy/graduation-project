import { IFloor } from "./IFloor";

export class IBuilding {
    id: number;
    name: string;
    total_area: number;
    note: string;
    project_id: number;
    created_at?: Date;
    updated_at?: Date;
    floors!: IFloor[];
}