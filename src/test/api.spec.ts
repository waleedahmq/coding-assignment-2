import chai, { expect } from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

import { badRequest, existingStock, newStock, notFound } from "./factories/stock";
import app from '../index';

import { ResponseError } from '../models/error';

const endpoint = 'http://localhost:3000';

describe('Test stock APIs', () => {

  let server: any = null;
  // Starting server on port 3000 for test cases
  before(() => {
    server = app.listen(3000, () => { console.log(`Server started listening on 3000 for test cases`); });
  });

  after(() => {
    server.close();
  });

  it('must throw an error of bad request', async (done) => {
    let res = await chai.request(endpoint).post('/stock').send(badRequest);

    // Asserting the outcome
    expect(res).to.throw(new ResponseError('Bad request', 400));
    done();
  });

  it('must throw an error of sku not found', async (done) => {
    let res = await chai.request(endpoint).post('/stock').send(notFound);

    // Asserting the outcome
    expect(res).to.throw(new ResponseError('SKU not found', 404));
    done();
  });

  it('should return a existing stock object with sku and current stock', async (done) => {
    let res = await chai.request(endpoint).post('/stock').send(existingStock);

    // Asserting the outcome
    expect(res.body.sku).to.equal('LTV719449/39/39');
    expect(res.body.stock).to.equal(8510);
    done();
  });

  it('should return a new stock object with sku and current stock', async (done) => {
    let res = await chai.request(endpoint).post('/stock').send(newStock);

    // Asserting the outcome
    expect(res.body.sku).to.equal('NJL093603/01/73');
    expect(res.body.stock).to.equal(-56);
    done();
  });
});
