import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { studentSchemaValidates } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentSchemaValidates.CreateStudentSchemaValidateWithZod),
  UserControllers.createStudent,
);

export const UserRoutes = router;
