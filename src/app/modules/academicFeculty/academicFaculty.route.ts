import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { academicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoute = router;
