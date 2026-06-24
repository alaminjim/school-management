import { Role } from "@prisma/client";

export interface IRequestUser {
  id: string;
  role: Role | string;
  email: string;
}

export interface ILoginUserPayload {
    email: string;
    password: string;
}


export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}


export interface IRegisterUserPayload {
  name: string;
  email: string;
  username: string;
  password: string;
  branchId: string;
  instituteName: string;
  directorName: string;
  mobileNumber: string;
  gender: string;
  nationality: string;
  instituteAge: string;
  religion: string;
  fullAddress: string;
  village: string;
  postOffice: string;
  thanaUpazila: string;
  district: string;
  fatherName: string;
  motherName: string;
  courseName: string;
  duration: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  educationQualification: string;
  directorPhoto: string;
  institutePhoto: string;
  nationalIdPhoto: string;
  signaturePhoto: string;
}