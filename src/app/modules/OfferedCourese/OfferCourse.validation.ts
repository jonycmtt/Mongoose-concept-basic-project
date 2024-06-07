import { z } from 'zod';
import { Days } from './OfferCourse.constant';

const createOfferCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number().min(1),
      section: z.number().min(1),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
          return regex.test(time);
        },
        {
          message: 'startTime must be in HH:MM format',
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
          return regex.test(time);
        },
        {
          message: 'endTime must be in HH:MM format',
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return start < end;
      },
      {
        message: 'Must be StartTime less than EndTime!',
      },
    ),
});
const updatedOfferCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().min(1).optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z
      .string()
      .refine(
        (time) => {
          const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
          return regex.test(time);
        },
        {
          message: 'startTime must be in HH:MM format',
        },
      )
      .optional(),
    endTime: z
      .string()
      .refine(
        (time) => {
          const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
          return regex.test(time);
        },
        {
          message: 'startTime must be in HH:MM format',
        },
      )
      .optional(),
  }),
});

export const OfferCourseValidations = {
  createOfferCourseValidationSchema,
  updatedOfferCourseValidationSchema,
};
