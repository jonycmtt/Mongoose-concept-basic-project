import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentSchema from './student.joi.validation';
import { z } from 'zod';
import studentSchemaValidateWithZod from './student.zod.validation';
import sendResponse from '../../Utils/SendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students successfully find!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentsDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student successfully find!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentsDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student successfully Deleted!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
