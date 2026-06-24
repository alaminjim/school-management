// validations/student.validation.ts

import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  picture: z.string().min(1),
  // roll: z.string().min(1),

  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  dob: z.coerce.date().optional(),
  gender: z.string().optional(),
  passport: z.string().optional(),
  guardianPhone: z.string().optional(),

  studentAddress: z.string().optional(),
  district: z.string().optional(),
  thana: z.string().optional(),

  duration: z.string().optional(),
  year1: z.string().optional(),
  month1: z.string().optional(),
  year2: z.string().optional(),
  month2: z.string().optional(),

  educationQualification: z.string().optional(),
  institute: z.string().optional(),
  directorName: z.string().optional(),

  issueDate: z.coerce.date().optional(),
  expireDate: z.coerce.date().optional(),

  userId: z.string().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();