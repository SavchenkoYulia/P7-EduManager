import { Semester } from "../enums/Semester";
import { Mark } from "../enums/Mark";
export interface Grade {
    studentId: number;
    courseId: number;
    grade: Mark;
    date: Date;
    semester: Semester;
}