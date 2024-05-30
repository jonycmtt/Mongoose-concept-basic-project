import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // const isExistsDepartment = await AcademicDepartmentModel.findOne({
  //   name: payload.name,
  // });

  // if (isExistsDepartment) {
  //   throw new Error('Department Already Exists');
  // }
  return await AcademicDepartmentModel.create(payload);
};

const getAllAcademicDepartmentFromDB = async () => {
  return await AcademicDepartmentModel.find().populate('academicFaculty');
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  return await AcademicDepartmentModel.findById(id).populate('academicFaculty');
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
