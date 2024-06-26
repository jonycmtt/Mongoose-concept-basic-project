// import { Schema, model, connect } from 'mongoose';

import { Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type userGuardian = {
  fatherName: string;
  motherName: string;
  fatherContactNo: string;
  motherContactNo: string;
};

export type Student = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: number;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: userGuardian;
  avatar?: string | undefined;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
};

//for creating static method
export interface CustomStaticStudentModel extends Model<Student> {
  isUserExists(id: string): Promise<Student | null>;
}

// custom instance method
// export type customStudentMethods = {
//   isUserExists(id: string): Promise<Student | null>;
// };

// type CustomStudentModel = Model<Student, {}, StudentMethod>;
// export type CustomStudentModel = Model<Student, {}, customStudentMethods>;
