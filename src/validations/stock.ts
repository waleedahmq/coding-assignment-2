import { body } from 'express-validator';

/**
 * This function defines all the rules that can be applied to stock related requests
 * @param mode is to identify if there mutiple APIs and scenarios to modify rules accordingly
 * @returns Array of rules to validate stock related requests
 */
export const stockRule = (mode: string) => {
  let rules = [
    body('sku', 'SKU is required').trim().notEmpty(),
  ];

  return rules;
};
