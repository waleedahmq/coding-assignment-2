/**
 * Transaction class to store transaction objects
 */
export class Transaction {
  sku: string;
  type: string;
  quantity: number

  constructor(sku: string, type: string, quantity: number) {
    this.sku = sku;
    this.type = type;
    this.quantity = quantity;
  }
}
