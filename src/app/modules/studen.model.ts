import { Schema, model } from 'mongoose';
import { Student, UserName, userGuardian } from './student/student.interface';

const userSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<userGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: Number, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'O-', 'AB+', 'B-', 'A-', 'O+', 'B+', 'AB-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  avatar: String,
  isActive: ['active', 'inActive'],
});

// model defined
export const StudentModel = model<Student>('Student', studentSchema);
