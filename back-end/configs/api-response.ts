export class ApiResponse {
  static success(data: any, message: string) {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string, error?: any) {
    return {
      success: false,
      message,
      error,
    };
  }

  static notFound(message: string) {
    return {
      success: false,
      message,
    };
  }

  static validationError(errors: any) {
    return {
      success: false,
      errors,
    };
  }
}
