import { Router } from 'express';
const router = Router();

/**
 * Importing all middlewears including rules, validator and controller
 */
import { getProductStock } from '../controllers/stock';
import { stockRule } from '../validations/stock';
import validate from '../helpers/validate';

/**
 * API defined to calculate and get stock
 */
router.post('/', stockRule(''), validate, getProductStock);

export default router;
