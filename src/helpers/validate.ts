import { Request, Response, NextFunction } from 'express';
import { validationResult, matchedData } from 'express-validator';

/**
 * Default function to validate request based on the defined rules
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // Skipping all undefined data from request body
    req.body = matchedData(req, { includeOptionals: true });
    return next();
  }

  // Extracting all errors based on rules defined and sending them in response
  const extractedErrors: Error[] = [];
  errors.array().map(err => extractedErrors.push(new Error(err.msg)));
  res.status(400).json({ message: 'Bad request', statusCode: 400, errors });
};
