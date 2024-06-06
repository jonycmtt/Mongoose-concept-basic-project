import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterModel } from '../academicSemester/academic.semester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRagistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { semesterRegistrationStatusObj } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already "UPCOMING"
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: semesterRegistrationStatusObj.UPCOMING },
        { status: semesterRegistrationStatusObj.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }

  // checking semester exits
  const isAcademicSemesterExists =
    await academicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester not Found!',
    );
  }
  //   check it the semester already exists
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is already Enroll!',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  //populate not working
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find(),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //if if the requested registered semester is exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!');
  }
  //if the request semester registration is ended,we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestStatus = payload?.status;

  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester is Already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    (currentSemesterStatus === semesterRegistrationStatusObj.UPCOMING &&
      requestStatus === semesterRegistrationStatusObj.ENDED) ||
    (currentSemesterStatus === semesterRegistrationStatusObj.ONGOING &&
      requestStatus === semesterRegistrationStatusObj.UPCOMING)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestStatus}`,
    );
  }
  // if (currentSemesterStatus === 'ONGOING' && requestStatus === 'UPCOMING') {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `You can not directly change status from ${currentSemesterStatus} to ${requestStatus}`,
  //   );
  // }
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
