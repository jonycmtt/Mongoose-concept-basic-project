import { StudentModel } from '../studen.model';

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
//delete students data

const deleteStudentsDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentsDB,
  deleteStudentsDB,
};
