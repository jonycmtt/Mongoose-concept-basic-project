import { StudentModel } from '../studen.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// get all data
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//single students data

const getSingleStudentsDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentsDB,
};
