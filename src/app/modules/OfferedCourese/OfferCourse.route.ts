import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferCourseValidations } from './OfferCourse.validation';
import { OfferedCourseControllers } from './OfferCourse.controller';

const router = express.Router();
router.post(
  '/create-offer-course',
  validateRequest(OfferCourseValidations.createOfferCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

export const OfferCourseRoutes = router;
