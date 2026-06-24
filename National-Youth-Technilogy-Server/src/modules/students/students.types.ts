export interface StudentDto {
  id: string;

  name: string;
  email: string;
  picture: string;

  studentId: string; 
  roll: string;
  regNumber: string;

  fatherName?: string;
  motherName?: string;
  dob?: Date;
  gender?: string;
  passport?: string;
  guardianPhone?: string;

  studentAddress?: string;
  district?: string;
  thana?: string;

  duration?: string;
  year1?: string;
  month1?: string;
  year2?: string;
  month2?: string;

  educationQualification?: string;
  institute?: string;
  directorName?: string;

  issueDate?: Date;
  expireDate?: Date;

  createdAt: Date;
  updatedAt: Date;

  userId?: string;
}

export type StudentCreate = {
  name: string;
  email: string;
  picture: string;
  
  studentId: string;
  roll: string;
  regNumber: string;

  fatherName?: string;
  motherName?: string;
  dob?: Date;
  gender?: string;
  passport?: string;
  guardianPhone?: string;

  studentAddress?: string;
  district?: string;
  thana?: string;

  duration?: string;
  year1?: string;
  month1?: string;
  year2?: string;
  month2?: string;

  educationQualification?: string;
  institute?: string;
  directorName?: string;

  issueDate?: Date;
  expireDate?: Date;

  userId?: string;
};

export type StudentUpdate = Partial<StudentCreate>;