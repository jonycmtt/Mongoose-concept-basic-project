import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { CourseModel } from '../Course/course.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AcademicFacultyModel } from '../academicFeculty/academiFaculty.model';
import { TOfferCourse } from './OfferCourse.interface';
import { OfferCourse } from './OfferCourse.model';
import { SemesterRegistrationModel } from '../semesterRagistration/semesterRegistration.model';

const createOfferCourseIntoDB = async (payload: TOfferCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
  } = payload;

  // console.log({ academicDepartment, academicFaculty });
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

  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  // console.log(isDepartmentBelongToFaculty);

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is belong to the ${isAcademicFacultyExists.name}`,
    );
  }

  //check if the same offered course same section in same registered semester exists
  const isSameOfferCourseExistsSameRegisterSemesterWithSameSection =
    await OfferCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferCourseExistsSameRegisterSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with same section is already exists!`,
    );
  }

  const result = await OfferCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferCourseServices = {
  createOfferCourseIntoDB,
};

// const getOfferCourseFromDB
