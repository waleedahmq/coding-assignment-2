import { Stock } from '../models/stock';
import { Transaction } from '../models/transaction';
import { ResponseError } from '../models/error';

// Importing all utilities
import path from 'path';
import fs from 'fs';

/**
 * Function to read source files and calculate the current stock level for the given sku
 * @param sku given sku to calculate current stock level
 * @returns promise with stock object to match the coding challange signature
 */
export async function calulateStock(sku: string): Promise<Stock> {
  try {
    if (sku === '' || sku === null) {
      const error = new ResponseError('Bad request', 400);
      throw error;
    }

    // Reading source files
    let stock = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'source', 'stock.json'), 'utf8'));
    let transactions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'source', 'transactions.json'), 'utf8'));

    // Finding starting stock of the given sku and forthcoming transactions
    let skuStock = stock.find((s: Stock) => s.sku === sku);
    let skuTransactions = transactions.filter((t: Transaction) => t.sku === sku);

    // Edge cases if sku is not found in transaction and in stock
    // Second if there are transactions for sku, but stock is missing
    if (skuTransactions.length <= 0 && !skuStock) {
      const error = new ResponseError('SKU not found', 404);
      throw error;
    }
    else if (skuTransactions.length > 0 && !skuStock) {
      skuStock = new Stock(sku, 0);
    }

    // Calculating the current stock level as per the transactions
    for (let skuTransaction of skuTransactions) {
      if (skuTransaction.type === 'refund') skuStock.stock = skuStock.stock + skuTransaction.qty;
      else skuStock.stock = skuStock.stock - skuTransaction.qty;
    }

    return Promise.resolve(skuStock);

  } catch (error) {
    throw Promise.reject(error);
  }
}
