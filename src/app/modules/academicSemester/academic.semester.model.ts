import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academic.semester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: academicSemesterName },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: { type: String, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save', async function (next) {
  const semesterIsExists = academicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (await semesterIsExists) {
    throw new AppError(404, 'Semester already Exists !');
  }
  next();
});

export const academicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  AcademicSemesterSchema,
);
