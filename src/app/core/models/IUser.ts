import { IStudentInfo } from './IStudentInfo';

export class IUser {
  id: number;
  first_name: string;
  last_name: string;
  password?: string;
  birth?: Date;
  birth_place?: string;
  gender?: number;
  email?: string;
  address?: string;
  phone?: string;
  user_type?: number;
  role_id?: number;
  status?: number;
  email_verified_at?: Date;
  student_info?: IStudentInfo;
}
