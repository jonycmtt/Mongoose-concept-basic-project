import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

//will call controller func
router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:id', studentControllers.getSingleStudent);
router.delete('/:id', studentControllers.deleteStudent);

export const studentRoutes = router;
