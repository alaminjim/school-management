 export interface Subject {
  subjectCode: string;
  subjectName: string;
  credit: string | number;
  written: string | number;
  practical: string | number;
  viva: string | number;
  totalMarks: string | number;
  fullMark: string | number;
  gradePoint: string | number;
  grade: string;
}

 export interface MarksPayload {
  semesterTitle: string;
  totalCredit: string;
  totalPoints: string;
  cgpa: string;
  grade: string;
  status: string;
  subjects: Subject[];
}