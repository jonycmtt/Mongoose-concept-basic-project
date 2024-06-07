import httpStatus from 'http-status';
import sendResponse from '../../Utils/SendResponse';
import catchAsync from '../../Utils/catchAsync';
import { OfferCourseServices } from './OfferCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferCourseServices.createOfferCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully !',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
};
