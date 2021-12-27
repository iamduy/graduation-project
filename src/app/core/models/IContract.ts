import { IStudent } from "./IStudent";
export class IContract {
    id: number;
    stat_day: string;
    end_day: string;
    price: number;
    deposit: number;
    note: string;
    deposit_state: string;
    student: IStudent
}