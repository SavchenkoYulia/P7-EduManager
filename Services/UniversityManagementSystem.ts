import { Student } from "../interfaces/Student";
import { Course } from "../interfaces/Course";
import { Grade } from "../interfaces/Grade";
import { StudentStatus } from "../enums/StudentStatus";
import { Faculty } from "../enums/Faculty";
import { Semester } from "../enums/Semester";
import { Mark } from "../enums/Mark";

export class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: Grade[] = [];

 // Student registration
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent = { ...student, id: this.students.length + 1 };
    this.students.push(newStudent);
    return newStudent;
  }

  // Student registration for the course
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student) {
      throw new Error("Student record not found.");
    }
    if (!course) {
      throw new Error("Course record not found.");
    }
    if (course.faculty !== student.faculty) {
      throw new Error("Student cannot register for a course in a different faculty.");
    }
    const registeredStudents = this.grades.filter((g) => g.courseId === courseId).length;
    if (registeredStudents >= course.maxStudents) {
      throw new Error("Course is full.");
    }
  }

 // Assigning a grade to the student
  setGrade(studentId: number, courseId: number, grade: Mark): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student) {
      throw new Error("Student record not found.");
    }
    if (!course) {
      throw new Error("Course record not found.");
    }
    const isRegistered = this.grades.some(
      (g) => g.studentId === studentId && g.courseId === courseId
    );
    if (!isRegistered) {
      throw new Error("No course registration found for the student.");
    }

    this.grades.push({
      studentId,
      courseId,
      grade:null
      date: new Date(),
      semester: course.semester,
    });
  }
 
// Update student status
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);

    if (!student) {
      throw new Error("Matching student record not found.");
    }
    if (
      student.status === StudentStatus.Graduated ||
      student.status === StudentStatus.Expelled
    ) {
      throw new Error("The status of graduated or expelled students cannot be altered");
    }
    if (!Object.values(StudentStatus).includes(newStatus)) {
      throw new Error("Unacceptable student status.");
    }

    student.status = newStatus;
  }

 // Admission of students by faculty
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

 // Getting the student's grades
  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }

  
// Available courses by faculty and semester
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
  }

  
// Calculation of the student's average score
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);

    if (studentGrades.length === 0) {
      return 0;
    }

    const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
    return total / studentGrades.length;
  }

  
// Obtaining the list of excellent students by faculty
  getTopStudentsByFaculty(faculty: Faculty): Student[] {
    const studentsByFaculty = this.getStudentsByFaculty(faculty);
    return studentsByFaculty.filter((student) => {
      const averageGrade = this.calculateAverageGrade(student.id);
      return averageGrade >= Mark.Excellent;
    });
  }
}
