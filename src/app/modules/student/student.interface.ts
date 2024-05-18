// import { Schema, model, connect } from 'mongoose';

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
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: number;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: userGuardian;
  avatar?: string;
  isActive: 'active' | 'inActive';
};
