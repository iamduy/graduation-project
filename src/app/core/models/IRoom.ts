import { IBed } from "./IBed";
import { IFloor } from "./IFloor";
import { IRoomType } from "./IRoomType";

export class IRoom {
    id: number;
    name: string;
    created_at?: Date;
    updated_at?: Date;
    room_type_id?: number;
    room_type: IRoomType;
    beds?: IBed[];
    floor_id: number;
    // floor?: IFloor;
}