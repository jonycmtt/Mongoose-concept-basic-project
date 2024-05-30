import mongoose, { mongo } from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// get all data
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  return result;
};
const getSingleStudentsDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  return result;
};
const deleteStudentsDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const studentExists = await StudentModel.findOne({ id }).session(session);

    if (!studentExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Student Id not found');
    }

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete student');
    }

    const userExists = await userModel.findOne({ id }).session(session);

    if (!userExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'User Id not found');
    }

    const deleteUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete student');
    }
    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentsDB,
  deleteStudentsDB,
};
