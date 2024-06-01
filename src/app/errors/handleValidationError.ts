import mongoose, { CastError } from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (issue: mongoose.Error.ValidatorError | CastError) => {
      return {
        path: issue?.path,
        message: issue?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleValidationError;
