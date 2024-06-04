import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World');
// });

const test = async (req: Request, res: Response) => {
  // Promise.reject();
  let a = 100;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
