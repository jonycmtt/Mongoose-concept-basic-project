import express from 'express';
import { academicSemesterControllers } from './academic.semester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academic.semester.validation';

const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
