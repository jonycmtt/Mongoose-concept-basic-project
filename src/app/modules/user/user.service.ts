import config from '../../config';
import { StudentModel } from '../student/student.model';
import { Student } from '../student/student.interface';
import { TUser } from './user.interface';
// import { TUser } from './user.interface';
import { userModel } from './user.model';
import { TAcademicSemester } from '../academicSemester/academic.semester.interface';
import { academicSemesterModel } from '../academicSemester/academic.semester.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester,
  );

  //set auto  generate id
  userData.id = generateStudentId(admissionSemester);

  // create user
  const NewUser = await userModel.create(userData); //built in static method
  if (Object.keys(NewUser).length) {
    payload.id = NewUser.id;
    payload.user = NewUser._id;

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
