import config from '../../config';
import { StudentModel } from '../studen.model';
import { Student } from '../student/student.interface';
import { TUser } from './user.interface';
// import { TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  //set manually  generate id
  userData.id = '2024100001';

  // create user
  const NewUser = await userModel.create(userData); //built in static method
  if (Object.keys(NewUser).length) {
    studentData.id = NewUser.id;
    studentData.user = NewUser._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
