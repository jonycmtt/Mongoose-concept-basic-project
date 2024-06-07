import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { CourseModel } from '../Course/course.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AcademicFacultyModel } from '../academicFeculty/academiFaculty.model';
import { SemesterRegistrationModel } from '../semesterRagistration/semesterRagistration.model';
import { TOfferCourse } from './OfferCourse.interface';
import { OfferCourse } from './OfferCourse.model';

const createOfferCourseIntoDB = async (payload: TOfferCourse) => {
  const { semesterRegistration, academicFaculty, academicDepartment, course } =
    payload;
  // check if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Semester Registration Not Found`);
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic Faculty Not Found`);
  }

  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic Department Not Found`);
  }

  const isCourseExists = await CourseModel.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Courses Not Found`);
  }

  // if(!isSemesterRegistrationExists || !isAcademicDepartmentExists || !isAcademicDepartmentExists || !isCourseExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, `Not Found Id`)
  // }

  const result = await OfferCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferCourseServices = {
  createOfferCourseIntoDB,
};

// const getOfferCourseFromDB
