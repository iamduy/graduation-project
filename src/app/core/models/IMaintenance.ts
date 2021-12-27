export class IMaintenance {
  id: number;
  name: string;
  type: string;
  status: number;
  note: string;
  user_create_id?: number;
  user_create: {
    first_name: string,
    last_name: string
  }
  user_undertake_id?: number;
  user_undertake: {
    first_name: string,
    last_name: string
  }
  date_start?: Date;
  date_end?: Date;
  periodic?: string;
  reminder?: string;
  cycle_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
