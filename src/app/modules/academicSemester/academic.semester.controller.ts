import httpStatus from 'http-status';
import sendResponse from '../../Utils/SendResponse';
import catchAsync from '../../Utils/catchAsync';
import { AcademicSemesterServices } from './academic.semester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is fetching successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester single fetching successfully',
    data: result,
  });
});

const updateSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
