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
router.get('/', academicSemesterControllers.getAllAcademicSemester);

router.get(
  '/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateSingleAcademicSemester,
);

export const academicSemesterRoutes = router;
