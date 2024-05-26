import { TAcademicSemester } from './academic.semester.interface';
import { academicSemesterModel } from './academic.semester.model';
import { academicSemesterNameCodeWrapper } from './academicSemester.constant';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeWrapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
