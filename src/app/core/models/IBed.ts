export class IBed {
    id: number;
    name: string;
    room_id: number;
    contract_id?: number;
    created_at?: Date;
    updated_at?: Date;
    contract: {
        deposit: number;
        deposit_state: string;
        end_day: string;
        id: number;
        note: string;
        price: number;
        stat_day: string;
        student: {
            address: string;
            email: string;
            first_name: string;
            gender: string;
            id: number;
            last_name: string;
            phone: string;
            status: string;
        }
    }
}