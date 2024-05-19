import { StudentModel } from '../studen.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (studentData: Student) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await StudentModel.create(studentData); //built in static method

  //built in instance method
  // const student = new StudentModel(studentData); // create instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save();
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
