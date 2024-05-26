import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().min(1, 'Name can not be less than 1 characters'),
  middleName: z.string(),
  lastName: z.string(),
});

const userGuardianSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  fatherContactNo: z.string(),
  motherContactNo: z.string(),
});

const CreateStudentSchemaValidateWithZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.date().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: z.number(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: userGuardianSchema,
      avatar: z.string().optional(),
    }),
  }),
});

export const studentSchemaValidates = {
  studentSchemaValidateWithZod: CreateStudentSchemaValidateWithZod,
};
