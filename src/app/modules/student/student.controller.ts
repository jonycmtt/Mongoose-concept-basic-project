import { StudentServices } from './student.service';
import sendResponse from '../../Utils/SendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';

const getAllStudents = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const result = await StudentServices.getAllStudentFromDB(req.query);
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

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student successfully updated!',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
