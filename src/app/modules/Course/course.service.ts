import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCurseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deletedCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  // check if there is any pre requisites course to updated
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted fields
    const deletedPreRequisites = preRequisiteCourses
      ?.filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisitesCourses = await CourseModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisites } },
        },
      },
    );

    // FILTER OUT THE NEW
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequisitesCourses = await CourseModel.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
  }

  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return { updatedBasicCourseInfo, result };
};

export const CourseServices = {
  createCurseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deletedCourseFromDB,
  updateCourseIntoDB,
};
