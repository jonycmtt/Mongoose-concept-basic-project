import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentSchema from './student.joi.validation';
import { z } from 'zod';
import studentSchemaValidateWithZod from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // const studentValidateSchema = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName: z.string().max(20, {
    //       message: 'First Name can not be more than 20 characters',
    //     }),
    //   }),
    // });

    const student = req.body.student;
    //validate using joi
    // const { error, value } = studentSchema.validate(student);

    //validate with zod
    const zodParseData = studentSchemaValidateWithZod.parse(student);

    //will call service func to send this data

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'students successfully find!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentsDB(id);
    res.status(200).json({
      success: true,
      message: 'student successfully find!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentsDB(id);
    res.status(200).json({
      success: true,
      message: 'student successfully Deleted!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
