import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
);
// static
academicDepartmentSchema.pre('save', async function (next) {
  const isExistsDepartment = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  if (isExistsDepartment) {
    throw new Error('Department Already Exists');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExistsDepartment = await AcademicDepartmentModel.findOne(query);

  if (!isExistsDepartment) {
    throw new Error('This Department does not exits');
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
