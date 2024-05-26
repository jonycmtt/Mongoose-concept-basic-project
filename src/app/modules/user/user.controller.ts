import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../Utils/SendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    //validate with zod
    // const zodParseData = studentSchemaValidateWithZod.parse(student);

    //will call service func to send this data

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
