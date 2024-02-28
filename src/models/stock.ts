/**
 * Stock class to store stock objects
 */
export class Stock {
  sku: string;
  stock: number;

  constructor(sku: string, stock: number) {
    this.sku = sku;
    this.stock = stock;
  }
}
