import { Schema, model } from 'mongoose';
import {
  CustomStaticStudentModel,
  Student,
  UserName,
  userGuardian,
} from './student/student.interface';
import validator from 'validator';

const userSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name Required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     // if (value !== firstNameStr) {
    //     //   return false;
    //     // }
    //     // return true;
    //     return value === firstNameStr;
    //   },
    //   message: `{VALUE} is not in capitalize format`,
    // },
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name Required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: `{VALUE} is not in alpha format`,
    // },
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

const studentSchema = new Schema<Student, CustomStaticStudentModel>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: `{VALUE} IS NOT VALID`,
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: `{VALUE} is not in email format`,
    },
  },
  contactNo: { type: Number, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  avatar: String,
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

// model defined
export const StudentModel = model<Student, CustomStaticStudentModel>(
  'Student',
  studentSchema,
);
