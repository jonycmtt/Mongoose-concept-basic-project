import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academic.semester.route';
import { AcademicFacultyRoute } from '../modules/academicFeculty/academicFaculty.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
