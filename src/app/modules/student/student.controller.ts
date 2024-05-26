import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import studentSchema from './student.joi.validation';
import { z } from 'zod';
import studentSchemaValidateWithZod from './student.zod.validation';
import sendResponse from '../../Utils/SendResponse';
import httpStatus from 'http-status';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students successfully find!',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentsDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student successfully find!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentsDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student successfully Deleted!',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
