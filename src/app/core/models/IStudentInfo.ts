import { IStudentRelative } from "./IStudentRelative";

export class IStudentInfo {
    id: number;
    user_id: number;
    student_code: string;
    department: string;
    student_year: number;
    nation: string;
    religion: string;
    CCCD: string;
    date_range: Date;
    issued_by: Date;
    student_object: string;
    school: string;
    created_at?: Date;
    updated_at?: Date;
    student_relative?: IStudentRelative;

}