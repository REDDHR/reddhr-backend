class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  msg: string;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.msg = message;

    // Ensure the correct prototype chain
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;