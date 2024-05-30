import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentSchemaValidates } from './student.zod.validation';

const router = express.Router();

//will call controller func
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);

router.patch(
  '/:studentId',
  validateRequest(studentSchemaValidates.UpdatedStudentSchemaValidateWithZod),
  studentControllers.updateStudent,
);

export const studentRoutes = router;
