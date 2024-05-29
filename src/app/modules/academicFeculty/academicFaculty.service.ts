import { AcademicFacultyModel } from './academiFaculty.model';
import { TAcademicFaculty } from './academicfaculty.interface';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  return await AcademicFacultyModel.find();
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  return await AcademicFacultyModel.findById(id);
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  return await AcademicFacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};
export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
