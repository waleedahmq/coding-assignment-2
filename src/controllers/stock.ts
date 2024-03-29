import { RequestHandler } from 'express';

import { ResponseError } from '../models/error';

import { calulateStock } from '../services/stock';

/**
 * API controller to calculate and get stock information
 * @param req API request object containing body
 * @param res API response object to send back information
 * @param next API next function to pass on the flow to next middlewear if there is any
 */
export const getProductStock: RequestHandler = (req, res, next) => {
  // Extracting sku from request body
  const sku = (req.body as { sku: string }).sku;

  // Invoking function to calculate and get back the information
  // calulateStock(sku) has the exact signature as mentioned in challange
  calulateStock(sku).then((stock) => {
    if (stock) res.status(200).json(stock);
    else next(new ResponseError('Internal server error', 500));
  }).catch((error) => { next(error); });
};
