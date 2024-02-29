import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import stockRoutes from './routes/stock';
import { ResponseError } from './models/error';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// configurations setup
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/stock', stockRoutes);

// Below route is trigerred when any error is is thrown
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ResponseError) res.status(err.status).json({ message: err.message, statusCode: err.status });
  else if (err instanceof Error) res.status(500).json({ message: err.message, statusCode: 500 });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});

export default app;