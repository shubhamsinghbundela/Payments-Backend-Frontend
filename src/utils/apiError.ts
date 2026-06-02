class ApiError extends Error {
  statusCode: number;
  // Inherit from built-in JavaScript Error
  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;

    // Capture clean stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static unauthorized(message = "401 Not Authorized") {
    return new ApiError(401, message);
  }
}

export default ApiError;
