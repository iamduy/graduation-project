import { IRoom } from "./IRoom";

export class IFloor {
    id: number;
    name: string;
    total_area: number;
    building_id: number;
    created_at?: Date;
    updated_at?: Date;
    room!: IRoom[];
}