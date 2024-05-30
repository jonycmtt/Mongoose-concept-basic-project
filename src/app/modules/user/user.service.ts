import config from '../../config';
import { StudentModel } from '../student/student.model';
import { Student } from '../student/student.interface';
import { TUser } from './user.interface';
// import { TUser } from './user.interface';
import { userModel } from './user.model';
import { TAcademicSemester } from '../academicSemester/academic.semester.interface';
import { academicSemesterModel } from '../academicSemester/academic.semester.model';
import { generateStudentId } from './user.utils';
import mongoose, { mongo } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
    userData.id = await generateStudentId(admissionSemester);

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
  }
};

export const UserServices = {
  createStudentIntoDB,
};
