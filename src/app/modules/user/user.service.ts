import config from '../../config';
import { StudentModel } from '../student/student.model';
import { Student } from '../student/student.interface';
import { TUser } from './user.interface';
// import { TUser } from './user.interface';
import { userModel } from './user.model';
import { TAcademicSemester } from '../academicSemester/academic.semester.interface';
import { academicSemesterModel } from '../academicSemester/academic.semester.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose, { mongo } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../Admin/admin.model';

const createStudentIntoDB = async (password: string, payload: Student) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user object
    const userData: Partial<TUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = 'student';

    const admissionSemester = await academicSemesterModel.findById(
      payload.admissionSemester,
    );

    //set auto  generate id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    // create user     // transaction 01
    const NewUser = await userModel.create([userData], { session }); //built in static method
    if (!NewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }

    payload.id = NewUser[0].id;
    payload.user = NewUser[0]._id;

    // transaction 02
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
