import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartmentModel.create(payload);
};

const getAllAcademicDepartmentFromDB = async () => {
  return await AcademicDepartmentModel.find();
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  return await AcademicDepartmentModel.findById(id);
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  return await AcademicDepartmentModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
