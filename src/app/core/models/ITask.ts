import { IUser } from '.';

export class ITask {
  id: number;
  title: string;
  date_start?: Date;
  date_end?: Date;
  priority?: number;
  desc?: string;
  user_create_id?: number;
  user_undertake_id?: number;
  processed?: number;
  status?: number;
  user_create?: IUser;
  user_undertake?: IUser;
  created_at?: Date;
  updated_at?: Date;
}
