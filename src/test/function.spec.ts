import { expect } from 'chai';
import { calulateStock } from '../services/stock';
import { Stock } from '../models/stock';
import { ResponseError } from '../models/error';

// Creating test suite for calculateStock function
describe('Test calculateStock function', () => {

  it('must throw an error of bad request', () => {
    // Asserting the outcome
    expect(calulateStock('')).to.throw(new ResponseError('Bad request', 400));
  });

  it('must throw an error of sku not found', () => {
    // Asserting the outcome
    expect(calulateStock('NJL093603/01/70')).to.throw(new ResponseError('SKU not found', 404));
  });

  it('should return a existing stock object with sku and current stock', async () => {
    let stock: Stock = await calulateStock('LTV719449/39/39');

    // Asserting the outcome
    expect(stock.sku).to.equal('LTV719449/39/39');
    expect(stock.stock).to.equal(8510);
  });

  it('should return a new stock object with sku and current stock', async () => {
    let stock: Stock = await calulateStock('NJL093603/01/73');

    // Asserting the outcome
    expect(stock.sku).to.equal('NJL093603/01/73');
    expect(stock.stock).to.equal(-56);
  });
});