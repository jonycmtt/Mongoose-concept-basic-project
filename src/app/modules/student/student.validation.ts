import Joi from 'joi';

const nameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': 'First name must be capitalized',
      'string.empty': 'First Name Required',
      'string.max': 'Name can not be more than 20 characters',
    }),
  middleName: Joi.string().required(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base':
        'Last name must contain only alphabetic characters',
      'string.empty': 'Last Name Required',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  motherName: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: nameSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not valid',
  }),
  dateOfBirth: Joi.string().isoDate(),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email format',
  }),
  contactNo: Joi.number().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  avatar: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'inActive').default('active'),
});

export default studentSchema;
