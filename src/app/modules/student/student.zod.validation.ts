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
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: z.number(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: userGuardianSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      avatar: z.string().optional(),
    }),
  }),
});

const updatedUserNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Name can not be less than 1 characters')
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updatedUserGuardianSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherContactNo: z.string().optional(),
});
const UpdatedStudentSchemaValidateWithZod = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updatedUserNameSchema.optional(),
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.number().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updatedUserGuardianSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      avatar: z.string().optional().optional(),
    }),
  }),
});

export const studentSchemaValidates = {
  CreateStudentSchemaValidateWithZod,
  UpdatedStudentSchemaValidateWithZod,
};
