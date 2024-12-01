import { UniversityManagementSystem } from "./Services/UniversityManagementSystem";
import { Faculty } from "./enums/Faculty";
import { StudentStatus } from "./enums/StudentStatus";

// Instantiate the management system
const ums = new UniversityManagementSystem();

// Enroll a new student
const newStudent = ums.enrollStudent({
    fullName: "Tim Round", 
    faculty: Faculty.Engineering, 
    year: 2, 
    status: StudentStatus.Active,
    enrollmentDate: new Date("2024-09-01"),
    groupNumber: "ENG202", 
});

console.log("Enrolled student:", newStudent);