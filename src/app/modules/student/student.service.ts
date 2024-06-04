import mongoose, { mongo } from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Student } from './student.interface';

// get all data
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = StudentModel.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering
  const excludeFields = ['searchTerm', 'sort', 'limit'];
  excludeFields.forEach((ele) => delete queryObj[ele]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });

  let sort = '-createAt';
  if (query.sort) {
    sort = query.sort as string;
  }

  let limitValue = 1;

  if (query.limit) {
    limitValue = query.limit as number;
  }

  const sortQuery = await filterQuery.sort(sort).limit(limitValue);

  return sortQuery;
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

const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  return await StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData);
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentsDB,
  deleteStudentsDB,
  updateStudentIntoDB,
};
