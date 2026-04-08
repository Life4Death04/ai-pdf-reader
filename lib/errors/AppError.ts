/**
 * Custom Error Classes
 * 
 * Provides structured error types for better error handling and user feedback.
 * All custom errors extend AppError which includes statusCode and isOperational flag.
 */

/**
 * Base application error class.
 * All custom errors should extend this.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly (required for extending built-in classes in TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * 400 Bad Request - Invalid user input
 */
export class ValidationError extends AppError {
  constructor(message: string = "Validation failed", context?: Record<string, unknown>) {
    super(message, 400, true, context);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * 401 Unauthorized - Authentication required
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = "Authentication required", context?: Record<string, unknown>) {
    super(message, 401, true, context);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * 403 Forbidden - Authenticated but not authorized
 */
export class ForbiddenError extends AppError {
  constructor(message: string = "Access forbidden", context?: Record<string, unknown>) {
    super(message, 403, true, context);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * 404 Not Found - Resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", context?: Record<string, unknown>) {
    super(message, 404, true, context);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * 409 Conflict - Resource state conflict
 */
export class ConflictError extends AppError {
  constructor(message: string = "Resource conflict", context?: Record<string, unknown>) {
    super(message, 409, true, context);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * 413 Payload Too Large - File or request too large
 */
export class PayloadTooLargeError extends AppError {
  constructor(message: string = "Payload too large", context?: Record<string, unknown>) {
    super(message, 413, true, context);
    Object.setPrototypeOf(this, PayloadTooLargeError.prototype);
  }
}

/**
 * 415 Unsupported Media Type - Invalid file type
 */
export class UnsupportedMediaTypeError extends AppError {
  constructor(message: string = "Unsupported media type", context?: Record<string, unknown>) {
    super(message, 415, true, context);
    Object.setPrototypeOf(this, UnsupportedMediaTypeError.prototype);
  }
}

/**
 * 422 Unprocessable Entity - Semantic errors in request
 */
export class UnprocessableEntityError extends AppError {
  constructor(message: string = "Unprocessable entity", context?: Record<string, unknown>) {
    super(message, 422, true, context);
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }
}

/**
 * 429 Too Many Requests - Rate limit exceeded
 */
export class TooManyRequestsError extends AppError {
  constructor(message: string = "Too many requests", context?: Record<string, unknown>) {
    super(message, 429, true, context);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

/**
 * 500 Internal Server Error - Unexpected server error
 */
export class InternalServerError extends AppError {
  constructor(
    message: string = "Internal server error",
    context?: Record<string, unknown>,
    isOperational: boolean = false
  ) {
    super(message, 500, isOperational, context);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

/**
 * 502 Bad Gateway - External service error
 */
export class BadGatewayError extends AppError {
  constructor(message: string = "Bad gateway", context?: Record<string, unknown>) {
    super(message, 502, true, context);
    Object.setPrototypeOf(this, BadGatewayError.prototype);
  }
}

/**
 * 503 Service Unavailable - Service temporarily unavailable
 */
export class ServiceUnavailableError extends AppError {
  constructor(message: string = "Service unavailable", context?: Record<string, unknown>) {
    super(message, 503, true, context);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

/**
 * 504 Gateway Timeout - External service timeout
 */
export class GatewayTimeoutError extends AppError {
  constructor(message: string = "Gateway timeout", context?: Record<string, unknown>) {
    super(message, 504, true, context);
    Object.setPrototypeOf(this, GatewayTimeoutError.prototype);
  }
}
