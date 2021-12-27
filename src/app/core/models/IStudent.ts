import { IContract } from "./IContract";
import { IStudentInfo } from "./IStudentInfo";

export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  birth: string;
  birth_place: string;
  email: string;
  address: string;
  phone: string;
  gender: number;
  status: number;
  student_info: IStudentInfo;
  created_at?: string
  contract?: IContract[]
}