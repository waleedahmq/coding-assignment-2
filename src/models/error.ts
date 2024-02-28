/**
 * ResponseError class extending the Error base class to respond with status codes
 */
export class ResponseError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.message = message;
    this.status = status;
  }
}
