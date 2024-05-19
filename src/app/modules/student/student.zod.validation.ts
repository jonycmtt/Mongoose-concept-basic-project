import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().max(20, 'Name can not be more than 20 characters'),
  middleName: z.string(),
  lastName: z.string(),
});

const userGuardianSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  fatherContactNo: z.string(),
  motherContactNo: z.string(),
});

const studentSchemaValidateWithZod = z.object({
  id: z.string(),
  password: z.string().max(20),
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
  avatar: z.string().optional(),
  isActive: z.enum(['active', 'inActive']).default('active'),
  isDeleted: z.boolean(),
});

export default studentSchemaValidateWithZod;
